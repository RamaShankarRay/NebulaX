import { FirestoreService } from '@/lib/services/firestore.service';

export type JobCategory = 'development' | 'management' | 'design' | 'marketing';

export type AdminJob = {
  id?: string;
  slug: string;
  title: string;
  category: JobCategory;
  functionalTitle: string;
  corporateTitle: string;
  vacancies: number;
  postedDate: string;
  shortDescription: string;
  fullDescription: string;
  requirements: Array<{ text: string }>;
  responsibilities: Array<{ text: string }>;
  benefits: Array<{ text: string }>;
  contactEmail: string;
  status: 'draft' | 'published';
  updatedAt?: unknown;
  createdAt?: unknown;
};

const COLLECTION = 'jobs';

export async function fetchJobs(): Promise<AdminJob[]> {
  return FirestoreService.getCollection<AdminJob>(COLLECTION);
}

export async function saveJob(job: AdminJob): Promise<string> {
  const { id, ...data } = job;
  const payload = {
    ...data,
    slug: data.slug.trim().toLowerCase(),
    title: data.title.trim(),
    functionalTitle: data.functionalTitle.trim(),
    corporateTitle: data.corporateTitle.trim(),
    shortDescription: data.shortDescription.trim(),
    fullDescription: data.fullDescription.trim(),
    contactEmail: data.contactEmail.trim(),
    requirements: data.requirements || [],
    responsibilities: data.responsibilities || [],
    benefits: data.benefits || [],
  };
  if (id) {
    await FirestoreService.updateDocument(COLLECTION, id, payload);
    return id;
  }
  return FirestoreService.createDocument(COLLECTION, payload);
}

export async function deleteJob(id: string): Promise<void> {
  return FirestoreService.deleteDocument(COLLECTION, id);
}
