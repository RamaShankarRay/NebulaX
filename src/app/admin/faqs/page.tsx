'use client';

import { useEffect, useMemo, useState } from 'react';
import { AdminGuard } from '@/components/admin/admin-guard';
import {
  fetchFAQs,
  saveFAQ,
  deleteFAQ,
  type AdminFAQ,
} from '@/lib/admin/faqs-admin';
import { Plus, X, Loader2, CheckCircle2, Search } from 'lucide-react';

type FormState = Omit<AdminFAQ, 'id' | 'updatedAt' | 'createdAt'>;

const emptyForm: FormState = {
  question: '',
  answer: '',
  category: '',
  order: 0,
  status: 'draft',
};

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<AdminFAQ[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
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
      const data = await fetchFAQs();
      const sorted = data.sort(
        (a, b) =>
          a.order - b.order ||
          (b.updatedAt as any)?.seconds - (a.updatedAt as any)?.seconds ||
          0
      );
      setFaqs(sorted);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load FAQs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const startEdit = (faq?: AdminFAQ) => {
    if (!faq) {
      setForm(emptyForm);
    } else {
      setForm({
        question: faq.question,
        answer: faq.answer,
        category: faq.category || '',
        order: faq.order || 0,
        status: faq.status,
      });
    }
    setError('');
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.question.trim() || !form.answer.trim()) {
      setError('Question and answer are required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const faqToSave: AdminFAQ = {
        ...form,
        question: form.question.trim(),
        answer: form.answer.trim(),
        category: form.category?.trim() || '',
      };
      await saveFAQ(faqToSave);
      setShowForm(false);
      setForm(emptyForm);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save FAQ');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm('Delete this FAQ?')) return;
    try {
      await deleteFAQ(id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete');
    }
  };

  const filteredFAQs = useMemo(() => {
    let filtered = faqs;
    if (searchQuery) {
      filtered = filtered.filter(
        (f) =>
          f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (statusFilter !== 'all') {
      filtered = filtered.filter((f) => f.status === statusFilter);
    }
    return filtered.sort(
      (a, b) =>
        a.order - b.order ||
        (b.updatedAt as any)?.seconds - (a.updatedAt as any)?.seconds ||
        0
    );
  }, [faqs, searchQuery, statusFilter]);

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
              <h1 className="mt-1 text-3xl font-semibold">FAQs</h1>
              <p className="mt-1 text-gray-500">
                Manage frequently asked questions
              </p>
            </div>
            <button
              onClick={() => startEdit(undefined)}
              className="inline-flex items-center gap-2 rounded-lg bg-[#43b14b] px-4 py-2 text-sm font-medium text-white hover:bg-[#3a9a41]"
            >
              <Plus className="h-4 w-4" />
              New FAQ
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative min-w-[200px] flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search FAQs..."
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
              Loading FAQs...
            </div>
          ) : filteredFAQs.length === 0 ? (
            <div className="py-20 text-center text-gray-500">
              No FAQs found.
            </div>
          ) : (
            <div className="space-y-3">
              {filteredFAQs.map((faq) => (
                <div
                  key={faq.id}
                  className="rounded-lg border border-gray-800 bg-gray-900/50 p-4 transition-colors hover:border-gray-700"
                >
                  <div className="mb-2 flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="mb-1 text-sm font-semibold text-white">
                        {faq.question}
                      </h3>
                      <p className="line-clamp-2 text-xs text-gray-400">
                        {faq.answer}
                      </p>
                      {faq.category && (
                        <span className="mt-2 inline-block rounded bg-gray-800 px-2 py-0.5 text-xs text-gray-600">
                          {faq.category}
                        </span>
                      )}
                    </div>
                    <div className="ml-4 flex items-center gap-2">
                      {statusBadge(faq.status)}
                      <button
                        onClick={() => startEdit(faq)}
                        className="rounded-md border border-gray-800 px-3 py-1.5 text-xs hover:border-gray-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(faq.id)}
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
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1b1b1b]/70 px-4 backdrop-blur-sm">
              <div className="w-full max-w-2xl rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-2xl">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-wider text-gray-400">
                      {form.question ? 'Edit FAQ' : 'New FAQ'}
                    </p>
                    <h2 className="mt-1 text-xl font-semibold text-white">
                      FAQ details
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
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">Question *</label>
                    <input
                      value={form.question}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, question: e.target.value }))
                      }
                      className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">Answer *</label>
                    <textarea
                      value={form.answer}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, answer: e.target.value }))
                      }
                      className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                      rows={4}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">Category</label>
                      <input
                        value={form.category}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, category: e.target.value }))
                        }
                        className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                        placeholder="General"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">Order</label>
                      <input
                        type="number"
                        value={form.order}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            order: parseInt(e.target.value) || 0,
                          }))
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
