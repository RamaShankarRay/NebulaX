import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  limit,
  startAfter,
  QueryConstraint,
  serverTimestamp,
  DocumentSnapshot,
} from 'firebase/firestore';
import { db } from '@/config/firebase';

/**
 * Remove undefined values from an object (Firestore doesn't accept undefined)
 */
function removeUndefined<T extends Record<string, unknown>>(
  obj: T
): Partial<T> {
  const cleaned: Partial<T> = {};
  for (const key in obj) {
    if (obj[key] !== undefined) {
      cleaned[key] = obj[key];
    }
  }
  return cleaned;
}

export class FirestoreService {
  /**
   * Get a single document by ID
   */
  static async getDocument<T>(
    collectionName: string,
    documentId: string
  ): Promise<T | null> {
    try {
      const docRef = doc(db, collectionName, documentId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as T;
      }
      return null;
    } catch (error) {
      console.error(`Error getting document ${documentId}:`, error);
      throw error;
    }
  }

  /**
   * Get all documents from a collection
   */
  static async getCollection<T>(
    collectionName: string,
    constraints: QueryConstraint[] = []
  ): Promise<T[]> {
    try {
      const q = query(collection(db, collectionName), ...constraints);
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as T
      );
    } catch (error) {
      console.error(`Error getting collection ${collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Create a new document
   */
  static async createDocument<T extends Record<string, unknown>>(
    collectionName: string,
    data: T,
    documentId?: string
  ): Promise<string> {
    try {
      const docRef = documentId
        ? doc(db, collectionName, documentId)
        : doc(collection(db, collectionName));

      const cleanedData = removeUndefined(data);
      await setDoc(docRef, {
        ...cleanedData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      return docRef.id;
    } catch (error) {
      console.error(`Error creating document in ${collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Update an existing document (or create if it doesn't exist)
   */
  static async updateDocument(
    collectionName: string,
    documentId: string,
    data: Partial<Record<string, unknown>>
  ): Promise<void> {
    try {
      const docRef = doc(db, collectionName, documentId);
      const docSnap = await getDoc(docRef);
      const cleanedData = removeUndefined(data);

      if (docSnap.exists()) {
        // Document exists, update it
        await updateDoc(docRef, {
          ...cleanedData,
          updatedAt: serverTimestamp(),
        });
      } else {
        // Document doesn't exist, create it with the provided ID
        await setDoc(docRef, {
          ...cleanedData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error(`Error updating document ${documentId}:`, error);
      throw error;
    }
  }

  /**
   * Delete a document
   */
  static async deleteDocument(
    collectionName: string,
    documentId: string
  ): Promise<void> {
    try {
      const docRef = doc(db, collectionName, documentId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error(`Error deleting document ${documentId}:`, error);
      throw error;
    }
  }

  /**
   * Query documents with filters
   */
  static async queryDocuments<T>(
    collectionName: string,
    field: string,
    operator: '==' | '!=' | '<' | '<=' | '>' | '>=' | 'array-contains',
    value: unknown
  ): Promise<T[]> {
    try {
      const q = query(
        collection(db, collectionName),
        where(field, operator, value)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(
        (docSnapshot) => ({ id: docSnapshot.id, ...docSnapshot.data() }) as T
      );
    } catch (error) {
      console.error(`Error querying ${collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Paginate documents
   */
  static async paginateDocuments<T>(
    collectionName: string,
    pageSize: number = 20,
    lastDoc?: DocumentSnapshot
  ): Promise<{ data: T[]; lastDoc: DocumentSnapshot | null }> {
    try {
      const constraints: QueryConstraint[] = [limit(pageSize)];

      if (lastDoc) {
        constraints.push(startAfter(lastDoc));
      }

      const q = query(collection(db, collectionName), ...constraints);
      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map(
        (docSnapshot) => ({ id: docSnapshot.id, ...docSnapshot.data() }) as T
      );

      const newLastDoc =
        querySnapshot.docs.length > 0
          ? querySnapshot.docs[querySnapshot.docs.length - 1]
          : null;

      return { data, lastDoc: newLastDoc as DocumentSnapshot | null };
    } catch (error) {
      console.error(`Error paginating ${collectionName}:`, error);
      throw error;
    }
  }
}
