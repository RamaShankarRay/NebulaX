import { FirestoreService } from '@/lib/services/firestore.service';

export type AdminActivity = {
  id?: string;
  title: string;
  description: string;
  image?: string;
  date: string;
  location?: string;
  status: 'draft' | 'published';
  updatedAt?: unknown;
  createdAt?: unknown;
};

const COLLECTION = 'activities';

export async function fetchActivities(): Promise<AdminActivity[]> {
  return FirestoreService.getCollection<AdminActivity>(COLLECTION);
}

export async function saveActivity(activity: AdminActivity): Promise<string> {
  const { id, ...data } = activity;
  const payload = {
    ...data,
    title: data.title.trim(),
    description: data.description.trim(),
    location: data.location?.trim() || '',
  };
  if (id) {
    await FirestoreService.updateDocument(COLLECTION, id, payload);
    return id;
  }
  return FirestoreService.createDocument(COLLECTION, payload);
}

export async function deleteActivity(id: string): Promise<void> {
  return FirestoreService.deleteDocument(COLLECTION, id);
}
