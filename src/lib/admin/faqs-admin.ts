import { FirestoreService } from '@/lib/services/firestore.service';

export type AdminFAQ = {
  id?: string;
  question: string;
  answer: string;
  category?: string;
  order: number;
  status: 'draft' | 'published';
  updatedAt?: unknown;
  createdAt?: unknown;
};

const COLLECTION = 'faqs';

export async function fetchFAQs(): Promise<AdminFAQ[]> {
  return FirestoreService.getCollection<AdminFAQ>(COLLECTION);
}

export async function saveFAQ(faq: AdminFAQ): Promise<string> {
  const { id, ...data } = faq;
  const payload = {
    ...data,
    question: data.question.trim(),
    answer: data.answer.trim(),
    category: data.category?.trim() || '',
    order: data.order || 0,
  };
  if (id) {
    await FirestoreService.updateDocument(COLLECTION, id, payload);
    return id;
  }
  return FirestoreService.createDocument(COLLECTION, payload);
}

export async function deleteFAQ(id: string): Promise<void> {
  return FirestoreService.deleteDocument(COLLECTION, id);
}
