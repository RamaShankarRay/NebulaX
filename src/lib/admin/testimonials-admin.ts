import { FirestoreService } from '@/lib/services/firestore.service';

export type AdminTestimonial = {
  id?: string;
  name: string;
  title: string;
  text: string;
  rating: number;
  avatar?: string;
  company?: string;
  status: 'draft' | 'published';
  updatedAt?: unknown;
  createdAt?: unknown;
};

const COLLECTION = 'testimonials';

export async function fetchTestimonials(): Promise<AdminTestimonial[]> {
  return FirestoreService.getCollection<AdminTestimonial>(COLLECTION);
}

export async function saveTestimonial(
  testimonial: AdminTestimonial
): Promise<string> {
  const { id, ...data } = testimonial;
  const payload = {
    ...data,
    name: data.name.trim(),
    title: data.title.trim(),
    text: data.text.trim(),
    rating: Math.max(1, Math.min(5, data.rating)),
  };
  if (id) {
    await FirestoreService.updateDocument(COLLECTION, id, payload);
    return id;
  }
  return FirestoreService.createDocument(COLLECTION, payload);
}

export async function deleteTestimonial(id: string): Promise<void> {
  return FirestoreService.deleteDocument(COLLECTION, id);
}
