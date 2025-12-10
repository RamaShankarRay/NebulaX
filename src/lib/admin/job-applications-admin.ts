import { FirestoreService } from '@/lib/services/firestore.service';
import { where } from 'firebase/firestore';

export type JobApplicationStatus =
  | 'pending'
  | 'reviewed'
  | 'rejected'
  | 'accepted';

export type JobApplication = {
  id?: string;
  jobId: string;
  jobTitle: string;
  jobSlug: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  coverLetter?: string;
  cvUrl?: string;
  cvStoragePath?: string;
  status: JobApplicationStatus;
  notes?: string;
  createdAt?: unknown;
  updatedAt?: unknown;
};

const COLLECTION = 'job-applications';

export async function fetchJobApplications(
  jobId?: string
): Promise<JobApplication[]> {
  try {
    if (jobId) {
      return FirestoreService.getCollection<JobApplication>(COLLECTION, [
        where('jobId', '==', jobId),
      ]);
    }
    return FirestoreService.getCollection<JobApplication>(COLLECTION);
  } catch (error) {
    console.error('Error fetching job applications:', error);
    throw error;
  }
}

export async function saveJobApplication(
  application: JobApplication
): Promise<string> {
  const { id, ...data } = application;
  const payload = {
    ...data,
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone.trim(),
    address: data.address?.trim() || '',
    coverLetter: data.coverLetter?.trim() || '',
    notes: data.notes?.trim() || '',
  };

  if (id) {
    await FirestoreService.updateDocument(COLLECTION, id, payload);
    return id;
  }
  return FirestoreService.createDocument(COLLECTION, payload);
}

export async function updateApplicationStatus(
  id: string,
  status: JobApplicationStatus,
  notes?: string
): Promise<void> {
  const payload: Record<string, unknown> = {
    status,
  };
  if (notes !== undefined) {
    payload.notes = notes.trim();
  }
  await FirestoreService.updateDocument(COLLECTION, id, payload);
}

export async function deleteJobApplication(id: string): Promise<void> {
  return FirestoreService.deleteDocument(COLLECTION, id);
}
