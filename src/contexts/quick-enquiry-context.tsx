'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface QuickEnquiryContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const QuickEnquiryContext = createContext<QuickEnquiryContextType | undefined>(
  undefined
);

export function QuickEnquiryProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <QuickEnquiryContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </QuickEnquiryContext.Provider>
  );
}

export function useQuickEnquiry() {
  const context = useContext(QuickEnquiryContext);
  if (context === undefined) {
    throw new Error(
      'useQuickEnquiry must be used within a QuickEnquiryProvider'
    );
  }
  return context;
}
