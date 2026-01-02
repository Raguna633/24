// src/content/config.ts
import { defineCollection, z } from 'astro:content';

/**
 * Student Collection Schema
 * Defines the structure for student data
 */
const studentsCollection = defineCollection({
    type: 'data',
    schema: ({ image }) => z.object({
        // Basic Info
        name: z.string(),
        class: z.string(),

        // Photo (auto-validated by Astro)
        photo: image(),

        // Optional fields
        quote: z.string().optional(),
        hobbies: z.array(z.string()).optional(),
        dream: z.string().optional(),
        instagram: z.string().optional(),

        // Privacy settings
        privacyLevel: z.enum(['public', 'semi-public', 'minimal', 'opt-out']).default('public'),
        consent: z.object({
            displayName: z.boolean().default(true),
            displayPhoto: z.boolean().default(true),
            displayQuote: z.boolean().default(true),
            displayHobbies: z.boolean().default(true),
            displaySocialMedia: z.boolean().default(true),
            searchEngineIndex: z.boolean().default(true),
            consentDate: z.string(),
            parentConsent: z.boolean().default(false),
        }),

        // Metadata
        order: z.number().optional(), // For custom ordering
    }),
});

/**
 * Memories/Events Collection Schema
 * For timeline events and memorable moments
 */
const memoriesCollection = defineCollection({
    type: 'content', // Markdown content
    schema: ({ image }) => z.object({
        title: z.string(),
        date: z.date(),
        category: z.enum([
            'orientation',
            'study-tour',
            'sports',
            'cultural',
            'academic',
            'graduation',
            'other'
        ]),

        // Thumbnail image
        thumbnail: image(),

        // Additional images (array)
        gallery: z.array(image()).optional(),

        // Short description (for cards)
        excerpt: z.string(),

        // Tags
        tags: z.array(z.string()).optional(),

        // Featured event?
        featured: z.boolean().default(false),
    }),
});

/**
 * Teachers Collection Schema
 * For teacher/staff profiles
 */
const teachersCollection = defineCollection({
    type: 'data',
    schema: ({ image }) => z.object({
        name: z.string(),
        photo: image(),

        // Role
        role: z.string(), // "Guru Matematika", "Kepala Sekolah", etc.
        subject: z.string().optional(), // Subject taught

        // Message/quote
        message: z.string().optional(),

        // Order (for sorting)
        order: z.number().optional(),
    }),
});

/**
 * Gallery Collection Schema
 * For photo albums/categories
 */
const galleryCollection = defineCollection({
    type: 'data',
    schema: ({ image }) => z.object({
        title: z.string(),
        category: z.string(),
        description: z.string().optional(),

        // Cover image
        cover: image(),

        // All photos in this album
        photos: z.array(z.object({
            image: image(),
            caption: z.string().optional(),
            date: z.string().optional(),
        })),

        // Date
        date: z.date(),

        // Featured album?
        featured: z.boolean().default(false),
    }),
});

// Export collections
export const collections = {
    'students': studentsCollection,
    'memories': memoriesCollection,
    'teachers': teachersCollection,
    'gallery': galleryCollection,
};