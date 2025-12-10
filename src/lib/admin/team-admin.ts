import { FirestoreService } from '@/lib/services/firestore.service';

export type AdminTeamMember = {
  id?: string;
  name: string;
  role: string;
  bio?: string;
  avatar: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
  order: number;
  status: 'draft' | 'published';
  updatedAt?: unknown;
  createdAt?: unknown;
};

const COLLECTION = 'team';

export async function fetchTeamMembers(): Promise<AdminTeamMember[]> {
  return FirestoreService.getCollection<AdminTeamMember>(COLLECTION);
}

export async function saveTeamMember(member: AdminTeamMember): Promise<string> {
  const { id, ...data } = member;
  const payload = {
    ...data,
    name: data.name.trim(),
    role: data.role.trim(),
    bio: data.bio?.trim() || '',
    order: data.order || 0,
  };
  if (id) {
    await FirestoreService.updateDocument(COLLECTION, id, payload);
    return id;
  }
  return FirestoreService.createDocument(COLLECTION, payload);
}

export async function deleteTeamMember(id: string): Promise<void> {
  return FirestoreService.deleteDocument(COLLECTION, id);
}
