'use client';

import { useState } from 'react';
import {
  Calendar,
  ArrowRight,
  Share2,
  Linkedin,
  Link2,
  Check,
} from 'lucide-react';
import { useQuickEnquiry } from '@/contexts/quick-enquiry-context';
import type { AdminJob } from '@/lib/admin/jobs-admin';
import { StorageService } from '@/lib/services/storage.service';
import { FirestoreService } from '@/lib/services/firestore.service';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { StructuredData } from '@/components/seo/structured-data';
import { usePathname } from 'next/navigation';

interface JobDetailClientProps {
  job: AdminJob;
}

export default function JobDetailClient({ job }: JobDetailClientProps) {
  const pathname = usePathname();
  const publishedTime = job.postedDate 
    ? new Date(job.postedDate).toISOString()
    : undefined;
  const { openModal } = useQuickEnquiry();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    coverLetter: '',
    cv: null as File | null,
  });

  const handleInputChange = (name: string, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      let cvUrl = '';
      let cvStoragePath = '';

      // Upload CV if provided
      if (formData.cv) {
        const fileName = `cv_${Date.now()}_${formData.cv.name}`;
        cvStoragePath = `job-applications/${job.id || 'unknown'}/${fileName}`;
        cvUrl = await StorageService.uploadFile(cvStoragePath, formData.cv);
      }

      // Save application to Firestore
      const application = {
        jobId: job.id || '',
        jobTitle: job.title,
        jobSlug: job.slug,
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        address: formData.address.trim() || '',
        coverLetter: formData.coverLetter.trim() || '',
        cvUrl: cvUrl || '',
        cvStoragePath: cvStoragePath || '',
        status: 'pending' as const,
      };

      await FirestoreService.createDocument('job-applications', application);

      setSubmitSuccess(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        coverLetter: '',
        cv: null,
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit application');
    } finally {
      setSubmitting(false);
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        '_blank'
      );
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(url);
    }
  };

  return (
    <>
      <StructuredData
        config={{
          title: `${job.title} - Career at NebulaX`,
          description: job.shortDescription || `Join our team as ${job.title}.`,
          url: pathname,
          type: 'job',
          section: job.category,
          publishedTime,
        }}
      />
      <div className="min-h-screen bg-[#1b1b1b]">
      {/* Hero Section - Compact */}
      <section className="relative pb-8 pt-12 sm:pb-10 sm:pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-gray-700" />
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-gray-500">
                Career
              </span>
              <div className="h-px w-12 bg-gray-700" />
            </div>
            <h1 className="text-center text-3xl font-normal leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl">
              {job.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Job Details & Application Form */}
      <section className="py-8 sm:py-10 lg:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
            {/* Left Column - Job Details */}
            <div className="space-y-6 lg:col-span-2">
              {/* Job Information - Compact Card */}
              <div className="rounded-lg border border-gray-800/50 bg-gray-900/30 p-4 sm:p-5">
                <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                  <div>
                    <p className="mb-1 text-xs text-gray-500">
                      Functional Title
                    </p>
                    <p className="text-sm font-medium text-white">
                      {job.functionalTitle}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-gray-500">
                      Corporate Title
                    </p>
                    <p className="text-sm font-medium text-white">
                      {job.corporateTitle}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-gray-500">
                      No. of Vacancies
                    </p>
                    <p className="text-sm font-medium text-white">
                      {job.vacancies}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-gray-500">Posted date</p>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-[#43b14b]" />
                      <p className="text-sm font-medium text-white">
                        {job.postedDate ? (job.postedDate.includes('/') ? job.postedDate : job.postedDate.replace(/-/g, '/')) : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Share This Job */}
                <div className="relative pt-3 sm:pt-4">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-400">
                    Share This Job
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleShare('whatsapp')}
                      className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-800/50 bg-gray-900/30"
                      aria-label="Share on WhatsApp"
                    >
                      <Share2 className="h-4 w-4 text-gray-400" />
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-800/50 bg-gray-900/30"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="h-4 w-4 text-gray-400" />
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-800/50 bg-gray-900/30"
                      aria-label="Copy link"
                    >
                      <Link2 className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-sm leading-relaxed text-gray-300 sm:text-base">
                  {job.fullDescription}
                </p>
              </div>

              {/* Requirements */}
              <div>
                <h2 className="mb-3 text-lg font-semibold text-white sm:text-xl">
                  Requirements
                </h2>
                <div className="space-y-2.5">
                  {job.requirements.map((req, index) => (
                    <div key={index} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#43b14b]" />
                      <span className="text-sm leading-relaxed text-gray-300">
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Responsibilities */}
              <div>
                <h2 className="mb-3 text-lg font-semibold text-white sm:text-xl">
                  Key Responsibilities
                </h2>
                <div className="space-y-2.5">
                  {job.responsibilities.map((resp, index) => (
                    <div key={index} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#43b14b]" />
                      <span className="text-sm leading-relaxed text-gray-300">
                        {resp.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h2 className="mb-3 text-lg font-semibold text-white sm:text-xl">
                  Benefits
                </h2>
                <div className="space-y-2.5">
                  {job.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#43b14b]" />
                      <span className="text-sm leading-relaxed text-gray-300">
                        {benefit.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Email */}
              <div className="pt-4">
                <p className="text-sm text-gray-400">
                  Interested people can forward their resume to{' '}
                  <a
                    href={`mailto:${job.contactEmail}`}
                    className="text-[#43b14b] hover:text-[#4ade80]"
                  >
                    {job.contactEmail}
                  </a>
                </p>
              </div>
            </div>

            {/* Right Column - Application Form */}
            <div className="h-fit lg:sticky lg:top-20">
              <div className="rounded-lg border border-gray-800/50 bg-gray-900/30 p-4 sm:p-5">
                <h2 className="mb-4 text-base font-semibold text-white sm:text-lg">
                  Apply for this Job
                </h2>
                {submitSuccess && (
                  <div className="mb-3 rounded-lg border border-[#43b14b]/30 bg-[#43b14b]/10 px-3 py-2 text-xs text-[#43b14b] flex items-center gap-2 sm:text-sm">
                    <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Application submitted successfully!
                  </div>
                )}
                {submitError && (
                  <div className="mb-3 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300 sm:text-sm">
                    {submitError}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-gray-400">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange('name', e.target.value)
                      }
                      className="w-full rounded-md border border-gray-800/50 bg-gray-900/30 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-[#43b14b] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-gray-400">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange('email', e.target.value)
                      }
                      className="w-full rounded-md border border-gray-800/50 bg-gray-900/30 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-[#43b14b] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-gray-400">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange('phone', e.target.value)
                      }
                      className="w-full rounded-md border border-gray-800/50 bg-gray-900/30 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-[#43b14b] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-gray-400">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      placeholder="Your Address"
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange('address', e.target.value)
                      }
                      className="w-full rounded-md border border-gray-800/50 bg-gray-900/30 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-[#43b14b] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-gray-400">
                      Cover Letter
                    </label>
                    <textarea
                      name="coverLetter"
                      placeholder="Message"
                      rows={3}
                      value={formData.coverLetter}
                      onChange={(e) =>
                        handleInputChange('coverLetter', e.target.value)
                      }
                      className="w-full resize-none rounded-md border border-gray-800/50 bg-gray-900/30 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-[#43b14b] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-gray-400">
                      Please Attach Your CV Here
                    </label>
                    <input
                      type="file"
                      name="cv"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) =>
                        handleInputChange('cv', e.target.files?.[0] || null)
                      }
                      className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white file:mr-3 file:rounded-md file:border-0 file:bg-[#43b14b] file:px-2.5 file:py-1 file:text-xs file:font-medium file:text-white hover:file:bg-[#3a9a41] focus:border-[#43b14b] focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-md bg-[#43b14b] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#3a9a41] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Apply Now'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-3 text-xl font-semibold text-white sm:text-2xl lg:text-3xl">
              Let&apos;s connect and turn your vision into reality.
            </h2>
            <p className="mb-5 text-sm text-gray-400 sm:text-base">
              We are available from 9:00 AM to 6:00 PM, Monday to Friday.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="tel:+9779709098343"
                className="rounded-md bg-[#43b14b] px-8 py-3 font-medium text-white transition-colors hover:bg-[#3a9a41]"
              >
                Reach out now! +977 9709098343
              </a>
              <button
                onClick={openModal}
                className="inline-flex items-center gap-2 rounded-md border border-gray-700 px-8 py-3 font-medium text-white transition-colors hover:border-gray-600"
              >
                Let&apos;s start conversation
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
