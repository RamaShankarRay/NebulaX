'use client';

import { useEffect, useMemo, useState } from 'react';
import { AdminGuard } from '@/components/admin/admin-guard';
import {
  fetchServices,
  saveService,
  deleteService,
  type AdminService,
} from '@/lib/admin/services-admin';
import { StorageService } from '@/lib/services/storage.service';
import { motion } from 'framer-motion';
import {
  Plus,
  Edit3,
  Trash2,
  Upload,
  X,
  Loader2,
  CheckCircle2,
  Search,
} from 'lucide-react';
import Image from 'next/image';
import { v4 as uuid } from 'uuid';

type FormState = {
  id?: string;
  title: string;
  slug: string;
  shortDescription: string;
  status: 'draft' | 'published';
  heroImage?: string;
};

const emptyForm: FormState = {
  title: '',
  slug: '',
  shortDescription: '',
  status: 'draft',
  heroImage: '',
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<AdminService[]>([]);
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
      const data = await fetchServices();
      const sorted = data.sort(
        (a, b) =>
          (b.updatedAt as any)?.seconds - (a.updatedAt as any)?.seconds || 0
      );
      setServices(sorted);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const startEdit = (svc?: AdminService) => {
    if (!svc) {
      setForm(emptyForm);
    } else {
      setForm({
        id: svc.id,
        title: svc.title,
        slug: svc.slug,
        shortDescription: svc.shortDescription,
        status: svc.status,
        heroImage: svc.heroImage,
      });
    }
    setError('');
    setShowForm(true);
  };

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const ext = file.name.split('.').pop() || 'jpg';
      const path = `services/${uuid()}.${ext}`;
      const url = await StorageService.uploadFileWithProgress(
        path,
        file,
        () => {}
      );
      setForm((f) => ({ ...f, heroImage: url }));
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
      await saveService({
        id: form.id,
        title: form.title,
        slug: form.slug.toLowerCase(),
        shortDescription: form.shortDescription,
        status: form.status,
        heroImage: form.heroImage,
      });
      setShowForm(false);
      setForm(emptyForm);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save service');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm('Delete this service?')) return;
    try {
      await deleteService(id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete');
    }
  };

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

  const filteredServices = useMemo(() => {
    let filtered = services;
    if (searchQuery) {
      filtered = filtered.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (statusFilter !== 'all') {
      filtered = filtered.filter((s) => s.status === statusFilter);
    }
    return filtered.sort(
      (a, b) =>
        (b.updatedAt as any)?.seconds - (a.updatedAt as any)?.seconds || 0
    );
  }, [services, searchQuery, statusFilter]);

  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#1b1b1b] px-4 py-10 text-white">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-wider text-gray-400">
                Content
              </p>
              <h1 className="mt-1 text-3xl font-semibold">Services</h1>
              <p className="mt-1 text-gray-500">
                Create, edit, publish, and manage services.
              </p>
            </div>
            <button
              onClick={() => startEdit(undefined)}
              className="inline-flex items-center gap-2 rounded-lg bg-[#43b14b] px-4 py-2 text-sm font-medium text-white hover:bg-[#3a9a41]"
            >
              <Plus className="h-4 w-4" />
              New Service
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative min-w-[200px] flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search services..."
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

          <div className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900/60">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-900 text-gray-400">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Title</th>
                    <th className="px-4 py-3 text-left font-medium">Slug</th>
                    <th className="px-4 py-3 text-left font-medium">Status</th>
                    <th className="px-4 py-3 text-left font-medium">Updated</th>
                    <th className="px-4 py-3 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-10 text-center text-gray-500"
                      >
                        Loading...
                      </td>
                    </tr>
                  ) : filteredServices.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-10 text-center text-gray-500"
                      >
                        No services found.
                      </td>
                    </tr>
                  ) : (
                    filteredServices.map((svc) => (
                      <tr key={svc.id} className="border-t border-gray-800">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {svc.heroImage ? (
                              <div className="relative h-10 w-14 overflow-hidden rounded-md bg-gray-800">
                                <Image
                                  src={svc.heroImage}
                                  alt={svc.title}
                                  fill
                                  className="object-cover"
                                  unoptimized
                                />
                              </div>
                            ) : (
                              <div className="h-10 w-14 rounded-md bg-gray-800" />
                            )}
                            <div>
                              <div className="font-medium text-white">
                                {svc.title}
                              </div>
                              <div className="line-clamp-1 text-xs text-gray-500">
                                {svc.shortDescription}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-400">{svc.slug}</td>
                        <td className="px-4 py-3">{statusBadge(svc.status)}</td>
                        <td className="px-4 py-3 text-gray-400">
                          {(svc.updatedAt as any)?.toDate
                            ? (svc.updatedAt as any).toDate().toLocaleString()
                            : '—'}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => startEdit(svc)}
                              className="inline-flex items-center gap-1 rounded-md border border-gray-800 px-3 py-1.5 text-xs hover:border-gray-700"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(svc.id)}
                              className="inline-flex items-center gap-1 rounded-md border border-gray-800 px-3 py-1.5 text-xs text-red-300 hover:border-red-500/60"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1b1b1b]/70 px-4 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-2xl rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-2xl"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-wider text-gray-400">
                      {form.id ? 'Edit Service' : 'New Service'}
                    </p>
                    <h2 className="text-xl font-semibold text-white">
                      Service details
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
                      <label className="text-sm text-gray-300">Title</label>
                      <input
                        value={form.title}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, title: e.target.value }))
                        }
                        className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                        placeholder="Website Development"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">Slug</label>
                      <input
                        value={form.slug}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, slug: e.target.value }))
                        }
                        className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                        placeholder="website-development"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">
                      Short Description
                    </label>
                    <textarea
                      value={form.shortDescription}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          shortDescription: e.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                      rows={3}
                      placeholder="Concise overview shown on cards"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">
                        Hero Image
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
                              if (file) void handleFile(file);
                            }}
                            disabled={uploading}
                          />
                        </label>
                        {form.heroImage && (
                          <div className="relative h-12 w-20 overflow-hidden rounded-md bg-gray-800">
                            <Image
                              src={form.heroImage}
                              alt="Hero"
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                      {error}
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-3 pt-2">
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
                      {saving
                        ? 'Saving...'
                        : form.id
                          ? 'Save changes'
                          : 'Create'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </AdminGuard>
  );
}
