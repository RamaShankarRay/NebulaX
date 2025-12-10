'use client';

import { useEffect, useMemo, useState } from 'react';
import { AdminGuard } from '@/components/admin/admin-guard';
import {
  fetchTeamMembers,
  saveTeamMember,
  deleteTeamMember,
  type AdminTeamMember,
} from '@/lib/admin/team-admin';
import { StorageService } from '@/lib/services/storage.service';
import { Plus, Upload, X, Loader2, CheckCircle2, Search } from 'lucide-react';
import Image from 'next/image';
import { v4 as uuid } from 'uuid';

type FormState = Omit<AdminTeamMember, 'id' | 'updatedAt' | 'createdAt'>;

const emptyForm: FormState = {
  name: '',
  role: '',
  bio: '',
  avatar: '',
  email: '',
  linkedin: '',
  twitter: '',
  github: '',
  order: 0,
  status: 'draft',
};

export default function AdminTeamPage() {
  const [members, setMembers] = useState<AdminTeamMember[]>([]);
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
      const data = await fetchTeamMembers();
      const sorted = data.sort(
        (a, b) =>
          a.order - b.order ||
          (b.updatedAt as any)?.seconds - (a.updatedAt as any)?.seconds ||
          0
      );
      setMembers(sorted);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load team members'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const startEdit = (member?: AdminTeamMember) => {
    if (!member) {
      setForm(emptyForm);
    } else {
      setForm({
        name: member.name,
        role: member.role,
        bio: member.bio || '',
        avatar: member.avatar,
        email: member.email || '',
        linkedin: member.linkedin || '',
        twitter: member.twitter || '',
        github: member.github || '',
        order: member.order || 0,
        status: member.status,
      });
    }
    setError('');
    setShowForm(true);
  };

  const handleAvatarUpload = async (file: File) => {
    setUploading(true);
    try {
      const ext = file.name.split('.').pop() || 'jpg';
      const path = `team/${uuid()}.${ext}`;
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
    if (!form.name.trim() || !form.role.trim() || !form.avatar) {
      setError('Name, role, and avatar are required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const memberToSave: AdminTeamMember = {
        ...form,
        name: form.name.trim(),
        role: form.role.trim(),
        bio: form.bio?.trim() || '',
      };
      await saveTeamMember(memberToSave);
      setShowForm(false);
      setForm(emptyForm);
      await load();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to save team member'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm('Delete this team member?')) return;
    try {
      await deleteTeamMember(id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete');
    }
  };

  const filteredMembers = useMemo(() => {
    let filtered = members;
    if (searchQuery) {
      filtered = filtered.filter(
        (m) =>
          m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.role.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (statusFilter !== 'all') {
      filtered = filtered.filter((m) => m.status === statusFilter);
    }
    return filtered.sort(
      (a, b) =>
        a.order - b.order ||
        (b.updatedAt as any)?.seconds - (a.updatedAt as any)?.seconds ||
        0
    );
  }, [members, searchQuery, statusFilter]);

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
              <h1 className="mt-1 text-3xl font-semibold">Team</h1>
              <p className="mt-1 text-gray-500">Manage team members</p>
            </div>
            <button
              onClick={() => startEdit(undefined)}
              className="inline-flex items-center gap-2 rounded-lg bg-[#43b14b] px-4 py-2 text-sm font-medium text-white hover:bg-[#3a9a41]"
            >
              <Plus className="h-4 w-4" />
              New Member
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative min-w-[200px] flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search team..."
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
              Loading team members...
            </div>
          ) : filteredMembers.length === 0 ? (
            <div className="py-20 text-center text-gray-500">
              No team members found.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="group rounded-lg border border-gray-800 bg-gray-900/50 p-4 transition-colors hover:border-gray-700"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="relative h-16 w-16 overflow-hidden rounded-full bg-gray-800">
                      {member.avatar ? (
                        <Image
                          src={member.avatar}
                          alt={member.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-medium text-gray-400">
                            {member.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    {statusBadge(member.status)}
                  </div>
                  <h3 className="mb-1 text-sm font-semibold text-white">
                    {member.name}
                  </h3>
                  <p className="mb-2 text-xs text-gray-400">{member.role}</p>
                  <p className="mb-3 line-clamp-2 text-xs text-gray-500">
                    {member.bio}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => startEdit(member)}
                      className="flex-1 rounded-md border border-gray-800 px-3 py-1.5 text-xs hover:border-gray-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
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
                      {form.name ? 'Edit Team Member' : 'New Team Member'}
                    </p>
                    <h2 className="mt-1 text-xl font-semibold text-white">
                      Team member details
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
                      <label className="text-sm text-gray-300">Role *</label>
                      <input
                        value={form.role}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, role: e.target.value }))
                        }
                        className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">Avatar *</label>
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
                        <div className="relative h-16 w-16 overflow-hidden rounded-full bg-gray-800">
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
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">Bio</label>
                    <textarea
                      value={form.bio}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, bio: e.target.value }))
                      }
                      className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">Email</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, email: e.target.value }))
                        }
                        className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
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
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">LinkedIn</label>
                      <input
                        type="url"
                        value={form.linkedin}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, linkedin: e.target.value }))
                        }
                        className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">Twitter</label>
                      <input
                        type="url"
                        value={form.twitter}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, twitter: e.target.value }))
                        }
                        className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-300">GitHub</label>
                      <input
                        type="url"
                        value={form.github}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, github: e.target.value }))
                        }
                        className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                      />
                    </div>
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
