import { FirestoreService } from '@/lib/services/firestore.service';

export type AdminBlog = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  author?: string;
  publishedDate: string;
  status: 'draft' | 'published';
  tags?: string[];
  updatedAt?: unknown;
  createdAt?: unknown;
};

const COLLECTION = 'blogs';

export async function fetchBlogs(): Promise<AdminBlog[]> {
  return FirestoreService.getCollection<AdminBlog>(COLLECTION);
}

export async function saveBlog(blog: AdminBlog): Promise<string> {
  const { id, ...data } = blog;
  const payload = {
    ...data,
    slug: data.slug.trim().toLowerCase(),
    title: data.title.trim(),
    excerpt: data.excerpt.trim(),
    content: data.content.trim(),
    tags: data.tags || [],
  };
  if (id) {
    await FirestoreService.updateDocument(COLLECTION, id, payload);
    return id;
  }
  return FirestoreService.createDocument(COLLECTION, payload);
}

export async function deleteBlog(id: string): Promise<void> {
  return FirestoreService.deleteDocument(COLLECTION, id);
}
