import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const students = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: 'src/data/students' }),
    schema: z.object({
        name: z.string(),
        kelas: z.string().optional(),
        class: z.string().optional(),
        photo: z.string().optional(),
        gender: z.string().optional(), // 'L' or 'P'
        jenjang: z.string().optional(),
        quote: z.string().optional(),
        alamat: z.string().optional(),
        instagram: z.string().optional(),
    }),
});

const uniforms = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: 'src/data/uniforms' }),
    schema: z.object({
        uniformName: z.string(),
        uniformPhotos: z.array(z.string()),
        modelName: z.string().optional(),
        modelClass: z.string().optional(),
    }),
});

const classes = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: 'src/data/classes' }),
    schema: z.object({
        className: z.string(),
        heroPhoto: z.array(z.string()).optional(),
        walasName: z.string().optional(),
        walasPhoto: z.string().optional(),
        walasGreeting: z.object({
            topText: z.array(z.string()).optional(),
            bottomText: z.array(z.string()).optional(),
        }).optional(),
        groupPhoto: z.array(z.string()).optional(),
        prevClass: z.object({
            name: z.string(),
            slug: z.string(),
            jenjang: z.string(),
        }).optional(),
        nextClass: z.object({
            name: z.string(),
            slug: z.string(),
            jenjang: z.string(),
        }).optional(),
    }),
});

export const collections = {
    students,
    uniforms,
    classes,
};
