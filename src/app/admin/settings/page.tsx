'use client';

import { useEffect, useState } from 'react';
import { AdminGuard } from '@/components/admin/admin-guard';
import {
  fetchSettings,
  saveSettings,
  type AdminSettings,
} from '@/lib/admin/settings-admin';
import { StorageService } from '@/lib/services/storage.service';
import { Loader2, Upload, Save } from 'lucide-react';
import Image from 'next/image';
import { v4 as uuid } from 'uuid';

const emptySettings: AdminSettings = {
  companyName: '',
  companyEmail: '',
  companyPhone: '',
  companyAddress: '',
  companyLogo: '',
  companyFavicon: '',
  socialMedia: {},
  seo: {},
  contact: {},
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<AdminSettings>(emptySettings);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState({
    logo: false,
    favicon: false,
    ogImage: false,
  });
  const [error, setError] = useState('');

  const load = async () => {
    try {
      setLoading(true);
      const data = await fetchSettings();
      if (data) {
        setSettings(data);
      } else {
        setSettings(emptySettings);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const handleFileUpload = async (
    file: File,
    type: 'logo' | 'favicon' | 'ogImage'
  ) => {
    setUploading((prev) => ({ ...prev, [type]: true }));
    try {
      const ext =
        file.name.split('.').pop() || (type === 'favicon' ? 'ico' : 'png');
      const path = `settings/${type}-${uuid()}.${ext}`;
      const url = await StorageService.uploadFileWithProgress(
        path,
        file,
        () => {}
      );
      if (type === 'logo') {
        setSettings((s) => ({ ...s, companyLogo: url }));
      } else if (type === 'favicon') {
        setSettings((s) => ({ ...s, companyFavicon: url }));
      } else {
        setSettings((s) => ({ ...s, seo: { ...s.seo, ogImage: url } }));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading((prev) => ({ ...prev, [type]: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await saveSettings(settings);
      alert('Settings saved successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminGuard>
        <div className="flex min-h-screen items-center justify-center bg-[#1b1b1b] text-white">
          <div className="text-gray-500">Loading settings...</div>
        </div>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#1b1b1b] px-8 py-10 text-white">
        <div className="mx-auto max-w-4xl space-y-8">
          <div>
            <p className="text-sm uppercase tracking-wider text-gray-400">
              Configuration
            </p>
            <h1 className="mt-1 text-3xl font-semibold">Settings</h1>
            <p className="mt-1 text-gray-500">Manage global site settings</p>
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <section className="space-y-4">
              <h2 className="border-b border-gray-800 pb-2 text-lg font-semibold text-white">
                Company Information
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">
                    Company Name *
                  </label>
                  <input
                    value={settings.companyName}
                    onChange={(e) =>
                      setSettings((s) => ({
                        ...s,
                        companyName: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">
                    Company Email *
                  </label>
                  <input
                    type="email"
                    value={settings.companyEmail}
                    onChange={(e) =>
                      setSettings((s) => ({
                        ...s,
                        companyEmail: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">
                    Company Phone *
                  </label>
                  <input
                    type="tel"
                    value={settings.companyPhone}
                    onChange={(e) =>
                      setSettings((s) => ({
                        ...s,
                        companyPhone: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">
                    Company Address *
                  </label>
                  <input
                    value={settings.companyAddress}
                    onChange={(e) =>
                      setSettings((s) => ({
                        ...s,
                        companyAddress: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Company Logo</label>
                  <div className="flex items-center gap-3">
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-800 px-3 py-2 text-sm text-white hover:border-gray-700">
                      <Upload className="h-4 w-4" />
                      <span>
                        {uploading.logo ? 'Uploading...' : 'Upload Logo'}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) void handleFileUpload(file, 'logo');
                        }}
                        disabled={uploading.logo}
                      />
                    </label>
                    {settings.companyLogo && (
                      <div className="relative h-12 w-32 overflow-hidden rounded-md bg-gray-800">
                        <Image
                          src={settings.companyLogo}
                          alt="Logo"
                          fill
                          className="object-contain p-2"
                          unoptimized
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Favicon</label>
                  <div className="flex items-center gap-3">
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-800 px-3 py-2 text-sm text-white hover:border-gray-700">
                      <Upload className="h-4 w-4" />
                      <span>
                        {uploading.favicon ? 'Uploading...' : 'Upload Favicon'}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) void handleFileUpload(file, 'favicon');
                        }}
                        disabled={uploading.favicon}
                      />
                    </label>
                    {settings.companyFavicon && (
                      <div className="relative h-12 w-12 overflow-hidden rounded-md bg-gray-800">
                        <Image
                          src={settings.companyFavicon}
                          alt="Favicon"
                          fill
                          className="object-contain p-2"
                          unoptimized
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="border-b border-gray-800 pb-2 text-lg font-semibold text-white">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Sales Email</label>
                  <input
                    type="email"
                    value={settings.contact?.salesEmail || ''}
                    onChange={(e) =>
                      setSettings((s) => ({
                        ...s,
                        contact: { ...s.contact, salesEmail: e.target.value },
                      }))
                    }
                    className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Sales Phone</label>
                  <input
                    type="tel"
                    value={settings.contact?.salesPhone || ''}
                    onChange={(e) =>
                      setSettings((s) => ({
                        ...s,
                        contact: { ...s.contact, salesPhone: e.target.value },
                      }))
                    }
                    className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Career Email</label>
                  <input
                    type="email"
                    value={settings.contact?.careerEmail || ''}
                    onChange={(e) =>
                      setSettings((s) => ({
                        ...s,
                        contact: { ...s.contact, careerEmail: e.target.value },
                      }))
                    }
                    className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Career Phone</label>
                  <input
                    type="tel"
                    value={settings.contact?.careerPhone || ''}
                    onChange={(e) =>
                      setSettings((s) => ({
                        ...s,
                        contact: { ...s.contact, careerPhone: e.target.value },
                      }))
                    }
                    className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Support Email</label>
                  <input
                    type="email"
                    value={settings.contact?.supportEmail || ''}
                    onChange={(e) =>
                      setSettings((s) => ({
                        ...s,
                        contact: { ...s.contact, supportEmail: e.target.value },
                      }))
                    }
                    className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Support Phone</label>
                  <input
                    type="tel"
                    value={settings.contact?.supportPhone || ''}
                    onChange={(e) =>
                      setSettings((s) => ({
                        ...s,
                        contact: { ...s.contact, supportPhone: e.target.value },
                      }))
                    }
                    className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                  />
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="border-b border-gray-800 pb-2 text-lg font-semibold text-white">
                Social Media
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  'facebook',
                  'twitter',
                  'linkedin',
                  'instagram',
                  'youtube',
                ].map((platform) => (
                  <div key={platform} className="space-y-2">
                    <label className="text-sm capitalize text-gray-300">
                      {platform}
                    </label>
                    <input
                      type="url"
                      value={
                        settings.socialMedia?.[
                          platform as keyof typeof settings.socialMedia
                        ] || ''
                      }
                      onChange={(e) =>
                        setSettings((s) => ({
                          ...s,
                          socialMedia: {
                            ...s.socialMedia,
                            [platform]: e.target.value,
                          },
                        }))
                      }
                      className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                      placeholder={`https://${platform}.com/...`}
                    />
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="border-b border-gray-800 pb-2 text-lg font-semibold text-white">
                SEO
              </h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Meta Title</label>
                  <input
                    value={settings.seo?.metaTitle || ''}
                    onChange={(e) =>
                      setSettings((s) => ({
                        ...s,
                        seo: { ...s.seo, metaTitle: e.target.value },
                      }))
                    }
                    className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">
                    Meta Description
                  </label>
                  <textarea
                    value={settings.seo?.metaDescription || ''}
                    onChange={(e) =>
                      setSettings((s) => ({
                        ...s,
                        seo: { ...s.seo, metaDescription: e.target.value },
                      }))
                    }
                    className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Meta Keywords</label>
                  <input
                    value={settings.seo?.metaKeywords || ''}
                    onChange={(e) =>
                      setSettings((s) => ({
                        ...s,
                        seo: { ...s.seo, metaKeywords: e.target.value },
                      }))
                    }
                    className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">OG Image</label>
                  <div className="flex items-center gap-3">
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-800 px-3 py-2 text-sm text-white hover:border-gray-700">
                      <Upload className="h-4 w-4" />
                      <span>
                        {uploading.ogImage ? 'Uploading...' : 'Upload OG Image'}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) void handleFileUpload(file, 'ogImage');
                        }}
                        disabled={uploading.ogImage}
                      />
                    </label>
                    {settings.seo?.ogImage && (
                      <div className="relative h-12 w-20 overflow-hidden rounded-md bg-gray-800">
                        <Image
                          src={settings.seo.ogImage}
                          alt="OG Image"
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <div className="flex items-center justify-end gap-3 border-t border-gray-800 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-lg bg-[#43b14b] px-6 py-3 text-sm font-medium text-white hover:bg-[#3a9a41] disabled:opacity-70"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {saving ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminGuard>
  );
}
