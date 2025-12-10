import { FirestoreService } from './firestore.service';
import { where } from 'firebase/firestore';

/**
 * Public content service - fetches only published content
 * This is used by the frontend to display content to visitors
 */

export async function getPublishedServices() {
  return FirestoreService.getCollection('services', [
    where('status', '==', 'published'),
  ]);
}

export async function getPublishedPortfolio() {
  return FirestoreService.getCollection('portfolio', [
    where('status', '==', 'published'),
  ]);
}

export async function getPublishedPricing() {
  return FirestoreService.getCollection('pricing', [
    where('status', '==', 'published'),
  ]);
}

export async function getPublishedBlogs() {
  return FirestoreService.getCollection('blogs', [
    where('status', '==', 'published'),
  ]);
}

export async function getPublishedTestimonials() {
  return FirestoreService.getCollection('testimonials', [
    where('status', '==', 'published'),
  ]);
}

export async function getPublishedPartners() {
  return FirestoreService.getCollection('partners', [
    where('status', '==', 'published'),
  ]);
}

export async function getPublishedTeam() {
  return FirestoreService.getCollection('team', [
    where('status', '==', 'published'),
  ]);
}

export async function getPublishedJobs() {
  return FirestoreService.getCollection('jobs', [
    where('status', '==', 'published'),
  ]);
}

export async function getPublishedActivities() {
  return FirestoreService.getCollection('activities', [
    where('status', '==', 'published'),
  ]);
}

export async function getPublishedFAQs() {
  return FirestoreService.getCollection('faqs', [
    where('status', '==', 'published'),
  ]);
}

export async function getServiceBySlug(slug: string) {
  const services = await FirestoreService.getCollection('services', [
    where('slug', '==', slug),
    where('status', '==', 'published'),
  ]);
  return services[0] || null;
}

export async function getPricingBySlug(slug: string) {
  const pricing = await FirestoreService.getCollection('pricing', [
    where('slug', '==', slug),
    where('status', '==', 'published'),
  ]);
  return pricing[0] || null;
}

export async function getBlogBySlug(slug: string) {
  const blogs = await FirestoreService.getCollection('blogs', [
    where('slug', '==', slug),
    where('status', '==', 'published'),
  ]);
  return blogs[0] || null;
}

export async function getJobBySlug(slug: string) {
  const jobs = await FirestoreService.getCollection('jobs', [
    where('slug', '==', slug),
    where('status', '==', 'published'),
  ]);
  return jobs[0] || null;
}

export async function getSettings() {
  return FirestoreService.getDocument('settings', 'main');
}
