import { FirestoreService } from '@/lib/services/firestore.service';

export type AdminSettings = {
  id?: string;
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  companyAddress: string;
  companyLogo?: string;
  companyFavicon?: string;
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
    ogImage?: string;
  };
  contact?: {
    salesEmail?: string;
    salesPhone?: string;
    careerEmail?: string;
    careerPhone?: string;
    supportEmail?: string;
    supportPhone?: string;
  };
  updatedAt?: unknown;
  createdAt?: unknown;
};

const COLLECTION = 'settings';
const DOCUMENT_ID = 'main';

export async function fetchSettings(): Promise<AdminSettings | null> {
  return FirestoreService.getDocument<AdminSettings>(COLLECTION, DOCUMENT_ID);
}

export async function saveSettings(settings: AdminSettings): Promise<void> {
  const { ...data } = settings;
  const payload = {
    ...data,
    companyName: data.companyName.trim(),
    companyEmail: data.companyEmail.trim(),
    companyPhone: data.companyPhone.trim(),
    companyAddress: data.companyAddress.trim(),
  };
  await FirestoreService.createDocument(COLLECTION, payload, DOCUMENT_ID);
}
