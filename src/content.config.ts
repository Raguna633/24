// 1. Import utilities from `astro:content`
import { defineCollection } from 'astro:content';

// 2. Import loader(s)
import { glob, file } from 'astro/loaders';

// 3. Import Zod
import { z } from 'astro/zod';

const students = defineCollection({
    schema: ({ image }) =>
        z.object({
            name: z.string(),
            kelas: z.string(),
            alamat: z.string(),
            photo: image(),
            quote: z.string().optional(),
            instagram: z.string().optional(),
            jenjang: z.string(),
            gender: z.string(),
            password: z.string().optional(),
        }),
});

const classes = defineCollection({
    schema: ({ image }) =>
        z.object({
            name: z.string(),
            heroPhoto: image().array(),
            walas: z.string(),
            walasPhoto: image(),
            walasQuote: z.string(),
            groupPhoto: image().array(),
        }),
});

export const collections = {
    students,
    classes,
};