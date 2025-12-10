import { FirestoreService } from '@/lib/services/firestore.service';

export type AdminPricingTier = {
  name: string;
  price: string;
  priceNote?: string;
  badge?: string;
  preferredFor: string;
  features: string[];
  hasProjectManager: boolean;
  ctaText: string;
  ctaLink?: string;
};

export type AdminPricingDetail = {
  id?: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  heroImage?: string;
  tiers: AdminPricingTier[];
  note?: string;
  contractTerms?: string;
  customPackageForm?: {
    title: string;
    description: string;
    fields: Array<{
      name: string;
      label: string;
      type: 'text' | 'email' | 'tel' | 'select' | 'number';
      placeholder?: string;
      required: boolean;
      options?: string[];
    }>;
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  status: 'draft' | 'published';
  updatedAt?: unknown;
  createdAt?: unknown;
};

const COLLECTION = 'pricing';

export async function fetchPricingDetails(): Promise<AdminPricingDetail[]> {
  return FirestoreService.getCollection<AdminPricingDetail>(COLLECTION);
}

export async function savePricingDetail(
  detail: AdminPricingDetail
): Promise<string> {
  const { id, ...data } = detail;
  const payload = {
    ...data,
    slug: data.slug.trim().toLowerCase(),
    title: data.title.trim(),
    shortDescription: data.shortDescription.trim(),
    longDescription: data.longDescription.trim(),
  };
  if (id) {
    await FirestoreService.updateDocument(COLLECTION, id, payload);
    return id;
  }
  return FirestoreService.createDocument(COLLECTION, payload);
}

export async function deletePricingDetail(id: string): Promise<void> {
  return FirestoreService.deleteDocument(COLLECTION, id);
}
