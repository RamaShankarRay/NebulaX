'use client';

import { useEffect, useMemo, useState } from 'react';
import { AdminGuard } from '@/components/admin/admin-guard';
import {
  fetchBlogs,
  saveBlog,
  deleteBlog,
  type AdminBlog,
} from '@/lib/admin/blogs-admin';
import { StorageService } from '@/lib/services/storage.service';
import { Plus, Upload, X, Loader2, CheckCircle2, Search } from 'lucide-react';
import Image from 'next/image';
import { v4 as uuid } from 'uuid';

type FormState = Omit<AdminBlog, 'id' | 'updatedAt' | 'createdAt'>;

const emptyForm: FormState = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  featuredImage: '',
  author: '',
  publishedDate: new Date().toISOString().split('T')[0] || '',
  status: 'draft',
  tags: [],
};

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<AdminBlog[]>([]);
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

  const load = async () => {
    try {
      setLoading(true);
      const data = await fetchBlogs();
      const sorted = data.sort(
        (a, b) =>
          (b.updatedAt as any)?.seconds - (a.updatedAt as any)?.seconds || 0
      );
      setBlogs(sorted);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const startEdit = (blog?: AdminBlog) => {
    if (!blog) {
      setForm(emptyForm);
    } else {
      setForm({
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt,
        content: blog.content,
        featuredImage: blog.featuredImage || '',
        author: blog.author || '',
        publishedDate: blog.publishedDate,
        status: blog.status,
        tags: blog.tags || [],
      });
    }
    setError('');
    setShowForm(true);
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      const ext = file.name.split('.').pop() || 'jpg';
      const path = `blogs/${uuid()}.${ext}`;
      const url = await StorageService.uploadFileWithProgress(
        path,
        file,
        () => {}
      );
      setForm((f) => ({ ...f, featuredImage: url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.slug.trim()) {
      setError('Title and slug are required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const blogToSave: AdminBlog = {
        ...form,
        title: form.title.trim(),
        slug: form.slug.trim().toLowerCase(),
        excerpt: form.excerpt.trim(),
        content: form.content.trim(),
        tags: form.tags || [],
      };
      await saveBlog(blogToSave);
      setShowForm(false);
      setForm(emptyForm);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save blog');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm('Delete this blog?')) return;
    try {
      await deleteBlog(id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete');
    }
  };

  const filteredBlogs = useMemo(() => {
    let filtered = blogs;
    if (searchQuery) {
      filtered = filtered.filter(
        (b) =>
          b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (statusFilter !== 'all') {
      filtered = filtered.filter((b) => b.status === statusFilter);
    }
    return filtered.sort(
      (a, b) =>
        (b.updatedAt as any)?.seconds - (a.updatedAt as any)?.seconds || 0
    );
  }, [blogs, searchQuery, statusFilter]);

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
              <h1 className="mt-1 text-3xl font-semibold">Blogs</h1>
              <p className="mt-1 text-gray-500">Create and manage blog posts</p>
            </div>
            <button
              onClick={() => startEdit(undefined)}
              className="inline-flex items-center gap-2 rounded-lg bg-[#43b14b] px-4 py-2 text-sm font-medium text-white hover:bg-[#3a9a41]"
            >
              <Plus className="h-4 w-4" />
              New Blog
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative min-w-[200px] flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-800 bg-gray-950 py-2 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:border-[#43b14b] focus:outline-none"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="rounded-lg border border-gray-800 bg-gray-950 px-4 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}

          {loading ? (
            <div className="py-20 text-center text-gray-500">
              Loading blogs...
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="py-20 text-center text-gray-500">
              No blogs found.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="group overflow-hidden rounded-lg border border-gray-800 bg-gray-900/50 transition-colors hover:border-gray-700"
                >
                  {blog.featuredImage && (
                    <div className="relative h-48 bg-gray-800">
                      <Image
                        src={blog.featuredImage}
                        alt={blog.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="mb-2 flex items-start justify-between">
                      <h3 className="line-clamp-2 flex-1 text-sm font-medium text-white">
                        {blog.title}
                      </h3>
                      {statusBadge(blog.status)}
                    </div>
                    <p className="mb-3 line-clamp-2 text-xs text-gray-500">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => startEdit(blog)}
                        className="flex-1 rounded-md border border-gray-800 px-3 py-1.5 text-xs hover:border-gray-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="rounded-md border border-red-500/30 px-3 py-1.5 text-xs text-red-300 hover:border-red-500/60"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#1b1b1b]/70 px-4 py-8 backdrop-blur-sm">
              <div className="my-8 w-full max-w-4xl rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-2xl">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-wider text-gray-400">
                      {form.title ? 'Edit Blog' : 'New Blog'}
                    </p>
                    <h2 className="mt-1 text-xl font-semibold text-white">
                      Blog details
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
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">Slug *</label>
                      <input
                        value={form.slug}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, slug: e.target.value }))
                        }
                        className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">Excerpt</label>
                    <textarea
                      value={form.excerpt}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, excerpt: e.target.value }))
                      }
                      className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">Content</label>
                    <textarea
                      value={form.content}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, content: e.target.value }))
                      }
                      className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                      rows={8}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">
                        Featured Image
                      </label>
                      <div className="flex items-center gap-3">
                        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-800 px-3 py-2 text-sm text-white hover:border-gray-700">
                          <Upload className="h-4 w-4" />
                          <span>{uploading ? 'Uploading...' : 'Upload'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) void handleImageUpload(file);
                            }}
                            disabled={uploading}
                          />
                        </label>
                        {form.featuredImage && (
                          <div className="relative h-12 w-20 overflow-hidden rounded-md bg-gray-800">
                            <Image
                              src={form.featuredImage}
                              alt="Featured"
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">Author</label>
                      <input
                        value={form.author}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, author: e.target.value }))
                        }
                        className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">
                        Published Date
                      </label>
                      <input
                        type="date"
                        value={form.publishedDate}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            publishedDate: e.target.value,
                          }))
                        }
                        className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">
                        Tags (comma-separated)
                      </label>
                      <input
                        value={form.tags?.join(', ') || ''}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            tags: e.target.value
                              .split(',')
                              .map((t) => t.trim())
                              .filter(Boolean),
                          }))
                        }
                        className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                        placeholder="tag1, tag2, tag3"
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
                      disabled={saving}
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
