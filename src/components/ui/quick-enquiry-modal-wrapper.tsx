'use client';

import { QuickEnquiryModal } from './quick-enquiry-modal';
import { useQuickEnquiry } from '@/contexts/quick-enquiry-context';

export function QuickEnquiryModalWrapper() {
  const { isOpen, closeModal } = useQuickEnquiry();
  return <QuickEnquiryModal isOpen={isOpen} onClose={closeModal} />;
}
