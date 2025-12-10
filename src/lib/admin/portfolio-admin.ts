import { FirestoreService } from '@/lib/services/firestore.service';

export type PortfolioCategory =
  | 'website-development'
  | 'mobile-application'
  | 'graphics-design';
export type WebsiteSubCategory =
  | 'travel-website'
  | 'e-commerce'
  | 'educational-website'
  | 'informative-website'
  | 'news-agency';
export type GraphicsSubCategory =
  | 'flyer-brochure'
  | 'social-media-design'
  | 'logo-design'
  | 'gifs-motion';
export type MediaType = 'image' | 'video';

export type PortfolioMedia = {
  type: MediaType;
  url: string;
  contentType?: string; // Store the actual MIME type for proper video playback
  storagePath?: string; // Store the Storage path for cleanup
};

export type AdminPortfolioItem = {
  id?: string;
  title: string;
  category: PortfolioCategory;
  websiteSubCategory?: WebsiteSubCategory;
  graphicsSubCategory?: GraphicsSubCategory;
  media?: PortfolioMedia[]; // Array of media items
  description?: string;
  tags?: string[];
  link?: string;
  status: 'draft' | 'published';
  updatedAt?: unknown;
  createdAt?: unknown;
};

const COLLECTION = 'portfolio';

export async function fetchPortfolioItems(): Promise<AdminPortfolioItem[]> {
  return FirestoreService.getCollection<AdminPortfolioItem>(COLLECTION);
}

export async function savePortfolioItem(
  item: AdminPortfolioItem
): Promise<string> {
  const { id, ...data } = item;

  // Build payload and remove undefined values (Firestore doesn't accept undefined)
  const payload: Record<string, unknown> = {
    title: data.title.trim(),
    category: data.category,
    status: data.status,
    description: data.description?.trim() || '',
    tags: data.tags || [],
  };

  // Only include optional fields if they have values
  if (data.websiteSubCategory) {
    payload.websiteSubCategory = data.websiteSubCategory;
  }
  if (data.graphicsSubCategory) {
    payload.graphicsSubCategory = data.graphicsSubCategory;
  }
  if (data.media && data.media.length > 0) {
    payload.media = data.media;
  }
  if (data.link?.trim()) {
    payload.link = data.link.trim();
  }

  if (id) {
    await FirestoreService.updateDocument(COLLECTION, id, payload);
    return id;
  }
  // For new items, use the ID from the item if provided (for folder structure)
  return FirestoreService.createDocument(COLLECTION, payload, id);
}

export async function deletePortfolioItem(id: string): Promise<void> {
  return FirestoreService.deleteDocument(COLLECTION, id);
}
