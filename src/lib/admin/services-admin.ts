import { FirestoreService } from '@/lib/services/firestore.service';

export type AdminService = {
  id?: string;
  title: string;
  slug: string;
  shortDescription: string;
  status: 'draft' | 'published';
  heroImage?: string;
  updatedAt?: unknown;
  createdAt?: unknown;
};

const COLLECTION = 'services';

export async function fetchServices(): Promise<AdminService[]> {
  return FirestoreService.getCollection<AdminService>(COLLECTION);
}

export async function saveService(service: AdminService): Promise<string> {
  const { id, ...data } = service;
  const payload = {
    ...data,
    title: data.title.trim(),
    slug: data.slug.trim().toLowerCase(),
    shortDescription: data.shortDescription.trim(),
  };
  if (id) {
    await FirestoreService.updateDocument(COLLECTION, id, payload);
    return id;
  }
  return FirestoreService.createDocument(COLLECTION, payload);
}

export async function deleteService(id: string): Promise<void> {
  return FirestoreService.deleteDocument(COLLECTION, id);
}
