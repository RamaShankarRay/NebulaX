'use client';

import { useEffect, useMemo, useState } from 'react';
import { AdminGuard } from '@/components/admin/admin-guard';
import {
  fetchJobs,
  saveJob,
  deleteJob,
  type AdminJob,
  type JobCategory,
} from '@/lib/admin/jobs-admin';
import {
  fetchJobApplications,
  updateApplicationStatus,
  deleteJobApplication,
  type JobApplication,
  type JobApplicationStatus,
} from '@/lib/admin/job-applications-admin';
import {
  Plus,
  X,
  Loader2,
  CheckCircle2,
  Search,
  Download,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
} from 'lucide-react';

const JOB_CATEGORIES: Array<{ value: JobCategory; label: string }> = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'management', label: 'Management' },
  { value: 'marketing', label: 'Marketing' },
];

type FormState = Omit<AdminJob, 'id' | 'updatedAt' | 'createdAt'>;

// Helper function to format date from YYYY-MM-DD to YYYY/MM/DD
const formatDateForDisplay = (dateStr: string): string => {
  if (!dateStr) return '';
  // If already in YYYY/MM/DD format, return as is
  if (dateStr.includes('/')) return dateStr;
  // Convert YYYY-MM-DD to YYYY/MM/DD
  return dateStr.replace(/-/g, '/');
};

// Helper function to format date from YYYY/MM/DD to YYYY-MM-DD for input
const formatDateForInput = (dateStr: string): string => {
  if (!dateStr) return new Date().toISOString().split('T')[0] || '';
  // If already in YYYY-MM-DD format, return as is
  if (dateStr.includes('-')) return dateStr;
  // Convert YYYY/MM/DD to YYYY-MM-DD
  return dateStr.replace(/\//g, '-');
};

const emptyForm: FormState = {
  slug: '',
  title: '',
  category: 'development',
  functionalTitle: '',
  corporateTitle: '',
  vacancies: 1,
  postedDate: formatDateForInput(new Date().toISOString().split('T')[0] || ''),
  shortDescription: '',
  fullDescription: '',
  requirements: [],
  responsibilities: [],
  benefits: [],
  contactEmail: '',
  status: 'draft',
};

export default function AdminJobsPage() {
  const [activeTab, setActiveTab] = useState<'jobs' | 'applications'>('jobs');

  // Jobs state
  const [jobs, setJobs] = useState<AdminJob[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState<FormState>(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'draft' | 'published'
  >('all');
  const [categoryFilter, setCategoryFilter] = useState<JobCategory | 'all'>(
    'all'
  );

  // Applications state
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [applicationsLoading, setApplicationsLoading] = useState(false);
  const [selectedApplication, setSelectedApplication] =
    useState<JobApplication | null>(null);
  const [applicationStatusFilter, setApplicationStatusFilter] = useState<
    JobApplicationStatus | 'all'
  >('all');
  const [applicationJobFilter, setApplicationJobFilter] =
    useState<string>('all');
  const [applicationSearchQuery, setApplicationSearchQuery] = useState('');
  const [applicationNotes, setApplicationNotes] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const data = await fetchJobs();
      const sorted = data.sort(
        (a, b) =>
          (b.updatedAt as any)?.seconds - (a.updatedAt as any)?.seconds || 0
      );
      setJobs(sorted);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
    if (activeTab === 'applications') {
      void loadApplications();
    }
  }, [activeTab]);

  const loadApplications = async () => {
    try {
      setApplicationsLoading(true);
      const data = await fetchJobApplications();
      // Sort by createdAt (newest first)
      const sorted = data.sort((a, b) => {
        const aTime =
          a.createdAt &&
          typeof a.createdAt === 'object' &&
          'seconds' in a.createdAt
            ? (a.createdAt as { seconds: number }).seconds
            : 0;
        const bTime =
          b.createdAt &&
          typeof b.createdAt === 'object' &&
          'seconds' in b.createdAt
            ? (b.createdAt as { seconds: number }).seconds
            : 0;
        return bTime - aTime;
      });
      setApplications(sorted);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load applications'
      );
    } finally {
      setApplicationsLoading(false);
    }
  };

  const startEdit = (job?: AdminJob) => {
    if (!job) {
      setForm(emptyForm);
    } else {
      setForm({
        slug: job.slug,
        title: job.title,
        category: job.category,
        functionalTitle: job.functionalTitle,
        corporateTitle: job.corporateTitle,
        vacancies: job.vacancies,
        postedDate: formatDateForInput(
          job.postedDate || new Date().toISOString().split('T')[0] || ''
        ),
        shortDescription: job.shortDescription,
        fullDescription: job.fullDescription,
        requirements: job.requirements || [],
        responsibilities: job.responsibilities || [],
        benefits: job.benefits || [],
        contactEmail: job.contactEmail,
        status: job.status,
      });
    }
    setError('');
    setShowForm(true);
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
      // Convert date back to YYYY/MM/DD format for storage
      const formattedDate = formatDateForDisplay(form.postedDate);

      const jobToSave: AdminJob = {
        ...form,
        slug: form.slug.trim().toLowerCase(),
        title: form.title.trim(),
        functionalTitle: form.functionalTitle.trim(),
        corporateTitle: form.corporateTitle.trim(),
        shortDescription: form.shortDescription.trim(),
        fullDescription: form.fullDescription.trim(),
        contactEmail: form.contactEmail.trim(),
        postedDate: formattedDate,
      };
      await saveJob(jobToSave);
      setShowForm(false);
      setForm(emptyForm);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save job');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm('Delete this job?')) return;
    try {
      await deleteJob(id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete');
    }
  };

  const addArrayItem = (
    field: 'requirements' | 'responsibilities' | 'benefits'
  ) => {
    setForm((f) => ({
      ...f,
      [field]: [...(f[field] || []), { text: '' }],
    }));
  };

  const updateArrayItem = (
    field: 'requirements' | 'responsibilities' | 'benefits',
    index: number,
    text: string
  ) => {
    setForm((f) => {
      const arr = [...(f[field] || [])];
      arr[index] = { text };
      return { ...f, [field]: arr };
    });
  };

  const removeArrayItem = (
    field: 'requirements' | 'responsibilities' | 'benefits',
    index: number
  ) => {
    setForm((f) => {
      const arr = [...(f[field] || [])];
      arr.splice(index, 1);
      return { ...f, [field]: arr };
    });
  };

  const filteredJobs = useMemo(() => {
    let filtered = jobs;
    if (searchQuery) {
      filtered = filtered.filter(
        (j) =>
          j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          j.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
          j.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (statusFilter !== 'all') {
      filtered = filtered.filter((j) => j.status === statusFilter);
    }
    if (categoryFilter !== 'all') {
      filtered = filtered.filter((j) => j.category === categoryFilter);
    }
    return filtered.sort(
      (a, b) =>
        (b.updatedAt as any)?.seconds - (a.updatedAt as any)?.seconds || 0
    );
  }, [jobs, searchQuery, statusFilter, categoryFilter]);

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

  const applicationStatusBadge = (status: JobApplicationStatus) => {
    const config = {
      pending: { color: 'yellow', icon: Clock, label: 'Pending' },
      reviewed: { color: 'blue', icon: Eye, label: 'Reviewed' },
      accepted: { color: 'green', icon: CheckCircle, label: 'Accepted' },
      rejected: { color: 'red', icon: XCircle, label: 'Rejected' },
    };
    const { color, icon: Icon, label } = config[status];
    return (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
          color === 'yellow'
            ? 'border border-yellow-500/30 bg-yellow-500/15 text-yellow-300'
            : color === 'blue'
              ? 'border border-[#43b14b]/30 bg-[#43b14b]/15 text-[#4ade80]'
              : color === 'green'
                ? 'border border-green-500/30 bg-green-500/15 text-green-300'
                : 'border border-red-500/30 bg-red-500/15 text-red-300'
        }`}
      >
        <Icon className="mr-1 h-3.5 w-3.5" />
        {label}
      </span>
    );
  };

  const handleUpdateApplicationStatus = async (
    applicationId: string,
    newStatus: JobApplicationStatus
  ) => {
    try {
      setUpdatingStatus(true);
      await updateApplicationStatus(
        applicationId,
        newStatus,
        applicationNotes || undefined
      );
      await loadApplications();
      setSelectedApplication(null);
      setApplicationNotes('');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to update application status'
      );
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleDeleteApplication = async (id: string) => {
    if (!confirm('Delete this application?')) return;
    try {
      await deleteJobApplication(id);
      await loadApplications();
      if (selectedApplication?.id === id) {
        setSelectedApplication(null);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to delete application'
      );
    }
  };

  const filteredApplications = useMemo(() => {
    let filtered = applications;
    if (applicationSearchQuery) {
      filtered = filtered.filter(
        (app) =>
          app.name
            .toLowerCase()
            .includes(applicationSearchQuery.toLowerCase()) ||
          app.email
            .toLowerCase()
            .includes(applicationSearchQuery.toLowerCase()) ||
          app.jobTitle
            .toLowerCase()
            .includes(applicationSearchQuery.toLowerCase())
      );
    }
    if (applicationStatusFilter !== 'all') {
      filtered = filtered.filter(
        (app) => app.status === applicationStatusFilter
      );
    }
    if (applicationJobFilter !== 'all') {
      filtered = filtered.filter((app) => app.jobId === applicationJobFilter);
    }
    return filtered;
  }, [
    applications,
    applicationSearchQuery,
    applicationStatusFilter,
    applicationJobFilter,
  ]);

  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#1b1b1b] text-white">
        <div className="mx-auto max-w-7xl space-y-4 p-4 sm:space-y-6 sm:p-6 lg:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 sm:text-sm">
                Content
              </p>
              <h1 className="mt-1 text-2xl font-semibold sm:text-3xl">
                Jobs & Applications
              </h1>
              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                Manage job postings and applications
              </p>
            </div>
            {activeTab === 'jobs' && (
              <button
                onClick={() => startEdit(undefined)}
                className="inline-flex items-center gap-2 rounded-lg bg-[#43b14b] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#3a9a41] sm:px-4 sm:py-2 sm:text-sm"
              >
                <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                New Job
              </button>
            )}
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 border-b border-gray-800 sm:gap-2">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-3 py-1.5 text-xs font-medium transition-colors sm:px-4 sm:py-2 sm:text-sm ${
                activeTab === 'jobs'
                  ? 'border-b-2 border-[#43b14b] text-[#43b14b]'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Jobs
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`relative px-3 py-1.5 text-xs font-medium transition-colors sm:px-4 sm:py-2 sm:text-sm ${
                activeTab === 'applications'
                  ? 'border-b-2 border-[#43b14b] text-[#43b14b]'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Applications
              {applications.filter((app) => app.status === 'pending').length >
                0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] sm:-right-1 sm:-top-1 sm:h-5 sm:w-5 sm:text-xs">
                  {
                    applications.filter((app) => app.status === 'pending')
                      .length
                  }
                </span>
              )}
            </button>
          </div>

          {/* Jobs Tab Content */}
          {activeTab === 'jobs' && (
            <div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <div className="relative min-w-[180px] flex-1 sm:min-w-[200px]">
                  <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-500 sm:left-3 sm:h-4 sm:w-4" />
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-gray-800 bg-gray-950 py-1.5 pl-8 pr-3 text-xs text-white placeholder-gray-500 focus:border-[#43b14b] focus:outline-none sm:py-2 sm:pl-10 sm:pr-4 sm:text-sm"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="rounded-lg border border-gray-800 bg-gray-950 px-3 py-1.5 text-xs text-white focus:border-[#43b14b] focus:outline-none sm:px-4 sm:py-2 sm:text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value as any)}
                  className="rounded-lg border border-gray-800 bg-gray-950 px-3 py-1.5 text-xs text-white focus:border-[#43b14b] focus:outline-none sm:px-4 sm:py-2 sm:text-sm"
                >
                  <option value="all">All Categories</option>
                  {JOB_CATEGORIES.map((cat) => (
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
                <div className="py-12 text-center text-sm text-gray-500 sm:py-16">
                  Loading jobs...
                </div>
              ) : filteredJobs.length === 0 ? (
                <div className="py-12 text-center text-sm text-gray-500 sm:py-16">
                  No jobs found.
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredJobs.map((job) => (
                    <div
                      key={job.id}
                      className="rounded-lg border border-gray-800 bg-gray-900/50 p-3 transition-colors hover:border-gray-700 sm:p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="mb-1.5 flex flex-wrap items-center gap-2 sm:mb-2 sm:gap-3">
                            <h3 className="text-base font-semibold text-white sm:text-lg">
                              {job.title}
                            </h3>
                            {statusBadge(job.status)}
                          </div>
                          <div className="mb-1.5 flex flex-wrap items-center gap-2 text-xs text-gray-400 sm:mb-2 sm:gap-3 sm:text-sm">
                            <span>{job.corporateTitle}</span>
                            <span>•</span>
                            <span>
                              {job.vacancies} vacancy
                              {job.vacancies !== 1 ? 'ies' : ''}
                            </span>
                            <span>•</span>
                            <span>
                              Posted: {formatDateForDisplay(job.postedDate)}
                            </span>
                          </div>
                          <p className="line-clamp-2 text-xs text-gray-500 sm:text-sm">
                            {job.shortDescription}
                          </p>
                        </div>
                        <div className="flex flex-shrink-0 items-center gap-1.5 sm:gap-2">
                          <button
                            onClick={() => startEdit(job)}
                            className="rounded-md border border-gray-800 px-2 py-1 text-xs hover:border-gray-700 sm:px-3 sm:py-1.5"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(job.id)}
                            className="rounded-md border border-red-500/30 px-2 py-1 text-xs text-red-300 hover:border-red-500/60 sm:px-3 sm:py-1.5"
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
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#1b1b1b]/70 px-3 py-4 backdrop-blur-sm sm:px-4 sm:py-8">
                  <div className="my-4 w-full max-w-4xl rounded-lg border border-gray-800 bg-gray-900 p-4 shadow-2xl sm:my-8 sm:rounded-xl sm:p-6">
                    <div className="mb-4 flex items-center justify-between sm:mb-6">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-gray-400 sm:text-sm">
                          {form.title ? 'Edit Job' : 'New Job'}
                        </p>
                        <h2 className="mt-1 text-lg font-semibold text-white sm:text-xl">
                          Job details
                        </h2>
                      </div>
                      <button
                        onClick={() => setShowForm(false)}
                        className="rounded-md border border-gray-800 p-1.5 text-gray-400 hover:border-gray-700 hover:text-white sm:p-2"
                      >
                        <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </button>
                    </div>

                    <form
                      onSubmit={handleSubmit}
                      className="max-h-[85vh] space-y-3 overflow-y-auto pr-1 sm:space-y-4 sm:pr-2"
                    >
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                        <div className="space-y-1.5 sm:space-y-2">
                          <label className="text-xs text-gray-300 sm:text-sm">
                            Title *
                          </label>
                          <input
                            value={form.title}
                            onChange={(e) =>
                              setForm((f) => ({ ...f, title: e.target.value }))
                            }
                            className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-1.5 text-xs text-white focus:border-[#43b14b] focus:outline-none sm:py-2 sm:text-sm"
                            required
                          />
                        </div>
                        <div className="space-y-1.5 sm:space-y-2">
                          <label className="text-xs text-gray-300 sm:text-sm">
                            Slug *
                          </label>
                          <input
                            value={form.slug}
                            onChange={(e) =>
                              setForm((f) => ({ ...f, slug: e.target.value }))
                            }
                            className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-1.5 text-xs text-white focus:border-[#43b14b] focus:outline-none sm:py-2 sm:text-sm"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
                        <div className="space-y-1.5 sm:space-y-2">
                          <label className="text-xs text-gray-300 sm:text-sm">
                            Category *
                          </label>
                          <select
                            value={form.category}
                            onChange={(e) =>
                              setForm((f) => ({
                                ...f,
                                category: e.target.value as JobCategory,
                              }))
                            }
                            className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-1.5 text-xs text-white focus:border-[#43b14b] focus:outline-none sm:py-2 sm:text-sm"
                            required
                          >
                            {JOB_CATEGORIES.map((cat) => (
                              <option key={cat.value} value={cat.value}>
                                {cat.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1.5 sm:space-y-2">
                          <label className="text-xs text-gray-300 sm:text-sm">
                            Functional Title
                          </label>
                          <input
                            value={form.functionalTitle}
                            onChange={(e) =>
                              setForm((f) => ({
                                ...f,
                                functionalTitle: e.target.value,
                              }))
                            }
                            className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-1.5 text-xs text-white focus:border-[#43b14b] focus:outline-none sm:py-2 sm:text-sm"
                          />
                        </div>
                        <div className="space-y-1.5 sm:space-y-2">
                          <label className="text-xs text-gray-300 sm:text-sm">
                            Corporate Title
                          </label>
                          <input
                            value={form.corporateTitle}
                            onChange={(e) =>
                              setForm((f) => ({
                                ...f,
                                corporateTitle: e.target.value,
                              }))
                            }
                            className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-1.5 text-xs text-white focus:border-[#43b14b] focus:outline-none sm:py-2 sm:text-sm"
                          />
                        </div>
                        <div className="space-y-1.5 sm:space-y-2">
                          <label className="text-xs text-gray-300 sm:text-sm">
                            Vacancies
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={form.vacancies}
                            onChange={(e) =>
                              setForm((f) => ({
                                ...f,
                                vacancies: parseInt(e.target.value) || 1,
                              }))
                            }
                            className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-1.5 text-xs text-white focus:border-[#43b14b] focus:outline-none sm:py-2 sm:text-sm"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                        <div className="space-y-1.5 sm:space-y-2">
                          <label className="text-xs text-gray-300 sm:text-sm">
                            Posted Date
                          </label>
                          <input
                            type="date"
                            value={form.postedDate}
                            onChange={(e) =>
                              setForm((f) => ({
                                ...f,
                                postedDate: e.target.value,
                              }))
                            }
                            className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-1.5 text-xs text-white focus:border-[#43b14b] focus:outline-none sm:py-2 sm:text-sm"
                          />
                        </div>
                        <div className="space-y-1.5 sm:space-y-2">
                          <label className="text-xs text-gray-300 sm:text-sm">
                            Contact Email *
                          </label>
                          <input
                            type="email"
                            value={form.contactEmail}
                            onChange={(e) =>
                              setForm((f) => ({
                                ...f,
                                contactEmail: e.target.value,
                              }))
                            }
                            className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-1.5 text-xs text-white focus:border-[#43b14b] focus:outline-none sm:py-2 sm:text-sm"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5 sm:space-y-2">
                        <label className="text-xs text-gray-300 sm:text-sm">
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
                          className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-xs text-white focus:border-[#43b14b] focus:outline-none sm:text-sm"
                          rows={2}
                        />
                      </div>
                      <div className="space-y-1.5 sm:space-y-2">
                        <label className="text-xs text-gray-300 sm:text-sm">
                          Full Description
                        </label>
                        <textarea
                          value={form.fullDescription}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              fullDescription: e.target.value,
                            }))
                          }
                          className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-xs text-white focus:border-[#43b14b] focus:outline-none sm:text-sm"
                          rows={4}
                        />
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-sm text-gray-300">
                            Requirements
                          </label>
                          <button
                            type="button"
                            onClick={() => addArrayItem('requirements')}
                            className="text-xs text-[#43b14b] hover:text-[#4ade80]"
                          >
                            + Add
                          </button>
                        </div>
                        <div className="space-y-2">
                          {form.requirements.map((req, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <input
                                value={req.text}
                                onChange={(e) =>
                                  updateArrayItem(
                                    'requirements',
                                    idx,
                                    e.target.value
                                  )
                                }
                                className="flex-1 rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                                placeholder="Requirement text"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  removeArrayItem('requirements', idx)
                                }
                                className="text-red-400 hover:text-red-300"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-sm text-gray-300">
                            Responsibilities
                          </label>
                          <button
                            type="button"
                            onClick={() => addArrayItem('responsibilities')}
                            className="text-xs text-[#43b14b] hover:text-[#4ade80]"
                          >
                            + Add
                          </button>
                        </div>
                        <div className="space-y-2">
                          {form.responsibilities.map((resp, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <input
                                value={resp.text}
                                onChange={(e) =>
                                  updateArrayItem(
                                    'responsibilities',
                                    idx,
                                    e.target.value
                                  )
                                }
                                className="flex-1 rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                                placeholder="Responsibility text"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  removeArrayItem('responsibilities', idx)
                                }
                                className="text-red-400 hover:text-red-300"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-sm text-gray-300">
                            Benefits
                          </label>
                          <button
                            type="button"
                            onClick={() => addArrayItem('benefits')}
                            className="text-xs text-[#43b14b] hover:text-[#4ade80]"
                          >
                            + Add
                          </button>
                        </div>
                        <div className="space-y-2">
                          {form.benefits.map((ben, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <input
                                value={ben.text}
                                onChange={(e) =>
                                  updateArrayItem(
                                    'benefits',
                                    idx,
                                    e.target.value
                                  )
                                }
                                className="flex-1 rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                                placeholder="Benefit text"
                              />
                              <button
                                type="button"
                                onClick={() => removeArrayItem('benefits', idx)}
                                className="text-red-400 hover:text-red-300"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
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
          )}

          {/* Applications Tab Content */}
          {activeTab === 'applications' && (
            <>
              <div className="flex flex-wrap items-center gap-4">
                <div className="relative min-w-[200px] flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search applications..."
                    value={applicationSearchQuery}
                    onChange={(e) => setApplicationSearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-gray-800 bg-gray-950 py-2 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:border-[#43b14b] focus:outline-none"
                  />
                </div>
                <select
                  value={applicationStatusFilter}
                  onChange={(e) =>
                    setApplicationStatusFilter(
                      e.target.value as JobApplicationStatus | 'all'
                    )
                  }
                  className="rounded-lg border border-gray-800 bg-gray-950 px-4 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
                <select
                  value={applicationJobFilter}
                  onChange={(e) => setApplicationJobFilter(e.target.value)}
                  className="rounded-lg border border-gray-800 bg-gray-950 px-4 py-2 text-sm text-white focus:border-[#43b14b] focus:outline-none"
                >
                  <option value="all">All Jobs</option>
                  {jobs.map((job) => (
                    <option key={job.id} value={job.id}>
                      {job.title}
                    </option>
                  ))}
                </select>
              </div>

              {error && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              )}

              {applicationsLoading ? (
                <div className="py-20 text-center text-gray-500">
                  Loading applications...
                </div>
              ) : filteredApplications.length === 0 ? (
                <div className="py-20 text-center text-gray-500">
                  No applications found.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  {/* Applications List */}
                  <div className="space-y-4 lg:col-span-2">
                    {filteredApplications.map((application) => (
                      <div
                        key={application.id}
                        className={`cursor-pointer rounded-lg border p-4 transition-colors ${
                          selectedApplication?.id === application.id
                            ? 'border-[#43b14b] bg-[#43b14b]/10'
                            : 'border-gray-800 bg-gray-900/50 hover:border-gray-700'
                        }`}
                        onClick={() => {
                          setSelectedApplication(application);
                          setApplicationNotes(application.notes || '');
                        }}
                      >
                        <div className="mb-3 flex items-start justify-between">
                          <div className="flex-1">
                            <div className="mb-2 flex items-center gap-3">
                              <h3 className="text-lg font-semibold text-white">
                                {application.name}
                              </h3>
                              {applicationStatusBadge(application.status)}
                            </div>
                            <div className="space-y-1 text-sm text-gray-400">
                              <p className="flex items-center gap-2">
                                <span className="font-medium text-gray-300">
                                  Job:
                                </span>
                                {application.jobTitle}
                              </p>
                              <p className="flex items-center gap-2">
                                <span className="font-medium text-gray-300">
                                  Email:
                                </span>
                                {application.email}
                              </p>
                              <p className="flex items-center gap-2">
                                <span className="font-medium text-gray-300">
                                  Phone:
                                </span>
                                {application.phone}
                              </p>
                              {application.createdAt &&
                              typeof application.createdAt === 'object' &&
                              'seconds' in application.createdAt ? (
                                <p className="text-xs text-gray-500">
                                  Applied:{' '}
                                  {new Date(
                                    (
                                      application.createdAt as {
                                        seconds: number;
                                      }
                                    ).seconds * 1000
                                  ).toLocaleDateString()}
                                </p>
                              ) : null}
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteApplication(application.id!);
                            }}
                            className="text-red-400 hover:text-red-300"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Application Detail Panel */}
                  <div className="lg:col-span-1">
                    {selectedApplication ? (
                      <div className="sticky top-24 space-y-4 rounded-lg border border-gray-800 bg-gray-900 p-6">
                        <div className="mb-4 flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-white">
                            Application Details
                          </h3>
                          <button
                            onClick={() => {
                              setSelectedApplication(null);
                              setApplicationNotes('');
                            }}
                            className="text-gray-400 hover:text-white"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <p className="mb-1 text-xs text-gray-500">Name</p>
                            <p className="text-sm text-white">
                              {selectedApplication.name}
                            </p>
                          </div>
                          <div>
                            <p className="mb-1 text-xs text-gray-500">Email</p>
                            <p className="text-sm text-white">
                              {selectedApplication.email}
                            </p>
                          </div>
                          <div>
                            <p className="mb-1 text-xs text-gray-500">Phone</p>
                            <p className="text-sm text-white">
                              {selectedApplication.phone}
                            </p>
                          </div>
                          {selectedApplication.address && (
                            <div>
                              <p className="mb-1 text-xs text-gray-500">
                                Address
                              </p>
                              <p className="text-sm text-white">
                                {selectedApplication.address}
                              </p>
                            </div>
                          )}
                          <div>
                            <p className="mb-1 text-xs text-gray-500">
                              Job Applied For
                            </p>
                            <p className="text-sm text-white">
                              {selectedApplication.jobTitle}
                            </p>
                          </div>
                          {selectedApplication.coverLetter && (
                            <div>
                              <p className="mb-1 text-xs text-gray-500">
                                Cover Letter
                              </p>
                              <p className="whitespace-pre-wrap text-sm text-white">
                                {selectedApplication.coverLetter}
                              </p>
                            </div>
                          )}
                          {selectedApplication.cvUrl && (
                            <div>
                              <p className="mb-1 text-xs text-gray-500">CV</p>
                              <a
                                href={selectedApplication.cvUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm text-[#43b14b] hover:text-[#4ade80]"
                              >
                                <Download className="h-4 w-4" />
                                Download CV
                              </a>
                            </div>
                          )}
                          <div>
                            <p className="mb-2 text-xs text-gray-500">Status</p>
                            <div className="mb-4 flex items-center gap-2">
                              {applicationStatusBadge(
                                selectedApplication.status
                              )}
                            </div>
                            <div className="space-y-2">
                              <button
                                onClick={() =>
                                  handleUpdateApplicationStatus(
                                    selectedApplication.id!,
                                    'pending'
                                  )
                                }
                                disabled={
                                  updatingStatus ||
                                  selectedApplication.status === 'pending'
                                }
                                className="w-full rounded-md border border-gray-800 px-3 py-2 text-xs text-gray-300 hover:border-gray-700 disabled:opacity-50"
                              >
                                Mark as Pending
                              </button>
                              <button
                                onClick={() =>
                                  handleUpdateApplicationStatus(
                                    selectedApplication.id!,
                                    'reviewed'
                                  )
                                }
                                disabled={
                                  updatingStatus ||
                                  selectedApplication.status === 'reviewed'
                                }
                                className="w-full rounded-md border border-gray-800 px-3 py-2 text-xs text-gray-300 hover:border-gray-700 disabled:opacity-50"
                              >
                                Mark as Reviewed
                              </button>
                              <button
                                onClick={() =>
                                  handleUpdateApplicationStatus(
                                    selectedApplication.id!,
                                    'accepted'
                                  )
                                }
                                disabled={
                                  updatingStatus ||
                                  selectedApplication.status === 'accepted'
                                }
                                className="w-full rounded-md border border-green-500/30 px-3 py-2 text-xs text-green-300 hover:border-green-500/60 disabled:opacity-50"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() =>
                                  handleUpdateApplicationStatus(
                                    selectedApplication.id!,
                                    'rejected'
                                  )
                                }
                                disabled={
                                  updatingStatus ||
                                  selectedApplication.status === 'rejected'
                                }
                                className="w-full rounded-md border border-red-500/30 px-3 py-2 text-xs text-red-300 hover:border-red-500/60 disabled:opacity-50"
                              >
                                Reject
                              </button>
                            </div>
                          </div>
                          <div>
                            <p className="mb-2 text-xs text-gray-500">Notes</p>
                            <textarea
                              value={applicationNotes}
                              onChange={(e) =>
                                setApplicationNotes(e.target.value)
                              }
                              placeholder="Add notes about this application..."
                              className="w-full rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-[#43b14b] focus:outline-none"
                              rows={4}
                            />
                            <button
                              onClick={async () => {
                                try {
                                  setUpdatingStatus(true);
                                  await updateApplicationStatus(
                                    selectedApplication.id!,
                                    selectedApplication.status,
                                    applicationNotes || undefined
                                  );
                                  await loadApplications();
                                } catch (err) {
                                  setError(
                                    err instanceof Error
                                      ? err.message
                                      : 'Failed to save notes'
                                  );
                                } finally {
                                  setUpdatingStatus(false);
                                }
                              }}
                              disabled={updatingStatus}
                              className="mt-2 w-full rounded-md bg-[#43b14b] px-3 py-2 text-xs font-medium text-white hover:bg-[#3a9a41] disabled:opacity-70"
                            >
                              {updatingStatus ? (
                                <Loader2 className="mx-auto h-3 w-3 animate-spin" />
                              ) : (
                                'Save Notes'
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-8 text-center">
                        <MessageSquare className="mx-auto mb-4 h-12 w-12 text-gray-600" />
                        <p className="text-sm text-gray-500">
                          Select an application to view details
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </AdminGuard>
  );
}
