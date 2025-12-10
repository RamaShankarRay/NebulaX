'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, Phone, Mail, MapPin, Building2 } from 'lucide-react';
import { useQuickEnquiry } from '@/contexts/quick-enquiry-context';

export default function ContactPage() {
  const { openModal } = useQuickEnquiry();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-[#1b1b1b]">
      {/* Hero Section - Minimal */}
      <section className="relative pb-8 pt-20 sm:pb-10 sm:pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl"
          >
            <div className="mb-4 flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-gray-700" />
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-gray-500">
                Contact Us
              </span>
              <div className="h-px w-12 bg-gray-700" />
            </div>
            <h1 className="mb-3 text-center text-3xl font-normal leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
              Get In Touch
            </h1>
            <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-gray-400 sm:text-base">
              We are Here For You. Can we Help?
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content - Two Column Layout */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            {/* Left Column - Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-6">
                <h2 className="mb-2 text-xl font-semibold text-white">
                  Send us a message
                </h2>
                <p className="text-sm text-gray-400">
                  Fill out the form below and we&apos;ll get back to you as soon
                  as possible.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-medium text-gray-400">
                      Full Name <span className="text-[#43b14b]">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange('fullName', e.target.value)
                      }
                      className="w-full rounded-md border border-gray-800/50 bg-gray-900/30 px-4 py-2.5 text-sm text-white placeholder-gray-500 transition-colors focus:border-[#43b14b] focus:outline-none"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-medium text-gray-400">
                      Email <span className="text-[#43b14b]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange('email', e.target.value)
                      }
                      className="w-full rounded-md border border-gray-800/50 bg-gray-900/30 px-4 py-2.5 text-sm text-white placeholder-gray-500 transition-colors focus:border-[#43b14b] focus:outline-none"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-medium text-gray-400">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        handleInputChange('phoneNumber', e.target.value)
                      }
                      className="w-full rounded-md border border-gray-800/50 bg-gray-900/30 px-4 py-2.5 text-sm text-white placeholder-gray-500 transition-colors focus:border-[#43b14b] focus:outline-none"
                      placeholder="+977 98XXXXXXXX"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-medium text-gray-400">
                      Subject <span className="text-[#43b14b]">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={(e) =>
                        handleInputChange('subject', e.target.value)
                      }
                      className="w-full rounded-md border border-gray-800/50 bg-gray-900/30 px-4 py-2.5 text-sm text-white placeholder-gray-500 transition-colors focus:border-[#43b14b] focus:outline-none"
                      placeholder="What is this regarding?"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium text-gray-400">
                    Message <span className="text-[#43b14b]">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange('message', e.target.value)
                    }
                    className="w-full resize-none rounded-md border border-gray-800/50 bg-gray-900/30 px-4 py-2.5 text-sm text-white placeholder-gray-500 transition-colors focus:border-[#43b14b] focus:outline-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-md bg-[#43b14b] px-8 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#3a9a41] sm:w-auto"
                >
                  Submit
                </button>
              </form>
            </motion.div>

            {/* Right Column - Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="space-y-8"
            >
              {/* General Contact Info */}
              <div>
                <h3 className="mb-5 text-lg font-semibold text-white">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md border border-gray-800/50 bg-gray-900/30">
                      <Phone className="h-5 w-5 text-[#43b14b]" />
                    </div>
                    <div>
                      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">
                        Phone Number
                      </p>
                      <a
                        href="tel:+9779709098343"
                        className="text-sm text-white transition-colors hover:text-[#43b14b]"
                      >
                        +977 9709098343
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md border border-gray-800/50 bg-gray-900/30">
                      <Mail className="h-5 w-5 text-[#43b14b]" />
                    </div>
                    <div>
                      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">
                        Email
                      </p>
                      <a
                        href="mailto:info@nebulax.com"
                        className="text-sm text-white transition-colors hover:text-[#43b14b]"
                      >
                        info@nebulax.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md border border-gray-800/50 bg-gray-900/30">
                      <Building2 className="h-5 w-5 text-[#43b14b]" />
                    </div>
                    <div>
                      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">
                        PO Box Number
                      </p>
                      <p className="text-sm text-white">GPO - 5051</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md border border-gray-800/50 bg-gray-900/30">
                      <MapPin className="h-5 w-5 text-[#43b14b]" />
                    </div>
                    <div>
                      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">
                        Office Address
                      </p>
                      <p className="text-sm text-white">Rajbiraj, Nepal</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Department Contacts */}
              <div className="pt-6">
                <h3 className="mb-5 text-lg font-semibold text-white">
                  Department Contacts
                </h3>
                <div className="space-y-6">
                  <div>
                    <p className="mb-3 text-sm font-medium text-white">
                      For Sales
                    </p>
                    <div className="space-y-2">
                      <a
                        href="tel:+9779709098343"
                        className="block text-sm text-[#43b14b] transition-colors hover:text-[#4ade80]"
                      >
                        +977 9709098343
                      </a>
                      <a
                        href="mailto:sales@nebulax.com"
                        className="block text-sm text-[#43b14b] transition-colors hover:text-[#4ade80]"
                      >
                        sales@nebulax.com
                      </a>
                    </div>
                  </div>
                  <div className="pt-4">
                    <p className="mb-3 text-sm font-medium text-white">
                      For Career
                    </p>
                    <div className="space-y-2">
                      <a
                        href="tel:+9779709098343"
                        className="block text-sm text-[#43b14b] transition-colors hover:text-[#4ade80]"
                      >
                        +977 9709098343
                      </a>
                      <a
                        href="mailto:career@nebulax.com"
                        className="block text-sm text-[#43b14b] transition-colors hover:text-[#4ade80]"
                      >
                        career@nebulax.com
                      </a>
                    </div>
                  </div>
                  <div className="pt-4">
                    <p className="mb-3 text-sm font-medium text-white">
                      For Support
                    </p>
                    <div className="space-y-2">
                      <a
                        href="tel:+9779709098343"
                        className="block text-sm text-[#43b14b] transition-colors hover:text-[#4ade80]"
                      >
                        +977 9709098343
                      </a>
                      <a
                        href="mailto:info@nebulax.com"
                        className="block text-sm text-[#43b14b] transition-colors hover:text-[#4ade80]"
                      >
                        info@nebulax.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-7xl"
          >
            <div className="mb-6">
              <h2 className="mb-2 text-xl font-semibold text-white">Find Us</h2>
              <p className="text-sm text-gray-400">
                Visit our office in Rajbiraj
              </p>
            </div>
            <div className="overflow-hidden rounded-lg border border-gray-800/50 bg-gray-900/30">
              <div className="h-[400px] w-full sm:h-[500px] lg:h-[600px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.1234567890123!2d86.748611!3d26.539167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef4a3b3b3b3b3b%3A0x3b3b3b3b3b3b3b3b!2sRajbiraj%2C%20Nepal!5e0!3m2!1sen!2snp!4v1234567890123!5m2!1sen!2snp"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full"
                />
              </div>
            </div>
            <div className="mt-4">
              <a
                href="https://www.google.com/maps/place/Rajbiraj,+Nepal"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#43b14b] transition-colors hover:text-[#4ade80]"
              >
                View larger map
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24">
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
          </motion.div>
        </div>
      </section>
    </div>
  );
}
