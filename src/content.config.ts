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
        customPrev: z.object({
            name: z.string(),
            url: z.string(),
            label: z.string().optional(),
            sublabel: z.string().optional(),
        }).optional(),
        customNext: z.object({
            name: z.string(),
            url: z.string(),
            label: z.string().optional(),
            sublabel: z.string().optional(),
        }).optional(),
    }),
});

const galleries = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: 'src/data/galleries' }),
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        galleryType: z.enum(['uniform', 'bento']),
        bentoLayout: z.enum(['layout-1', 'layout-2']).optional(),
        photos: z.union([
            z.array(z.string()),
            z.array(z.object({
                url: z.string(),
                title: z.string(),
            }))
        ]).optional(),
        heroPhotos: z.array(z.object({
            url: z.string(),
            title: z.string(),
        })).optional(),
        ip3aPhotos: z.array(z.object({
            url: z.string(),
            title: z.string(),
        })).optional(),
        ip4aPhotos: z.array(z.object({
            url: z.string(),
            title: z.string(),
        })).optional(),
        cta: z.object({
            text_title: z.string(),
            text: z.string(),
            url: z.string(),
        }).optional(),
    }),
});

const teachers = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: 'src/data/teachers' }),
    schema: z.object({
        name: z.string(),
        subjects: z.string(),
        teachOnClass: z.array(z.string()).optional(),
        photo: z.string().optional(),
    }),
});

export const collections = {
    students,
    uniforms,
    classes,
    galleries,
    teachers,
};
