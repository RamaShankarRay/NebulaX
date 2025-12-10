import { FirestoreService } from '@/lib/services/firestore.service';

export type AdminPartner = {
  id?: string;
  name: string;
  logo: string;
  website?: string;
  description?: string;
  status: 'draft' | 'published';
  updatedAt?: unknown;
  createdAt?: unknown;
};

const COLLECTION = 'partners';

export async function fetchPartners(): Promise<AdminPartner[]> {
  return FirestoreService.getCollection<AdminPartner>(COLLECTION);
}

export async function savePartner(partner: AdminPartner): Promise<string> {
  const { id, ...data } = partner;
  const payload = {
    ...data,
    name: data.name.trim(),
    description: data.description?.trim() || '',
  };
  if (id) {
    await FirestoreService.updateDocument(COLLECTION, id, payload);
    return id;
  }
  return FirestoreService.createDocument(COLLECTION, payload);
}

export async function deletePartner(id: string): Promise<void> {
  return FirestoreService.deleteDocument(COLLECTION, id);
}
