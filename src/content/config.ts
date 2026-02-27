import { defineCollection, z } from "astro:content";

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
            heroPhoto: image(),
            walas: z.string(),
            walasPhoto: image(),
            walasQuote: z.string(),
            groupPhoto: image(),
        }),
});

export const collections = {
    students,
    classes,
};