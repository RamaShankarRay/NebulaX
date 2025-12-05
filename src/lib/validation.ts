import { z } from 'zod';

/**
 * Common validation schemas using Zod
 */

export const emailSchema = z.string().email('Invalid email address');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

export const userProfileSchema = z.object({
  displayName: z.string().min(1, 'Display name is required').max(50),
  email: emailSchema,
  bio: z.string().max(500).optional(),
  photoURL: z.string().url().optional().or(z.literal('')),
});

export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: emailSchema,
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000),
});

export type UserProfileInput = z.infer<typeof userProfileSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
