'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionHeaderProps {
  label?: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}

export function SectionHeader({
  label,
  title,
  description,
  className = '',
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className={`mb-12 text-center lg:mb-16 ${className}`}
    >
      {label && (
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-blue-400">
          {label}
        </p>
      )}
      <h2 className="mb-4 text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto max-w-2xl text-base text-gray-300 sm:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  );
}
