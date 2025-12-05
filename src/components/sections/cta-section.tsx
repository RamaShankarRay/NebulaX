'use client';

import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { useQuickEnquiry } from '@/contexts/quick-enquiry-context';

export function CTASection() {
  const { openModal } = useQuickEnquiry();
  return (
    <section id="cta" className="relative bg-black py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main Title */}
          <h2 className="mb-4 text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
            Ready to Transform Your Business?
          </h2>

          {/* Description */}
          <p className="mx-auto mb-8 max-w-2xl text-base text-gray-400 sm:text-lg">
            Let&apos;s connect and turn your vision into reality. We are
            available from 9:00 AM to 6:00 PM, Monday to Friday.
          </p>

          {/* CTA Content */}
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            {/* Phone Number */}
            <div className="flex items-center gap-3 text-xl font-medium text-white sm:text-2xl">
              <Phone className="h-5 w-5 text-blue-400 sm:h-6 sm:w-6" />
              <a
                href="tel:+9779709098343"
                className="transition-colors hover:text-blue-400"
              >
                +977 9709098343
              </a>
            </div>

            {/* CTA Button */}
            <Button
              size="lg"
              onClick={openModal}
              className="rounded-lg bg-blue-600 px-8 py-6 text-base font-medium text-white transition-colors hover:bg-blue-500 sm:text-lg"
            >
              Let&apos;s Start Conversation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
