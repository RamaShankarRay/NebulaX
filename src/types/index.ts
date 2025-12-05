import { User as FirebaseUser } from 'firebase/auth';

export interface User extends FirebaseUser {
  // Extended user properties
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  uid: string;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
