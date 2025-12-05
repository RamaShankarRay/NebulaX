'use client';

import { useState, useEffect } from 'react';
import { X, Phone, Mail, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuickEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuickEnquiryModal({ isOpen, onClose }: QuickEnquiryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    service: '',
    message: '',
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Quick enquiry submitted:', formData);
    onClose();
  };

  const services = [
    'Website Development',
    'App Development',
    'UI/UX Design',
    'SEO',
    'Social Media Marketing',
    'Graphic Design',
    'Content Writing',
    'System/Software Development',
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[210] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-lg border border-gray-800 bg-gray-900 shadow-2xl lg:flex-row">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 z-10 rounded-md p-2 transition-colors hover:bg-gray-800"
                aria-label="Close modal"
              >
                <X className="h-5 w-5 text-gray-400 hover:text-white" />
              </button>

              {/* Left Section - Form */}
              <div className="flex-1 overflow-y-auto overscroll-contain p-6 sm:p-8 lg:p-10">
                <div className="mx-auto max-w-md lg:max-w-none">
                  <div className="mb-6">
                    <p className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-400">
                      Have a Project in Mind
                    </p>
                    <h2 className="mb-2 text-2xl font-semibold text-white sm:text-3xl">
                      Tell Us A Bit More
                    </h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="mb-2 block text-xs font-medium text-gray-400">
                        Name <span className="text-blue-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange('name', e.target.value)
                        }
                        className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-white placeholder-gray-500 transition-colors focus:border-blue-500 focus:outline-none"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-medium text-gray-400">
                        Email <span className="text-blue-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange('email', e.target.value)
                        }
                        className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-white placeholder-gray-500 transition-colors focus:border-blue-500 focus:outline-none"
                        placeholder="your.email@example.com"
                      />
                    </div>

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
                        className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-white placeholder-gray-500 transition-colors focus:border-blue-500 focus:outline-none"
                        placeholder="+977 98XXXXXXXX"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-medium text-gray-400">
                        Service
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={(e) =>
                          handleInputChange('service', e.target.value)
                        }
                        className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-white transition-colors focus:border-blue-500 focus:outline-none"
                      >
                        <option value="">---Service---</option>
                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-medium text-gray-400">
                        Write a Message <span className="text-blue-400">*</span>
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) =>
                          handleInputChange('message', e.target.value)
                        }
                        className="w-full resize-none rounded-md border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-white placeholder-gray-500 transition-colors focus:border-blue-500 focus:outline-none"
                        placeholder="Tell us about your project..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>

              {/* Right Section - Contact Info */}
              <div className="w-full flex-shrink-0 border-t border-gray-800 bg-gray-800/50 p-6 sm:p-8 lg:w-96 lg:border-l lg:border-t-0 lg:p-10">
                <div className="mx-auto max-w-md lg:max-w-none">
                  <div className="mb-8">
                    <p className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-400">
                      We would love to hear from you
                    </p>
                    <h2 className="mb-2 text-2xl font-semibold text-white sm:text-3xl">
                      Get In Touch
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-600/20">
                        <Phone className="h-6 w-6 text-blue-400" />
                      </div>
                      <div>
                        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">
                          Our Phone Number
                        </p>
                        <a
                          href="tel:+9779709098343"
                          className="text-base text-white transition-colors hover:text-blue-400"
                        >
                          +977 9709098343
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-600/20">
                        <Mail className="h-6 w-6 text-blue-400" />
                      </div>
                      <div>
                        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">
                          Our Email
                        </p>
                        <a
                          href="mailto:sales@nebulax.com"
                          className="text-base text-white transition-colors hover:text-blue-400"
                        >
                          sales@nebulax.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-600/20">
                        <MapPin className="h-6 w-6 text-blue-400" />
                      </div>
                      <div>
                        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">
                          Office Address
                        </p>
                        <p className="text-base text-white">Rajbiraj, Nepal</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
