'use client';

import { motion } from 'framer-motion';
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
import { JobDetail } from '@/lib/career-data';

interface JobDetailClientProps {
  job: JobDetail;
}

export default function JobDetailClient({ job }: JobDetailClientProps) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
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
    <div className="min-h-screen bg-black">
      {/* Hero Section - Google Standard */}
      <section className="relative border-b border-gray-800 pb-12 pt-20 sm:pb-16 sm:pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl"
          >
            <div className="mb-6 flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-gray-700" />
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-gray-500">
                Career
              </span>
              <div className="h-px w-16 bg-gray-700" />
            </div>
            <h1 className="text-center text-4xl font-normal leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
              {job.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Job Details & Application Form */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
            {/* Left Column - Job Details */}
            <div className="space-y-8 lg:col-span-2">
              {/* Job Information - Compact Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="rounded-lg border border-gray-800 bg-gray-900 p-6"
              >
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <p className="text-sm font-medium text-white">
                        {job.postedDate}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Share This Job */}
                <div className="border-t border-gray-800 pt-4">
                  <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-400">
                    Share This Job
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleShare('whatsapp')}
                      className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-800 bg-gray-800 transition-colors hover:bg-gray-700"
                      aria-label="Share on WhatsApp"
                    >
                      <Share2 className="h-4 w-4 text-gray-400" />
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-800 bg-gray-800 transition-colors hover:bg-gray-700"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="h-4 w-4 text-gray-400" />
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-800 bg-gray-800 transition-colors hover:bg-gray-700"
                      aria-label="Copy link"
                    >
                      <Link2 className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <p className="text-base leading-relaxed text-gray-300">
                  {job.fullDescription}
                </p>
              </motion.div>

              {/* Requirements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <h2 className="mb-4 text-xl font-semibold text-white">
                  Requirements
                </h2>
                <div className="space-y-3">
                  {job.requirements.map((req, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-400" />
                      <span className="text-sm leading-relaxed text-gray-300">
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Key Responsibilities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <h2 className="mb-4 text-xl font-semibold text-white">
                  Key Responsibilities
                </h2>
                <div className="space-y-3">
                  {job.responsibilities.map((resp, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-400" />
                      <span className="text-sm leading-relaxed text-gray-300">
                        {resp.text}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <h2 className="mb-4 text-xl font-semibold text-white">
                  Benefits
                </h2>
                <div className="space-y-3">
                  {job.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-400" />
                      <span className="text-sm leading-relaxed text-gray-300">
                        {benefit.text}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Contact Email */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="border-t border-gray-800 pt-4"
              >
                <p className="text-sm text-gray-400">
                  Interested people can forward their resume to{' '}
                  <a
                    href={`mailto:${job.contactEmail}`}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    {job.contactEmail}
                  </a>
                </p>
              </motion.div>
            </div>

            {/* Right Column - Application Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="h-fit lg:sticky lg:top-24"
            >
              <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
                <h2 className="mb-6 text-lg font-semibold text-white">
                  Apply for this Job
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-400">
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
                      className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-400">
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
                      className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-400">
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
                      className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-400">
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
                      className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-400">
                      Cover Letter
                    </label>
                    <textarea
                      name="coverLetter"
                      placeholder="Message"
                      rows={4}
                      value={formData.coverLetter}
                      onChange={(e) =>
                        handleInputChange('coverLetter', e.target.value)
                      }
                      className="w-full resize-none rounded-md border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-400">
                      Please Attach Your CV Here
                    </label>
                    <input
                      type="file"
                      name="cv"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) =>
                        handleInputChange('cv', e.target.files?.[0] || null)
                      }
                      className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-white file:mr-4 file:rounded-md file:border-0 file:bg-blue-600 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white hover:file:bg-blue-700 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    Apply Now
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-gray-800 py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="mb-4 text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
              Let&apos;s connect and turn your vision into reality.
            </h2>
            <p className="mb-6 text-base text-gray-400 sm:text-lg">
              We are available from 9:00 AM to 6:00 PM, Monday to Friday.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="tel:+9779709098343"
                className="rounded-md bg-blue-600 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-700"
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
          </motion.div>
        </div>
      </section>
    </div>
  );
}
