import { defineCollection, z } from "astro:content";

const students = defineCollection({
    schema: ({ image }) =>
        z.object({
            name: z.string(),
            kelas: z.string(),
            alamat: z.string(),
            photo: image().optional(),
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
            uniformPhotos: z.array(image()).optional(),
            modelName: z.string(),
            modelClass: z.string(),
        }),
});

const classes = defineCollection({
    schema: ({ image }) =>
        z.object({
            name: z.string(),
            heroPhoto: z.array(image()).optional(),
            walas: z.string(),
            walasPhoto: image().optional(),
            walasQuote: z.string(),
            groupPhoto: z.array(image()).optional(),
        }),
});

export const collections = {
    students,
    uniforms,
    classes,
};