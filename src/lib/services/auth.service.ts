import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '@/config/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import type { UserProfile } from '@/types';

export class AuthService {
  /**
   * Sign up with email and password
   */
  static async signUp(
    email: string,
    password: string,
    displayName?: string
  ): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update display name if provided
      if (displayName) {
        await updateProfile(user, { displayName });
      }

      // Create user profile in Firestore
      await this.createUserProfile(user.uid, {
        displayName: displayName || user.displayName || 'User',
        email: user.email || email,
        photoURL: user.photoURL || undefined,
      });

      return user;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Sign in with email and password
   */
  static async signIn(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Sign in with Google
   */
  static async signInWithGoogle(): Promise<User> {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Create or update user profile
      const userProfile = await this.getUserProfile(user.uid);
      if (!userProfile) {
        await this.createUserProfile(user.uid, {
          displayName: user.displayName || 'User',
          email: user.email || '',
          photoURL: user.photoURL || undefined,
        });
      }

      return user;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Sign out current user
   */
  static async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Send password reset email
   */
  static async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Create user profile in Firestore
   */
  static async createUserProfile(
    uid: string,
    profileData: Omit<UserProfile, 'uid' | 'createdAt' | 'updatedAt'>
  ): Promise<void> {
    try {
      const userProfile: UserProfile = {
        uid,
        ...profileData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await setDoc(doc(db, 'users', uid), userProfile);
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  }

  /**
   * Get user profile from Firestore
   */
  static async getUserProfile(uid: string): Promise<UserProfile | null> {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        return userDoc.data() as UserProfile;
      }
      return null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
  }

  /**
   * Update user profile
   */
  static async updateUserProfile(
    uid: string,
    updates: Partial<Omit<UserProfile, 'uid' | 'createdAt'>>
  ): Promise<void> {
    try {
      await setDoc(
        doc(db, 'users', uid),
        {
          ...updates,
          updatedAt: new Date(),
        },
        { merge: true }
      );
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }

  /**
   * Handle Firebase auth errors
   */
  private static handleAuthError(error: unknown): Error {
    if (error instanceof Error) {
      // Map Firebase error codes to user-friendly messages
      const errorMessages: Record<string, string> = {
        'auth/email-already-in-use': 'This email is already registered.',
        'auth/invalid-email': 'Invalid email address.',
        'auth/operation-not-allowed': 'This operation is not allowed.',
        'auth/weak-password': 'Password is too weak.',
        'auth/user-disabled': 'This account has been disabled.',
        'auth/user-not-found': 'No account found with this email.',
        'auth/wrong-password': 'Incorrect password.',
        'auth/too-many-requests':
          'Too many failed attempts. Please try again later.',
        'auth/network-request-failed':
          'Network error. Please check your connection.',
      };

      const errorCode = (error as { code?: string }).code || '';
      const message =
        errorMessages[errorCode] || error.message || 'An error occurred.';

      return new Error(message);
    }
    return new Error('An unexpected error occurred.');
  }
}
