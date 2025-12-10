'use client';

import { useEffect, useMemo, useState } from 'react';
import { AdminGuard } from '@/components/admin/admin-guard';
import {
  fetchTestimonials,
  saveTestimonial,
  deleteTestimonial,
  type AdminTestimonial,
} from '@/lib/admin/testimonials-admin';
import { StorageService } from '@/lib/services/storage.service';
import {
  Plus,
  Upload,
  X,
  Loader2,
  CheckCircle2,
  Search,
  Star,
} from 'lucide-react';
import Image from 'next/image';
import { v4 as uuid } from 'uuid';

type FormState = Omit<AdminTestimonial, 'id' | 'updatedAt' | 'createdAt'>;

const emptyForm: FormState = {
  name: '',
  title: '',
  text: '',
  rating: 5,
  avatar: '',
  company: '',
  status: 'draft',
};

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<AdminTestimonial[]>([]);
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
      const data = await fetchTestimonials();
      const sorted = data.sort(
        (a, b) =>
          (b.updatedAt as any)?.seconds - (a.updatedAt as any)?.seconds || 0
      );
      setTestimonials(sorted);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load testimonials'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const startEdit = (testimonial?: AdminTestimonial) => {
    if (!testimonial) {
      setForm(emptyForm);
    } else {
      setForm({
        name: testimonial.name,
        title: testimonial.title,
        text: testimonial.text,
        rating: testimonial.rating,
        avatar: testimonial.avatar || '',
        company: testimonial.company || '',
        status: testimonial.status,
      });
    }
    setError('');
    setShowForm(true);
  };

  const handleAvatarUpload = async (file: File) => {
    setUploading(true);
    try {
      const ext = file.name.split('.').pop() || 'jpg';
      const path = `testimonials/${uuid()}.${ext}`;
      const url = await StorageService.uploadFileWithProgress(
        path,
        file,
        () => {}
      );
      setForm((f) => ({ ...f, avatar: url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) {
      setError('Name and testimonial text are required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const testimonialToSave: AdminTestimonial = {
        ...form,
        name: form.name.trim(),
        title: form.title.trim(),
        text: form.text.trim(),
        company: form.company?.trim() || '',
      };
      await saveTestimonial(testimonialToSave);
      setShowForm(false);
      setForm(emptyForm);
      await load();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to save testimonial'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm('Delete this testimonial?')) return;
    try {
      await deleteTestimonial(id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete');
    }
  };

  const filteredTestimonials = useMemo(() => {
    let filtered = testimonials;
    if (searchQuery) {
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (statusFilter !== 'all') {
      filtered = filtered.filter((t) => t.status === statusFilter);
    }
    return filtered.sort(
      (a, b) =>
        (b.updatedAt as any)?.seconds - (a.updatedAt as any)?.seconds || 0
    );
  }, [testimonials, searchQuery, statusFilter]);

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
              <h1 className="mt-1 text-3xl font-semibold">Testimonials</h1>
              <p className="mt-1 text-gray-500">Manage customer testimonials</p>
            </div>
            <button
              onClick={() => startEdit(undefined)}
              className="inline-flex items-center gap-2 rounded-lg bg-[#43b14b] px-4 py-2 text-sm font-medium text-white hover:bg-[#3a9a41]"
            >
              <Plus className="h-4 w-4" />
              New Testimonial
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative min-w-[200px] flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search testimonials..."
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
              Loading testimonials...
            </div>
          ) : filteredTestimonials.length === 0 ? (
            <div className="py-20 text-center text-gray-500">
              No testimonials found.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredTestimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="rounded-lg border border-gray-800 bg-gray-900/50 p-4 transition-colors hover:border-gray-700"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {testimonial.avatar ? (
                        <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-800">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800">
                          <span className="text-sm font-medium text-gray-400">
                            {testimonial.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-medium text-white">
                          {testimonial.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {testimonial.title}
                        </div>
                      </div>
                    </div>
                    {statusBadge(testimonial.status)}
                  </div>
                  <div className="mb-2 flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < testimonial.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-700'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mb-3 line-clamp-3 text-sm text-gray-400">
                    {testimonial.text}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => startEdit(testimonial)}
                      className="flex-1 rounded-md border border-gray-800 px-3 py-1.5 text-xs hover:border-gray-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial.id)}
                      className="rounded-md border border-red-500/30 px-3 py-1.5 text-xs text-red-300 hover:border-red-500/60"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#1b1b1b]/70 px-4 py-8 backdrop-blur-sm">
              <div className="my-8 w-full max-w-2xl rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-2xl">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-wider text-gray-400">
                      {form.name ? 'Edit Testimonial' : 'New Testimonial'}
                    </p>
                    <h2 className="mt-1 text-xl font-semibold text-white">
                      Testimonial details
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
                      <label className="text-sm text-gray-300">Name *</label>
                      <input
                        value={form.name}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, name: e.target.value }))
                        }
                        className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">Title</label>
                      <input
                        value={form.title}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, title: e.target.value }))
                        }
                        className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                        placeholder="CEO, Company Name"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">
                      Testimonial Text *
                    </label>
                    <textarea
                      value={form.text}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, text: e.target.value }))
                      }
                      className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                      rows={4}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">Rating</label>
                      <select
                        value={form.rating}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            rating: parseInt(e.target.value),
                          }))
                        }
                        className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                      >
                        {[1, 2, 3, 4, 5].map((r) => (
                          <option key={r} value={r}>
                            {r} Star{r !== 1 ? 's' : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">Company</label>
                      <input
                        value={form.company}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, company: e.target.value }))
                        }
                        className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
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
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">Avatar</label>
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
                            if (file) void handleAvatarUpload(file);
                          }}
                          disabled={uploading}
                        />
                      </label>
                      {form.avatar && (
                        <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gray-800">
                          <Image
                            src={form.avatar}
                            alt="Avatar"
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      )}
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
