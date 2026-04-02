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
            name: z.string(),
            heroPhoto: z.array(z.union([image(), z.string()])).optional(),
            walas: z.string(),
            walasPhoto: z.union([image(), z.string()]).optional(),
            walasQuote: z.string(),
            groupPhoto: z.array(z.union([image(), z.string()])).optional(),
        }),
});

export const collections = {
    students,
    uniforms,
    classes,
};