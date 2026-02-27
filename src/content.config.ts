// 1. Import utilities from `astro:content`
import { defineCollection } from 'astro:content';

// 2. Import loader(s)
import { glob, file } from 'astro/loaders';

// 3. Import Zod
import { z } from 'astro/zod';

// 4. Define your collection(s)
const students = defineCollection({
    loader: glob({ pattern: "**/*.mdx", base: "./src/content/students" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.date(),
        author: z.string()
    })
});

// 5. Export a single `collections` object to register your collection(s)
export const collections = { students };