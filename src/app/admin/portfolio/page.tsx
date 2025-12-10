'use client';

import { useEffect, useMemo, useState } from 'react';
import { AdminGuard } from '@/components/admin/admin-guard';
import {
  fetchPortfolioItems,
  savePortfolioItem,
  deletePortfolioItem,
  type AdminPortfolioItem,
  type PortfolioCategory,
  type WebsiteSubCategory,
  type GraphicsSubCategory,
  type MediaType,
} from '@/lib/admin/portfolio-admin';
import { StorageService } from '@/lib/services/storage.service';
import { Plus, Upload, X, Loader2, CheckCircle2, Search } from 'lucide-react';
import Image from 'next/image';
import { v4 as uuid } from 'uuid';

const PORTFOLIO_CATEGORIES: Array<{ value: PortfolioCategory; label: string }> =
  [
    { value: 'website-development', label: 'Website Development' },
    { value: 'mobile-application', label: 'Mobile Application' },
    { value: 'graphics-design', label: 'Graphics Design' },
  ];

const WEBSITE_SUB_CATEGORIES: Array<{
  value: WebsiteSubCategory;
  label: string;
}> = [
  { value: 'travel-website', label: 'Travel Website' },
  { value: 'e-commerce', label: 'E-Commerce' },
  { value: 'educational-website', label: 'Educational Website' },
  { value: 'informative-website', label: 'Informative Website' },
  { value: 'news-agency', label: 'News Agency' },
];

const GRAPHICS_SUB_CATEGORIES: Array<{
  value: GraphicsSubCategory;
  label: string;
}> = [
  { value: 'flyer-brochure', label: 'Flyer/Brochure' },
  { value: 'social-media-design', label: 'Social Media Design' },
  { value: 'logo-design', label: 'Logo Design' },
  { value: 'gifs-motion', label: 'Gifs and Motion' },
];

type FormState = Omit<AdminPortfolioItem, 'updatedAt' | 'createdAt'>;

const emptyForm: FormState = {
  id: undefined,
  title: '',
  category: 'website-development',
  websiteSubCategory: undefined,
  graphicsSubCategory: undefined,
  media: [],
  description: '',
  tags: [],
  link: '',
  status: 'draft',
};

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<AdminPortfolioItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState<FormState>(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'draft' | 'published'
  >('all');
  const [categoryFilter, setCategoryFilter] = useState<
    PortfolioCategory | 'all'
  >('all');

  const load = async () => {
    try {
      setLoading(true);
      const data = await fetchPortfolioItems();
      // Sort by updatedAt timestamp (Firestore Timestamp)
      const sorted = data.sort((a, b) => {
        const aTime =
          a.updatedAt &&
          typeof a.updatedAt === 'object' &&
          'seconds' in a.updatedAt
            ? (a.updatedAt as { seconds: number }).seconds
            : 0;
        const bTime =
          b.updatedAt &&
          typeof b.updatedAt === 'object' &&
          'seconds' in b.updatedAt
            ? (b.updatedAt as { seconds: number }).seconds
            : 0;
        return bTime - aTime;
      });
      setItems(sorted);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load portfolio items'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const startEdit = (item?: AdminPortfolioItem) => {
    if (!item) {
      setForm(emptyForm);
    } else {
      // Ensure media has storagePath for existing items (backward compatibility)
      const mediaWithPath = (
        Array.isArray(item.media) ? item.media : item.media ? [item.media] : []
      ).map((m) => {
        if (!m.storagePath && m.url) {
          // Extract path from URL for backward compatibility
          try {
            const urlObj = new URL(m.url);
            const pathMatch = urlObj.pathname.match(/portfolio%2F([^?]+)/);
            if (pathMatch && pathMatch[1]) {
              return {
                ...m,
                storagePath: `portfolio/${decodeURIComponent(pathMatch[1])}`,
              };
            }
          } catch {
            // If URL parsing fails, keep as is
          }
        }
        return m;
      });

      setForm({
        id: item.id,
        title: item.title,
        category: item.category,
        websiteSubCategory: item.websiteSubCategory,
        graphicsSubCategory: item.graphicsSubCategory,
        media: mediaWithPath,
        description: item.description || '',
        tags: item.tags || [],
        link: item.link || '',
        status: item.status,
      });
    }
    setError('');
    setShowForm(true);
  };

  const handleMediaUpload = async (file: File, type: MediaType) => {
    setUploading(true);
    try {
      // Generate portfolio ID if new item (will be saved later)
      const portfolioId = form.id || uuid();
      const ext =
        file.name.split('.').pop() || (type === 'image' ? 'jpg' : 'mp4');
      const fileName = `${uuid()}.${ext}`;
      // Store in portfolio/{portfolioId}/ folder - organized by portfolio item
      const path = `portfolio/${portfolioId}/${fileName}`;

      const metadata = {
        contentType:
          file.type || (type === 'image' ? 'image/jpeg' : 'video/mp4'),
      };
      const url = await StorageService.uploadFileWithProgress(
        path,
        file,
        () => {},
        metadata
      );

      setForm((f) => ({
        ...f,
        // Store the generated ID if it's a new item
        id: f.id || portfolioId,
        media: [
          ...(f.media || []),
          { type, url, contentType: metadata.contentType, storagePath: path },
        ],
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveMedia = async (index: number) => {
    const mediaToRemove = form.media?.[index];
    if (mediaToRemove?.storagePath) {
      try {
        await StorageService.deleteFile(mediaToRemove.storagePath);
      } catch (err) {
        // Silently fail - file may already be deleted or not exist
      }
    }
    setForm((f) => ({
      ...f,
      media: f.media?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError('Title is required.');
      return;
    }
    if (!form.media || form.media.length === 0) {
      setError('At least one media item is required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      // Use the ID from form (generated during upload if new item)
      const itemToSave: AdminPortfolioItem = {
        id: form.id, // This will be the generated UUID for new items
        title: form.title.trim(),
        category: form.category,
        websiteSubCategory: form.websiteSubCategory,
        graphicsSubCategory: form.graphicsSubCategory,
        media: form.media || [],
        description: form.description?.trim() || '',
        tags: form.tags || [],
        link: form.link?.trim() || '',
        status: form.status,
      };
      const savedId = await savePortfolioItem(itemToSave);

      // Update form ID if it was a new item
      if (!form.id && savedId) {
        // Update media storage paths to use the saved ID (if they don't already)
        const updatedMedia = (form.media || []).map((media) => {
          if (
            media.storagePath &&
            !media.storagePath.includes(`portfolio/${savedId}/`)
          ) {
            // Path already correct, just update storagePath reference
            const fileName = media.storagePath.split('/').pop();
            return {
              ...media,
              storagePath: `portfolio/${savedId}/${fileName}`,
            };
          }
          return media;
        });

        // Update the item with correct paths
        if (
          updatedMedia.some(
            (m, i) => m.storagePath !== form.media?.[i]?.storagePath
          )
        ) {
          await savePortfolioItem({
            ...itemToSave,
            id: savedId,
            media: updatedMedia,
          });
        }
      }

      setShowForm(false);
      setForm(emptyForm);
      await load();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to save portfolio item'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (
      !confirm(
        'Delete this portfolio item? This will also delete all associated media files.'
      )
    )
      return;
    try {
      // Find item to get media files
      const item = items.find((i) => i.id === id);
      if (item?.media) {
        // Delete all media files from Storage
        const mediaArray = Array.isArray(item.media)
          ? item.media
          : [item.media];
        for (const media of mediaArray) {
          if (media.storagePath) {
            try {
              await StorageService.deleteFile(media.storagePath);
            } catch (err) {
              // Silently fail - file may already be deleted or not exist
            }
          } else if (media.url) {
            // Extract path from URL if storagePath not available (backward compatibility)
            try {
              const urlObj = new URL(media.url);
              // Handle both old format (portfolio/filename) and new format (portfolio/id/filename)
              const pathMatch = urlObj.pathname.match(/portfolio%2F([^?]+)/);
              if (pathMatch && pathMatch[1]) {
                const decodedPath = decodeURIComponent(pathMatch[1]);
                // Check if it's in the new format (id/filename) or old format (filename)
                if (decodedPath.includes('/')) {
                  // New format: portfolio/id/filename
                  const filePath = `portfolio/${decodedPath}`;
                  await StorageService.deleteFile(filePath);
                } else {
                  // Old format: try new location first, then old location
                  try {
                    await StorageService.deleteFile(
                      `portfolio/${id}/${decodedPath}`
                    );
                  } catch {
                    // Try old location
                    await StorageService.deleteFile(`portfolio/${decodedPath}`);
                  }
                }
              }
            } catch (err) {
              // Silently fail - file may already be deleted or not exist
            }
          }
        }
        // Try to delete the entire folder (if empty, Firebase will handle it)
        try {
          await StorageService.deleteFile(`portfolio/${id}/.keep`).catch(() => {
            // Ignore if .keep doesn't exist
          });
        } catch {
          // Ignore folder deletion errors
        }
      }
      await deletePortfolioItem(id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete');
    }
  };

  const filteredItems = useMemo(() => {
    let filtered = items;
    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (statusFilter !== 'all') {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }
    if (categoryFilter !== 'all') {
      filtered = filtered.filter((item) => item.category === categoryFilter);
    }
    return filtered;
  }, [items, searchQuery, statusFilter, categoryFilter]);

  const statusBadge = (status: 'draft' | 'published') => (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
        status === 'published'
          ? 'border border-green-500/30 bg-green-500/15 text-green-300'
          : 'border border-yellow-500/30 bg-yellow-500/15 text-yellow-200'
      }`}
    >
      {status === 'published' ? (
        <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
      ) : null}
      {status}
    </span>
  );

  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#1b1b1b] px-8 py-10 text-white">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-wider text-gray-400">
                Content
              </p>
              <h1 className="mt-1 text-3xl font-semibold">Portfolio</h1>
              <p className="mt-1 text-gray-500">
                Manage portfolio items with media uploads
              </p>
            </div>
            <button
              onClick={() => startEdit(undefined)}
              className="inline-flex items-center gap-2 rounded-lg bg-[#43b14b] px-4 py-2 text-sm font-medium text-white hover:bg-[#3a9a41]"
            >
              <Plus className="h-4 w-4" />
              New Item
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative min-w-[200px] flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search portfolio..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-800 bg-gray-950 py-2 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:border-[#43b14b] focus:outline-none"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as 'all' | 'draft' | 'published')
              }
              className="rounded-lg border border-gray-800 bg-gray-950 px-4 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(e.target.value as PortfolioCategory | 'all')
              }
              className="rounded-lg border border-gray-800 bg-gray-950 px-4 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
            >
              <option value="all">All Categories</option>
              {PORTFOLIO_CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}

          {loading ? (
            <div className="py-20 text-center text-gray-500">
              Loading portfolio items...
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="py-20 text-center text-gray-500">
              No portfolio items found.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-lg border border-gray-800 bg-gray-900/50 transition-colors hover:border-gray-700"
                >
                  <div className="relative aspect-square bg-gray-800">
                    {(() => {
                      const mediaArray = Array.isArray(item.media)
                        ? item.media
                        : item.media
                          ? [item.media]
                          : [];
                      const firstMedia = mediaArray[0];

                      if (firstMedia?.type === 'image') {
                        return (
                          <Image
                            src={firstMedia.url}
                            alt={item.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        );
                      } else if (firstMedia) {
                        return (
                          <video
                            src={firstMedia.url}
                            className="h-full w-full object-cover"
                            muted
                            loop
                            playsInline
                          />
                        );
                      }
                      return (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#43b14b]/20">
                              <span className="text-xl font-semibold text-[#43b14b]">
                                {item.title.charAt(0)}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                    <div className="absolute inset-0 flex items-center justify-center gap-2 bg-[#1b1b1b]/60 opacity-0 transition-opacity group-hover:opacity-100">
                      <button
                        onClick={() => startEdit(item)}
                        className="rounded-md bg-[#43b14b] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#3a9a41]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="mb-2 flex items-start justify-between">
                      <h3 className="line-clamp-1 text-sm font-medium text-white">
                        {item.title}
                      </h3>
                      {statusBadge(item.status)}
                    </div>
                    <p className="line-clamp-2 text-xs text-gray-500">
                      {item.description}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="rounded bg-gray-800 px-2 py-0.5 text-xs text-gray-600">
                        {
                          PORTFOLIO_CATEGORIES.find(
                            (c) => c.value === item.category
                          )?.label
                        }
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#1b1b1b]/70 px-4 py-8 backdrop-blur-sm">
              <div className="my-8 w-full max-w-3xl rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-2xl">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-wider text-gray-400">
                      {form.id ? 'Edit Portfolio Item' : 'New Portfolio Item'}
                    </p>
                    <h2 className="mt-1 text-xl font-semibold text-white">
                      Portfolio details
                    </h2>
                  </div>
                  <button
                    onClick={() => setShowForm(false)}
                    className="rounded-md border border-gray-800 p-2 text-gray-400 hover:border-gray-700 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">Title *</label>
                      <input
                        value={form.title}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, title: e.target.value }))
                        }
                        className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                        placeholder="Project Name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">
                        Category *
                      </label>
                      <select
                        value={form.category}
                        onChange={(e) => {
                          const cat = e.target.value as PortfolioCategory;
                          setForm((f) => ({
                            ...f,
                            category: cat,
                            websiteSubCategory:
                              cat !== 'website-development'
                                ? undefined
                                : f.websiteSubCategory,
                            graphicsSubCategory:
                              cat !== 'graphics-design'
                                ? undefined
                                : f.graphicsSubCategory,
                          }));
                        }}
                        className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                        required
                      >
                        {PORTFOLIO_CATEGORIES.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {form.category === 'website-development' && (
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">
                        Website Sub-Category
                      </label>
                      <select
                        value={form.websiteSubCategory || ''}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            websiteSubCategory: e.target.value
                              ? (e.target.value as WebsiteSubCategory)
                              : undefined,
                          }))
                        }
                        className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                      >
                        <option value="">None</option>
                        {WEBSITE_SUB_CATEGORIES.map((sub) => (
                          <option key={sub.value} value={sub.value}>
                            {sub.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {form.category === 'graphics-design' && (
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">
                        Graphics Sub-Category
                      </label>
                      <select
                        value={form.graphicsSubCategory || ''}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            graphicsSubCategory: e.target.value
                              ? (e.target.value as GraphicsSubCategory)
                              : undefined,
                          }))
                        }
                        className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                      >
                        <option value="">None</option>
                        {GRAPHICS_SUB_CATEGORIES.map((sub) => (
                          <option key={sub.value} value={sub.value}>
                            {sub.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">Description</label>
                    <textarea
                      value={form.description}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, description: e.target.value }))
                      }
                      className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                      rows={3}
                      placeholder="Project description"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={form.tags?.join(', ') || ''}
                      onChange={(e) => {
                        const tags = e.target.value
                          .split(',')
                          .map((t) => t.trim())
                          .filter((t) => t.length > 0);
                        setForm((f) => ({ ...f, tags }));
                      }}
                      className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                      placeholder="React, Next.js, TypeScript"
                    />
                    <p className="text-xs text-gray-500">
                      Separate tags with commas
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">
                      Media (Images/Videos) *
                    </label>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-800 px-3 py-2 text-sm text-white hover:border-gray-700">
                          <Upload className="h-4 w-4" />
                          <span>
                            {uploading ? 'Uploading...' : 'Add Image'}
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) void handleMediaUpload(file, 'image');
                            }}
                            disabled={uploading}
                          />
                        </label>
                        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-800 px-3 py-2 text-sm text-white hover:border-gray-700">
                          <Upload className="h-4 w-4" />
                          <span>
                            {uploading ? 'Uploading...' : 'Add Video'}
                          </span>
                          <input
                            type="file"
                            accept="video/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) void handleMediaUpload(file, 'video');
                            }}
                            disabled={uploading}
                          />
                        </label>
                      </div>
                      {form.media && form.media.length > 0 && (
                        <div className="grid grid-cols-4 gap-2">
                          {form.media.map((media, index) => (
                            <div
                              key={media.url || index}
                              className="group relative"
                            >
                              <div className="relative h-20 w-full overflow-hidden rounded-md bg-gray-800">
                                {media.type === 'image' ? (
                                  <Image
                                    src={media.url}
                                    alt={`Media ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                  />
                                ) : (
                                  <video
                                    src={media.url}
                                    className="h-full w-full object-cover"
                                    muted
                                  />
                                )}
                              </div>
                              <button
                                type="button"
                                onClick={() => void handleRemoveMedia(index)}
                                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">Link</label>
                      <input
                        value={form.link}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, link: e.target.value }))
                        }
                        className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                        placeholder="https://example.com"
                        type="url"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">Status</label>
                      <select
                        value={form.status}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            status: e.target.value as 'draft' | 'published',
                          }))
                        }
                        className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                  </div>

                  {error && (
                    <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                      {error}
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-3 border-t border-gray-800 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="rounded-lg border border-gray-800 px-4 py-2 text-sm text-gray-200 hover:border-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={
                        saving || !form.media || form.media.length === 0
                      }
                      className="inline-flex items-center gap-2 rounded-lg bg-[#43b14b] px-4 py-2 text-sm font-medium text-white hover:bg-[#3a9a41] disabled:opacity-70"
                    >
                      {saving ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : null}
                      {saving ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminGuard>
  );
}
