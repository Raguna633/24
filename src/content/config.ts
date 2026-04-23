import { defineCollection, z } from "astro:content";

const students = defineCollection({
    schema: ({ image }) =>
        z.object({
            name: z.string(),
            kelas: z.string().optional(),
            class: z.string().optional(),
            alamat: z.string().optional(),
            photo: z.union([image(), z.string()]).optional(),
            quote: z.string().optional(),
            instagram: z.string().optional(),
            jenjang: z.string(),
            gender: z.string(),
            password: z.string().optional(),
        }),
});

const uniforms = defineCollection({
    schema: ({ image }) =>
        z.object({
            uniformName: z.string(),
            uniformPhotos: z.array(z.union([image(), z.string()])).optional(),
            modelName: z.string(),
            modelClass: z.string(),
        }),
});

const classes = defineCollection({
    schema: ({ image }) =>
        z.object({
            className: z.string(),
            heroPhoto: z.array(z.union([image(), z.string()])).optional(),
            walasName: z.string(),
            walasPhoto: z.union([image(), z.string()]).optional(),
            walasGreeting: z.object({
                topText: z.array(z.string()),
                bottomText: z.array(z.string()),
            }),
            groupPhoto: z.array(z.union([image(), z.string()])).optional(),
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