// import { defineCollection, z } from 'astro:content';
// import { glob } from 'astro/loaders';

// const blog = defineCollection({
// 	// Load Markdown and MDX files in the `src/content/blog/` directory.
// 	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
// 	// Type-check frontmatter using a schema
// 	schema: ({ image }) =>
// 		z.object({
// 			title: z.string(),
// 			description: z.string(),
// 			// Transform string to Date object
// 			pubDate: z.coerce.date(),
// 			updatedDate: z.coerce.date().optional(),
// 			heroImage: image().optional(),
// 		}),
// });

// /**
//  * Memories/Events Collection Schema
//  * For timeline events and memorable moments
//  */
// const memoriesCollection = defineCollection({
//     type: 'content', // Markdown content
//     schema: ({ image }) => z.object({
//         title: z.string(),
//         date: z.date(),
//         category: z.enum([
//             'orientation',
//             'study-tour',
//             'sports',
//             'cultural',
//             'academic',
//             'graduation',
//             'other'
//         ]),

//         // Thumbnail image
//         thumbnail: image(),

//         // Additional images (array)
//         gallery: z.array(image()).optional(),

//         // Short description (for cards)
//         excerpt: z.string(),

//         // Tags
//         tags: z.array(z.string()).optional(),

//         // Featured event?
//         featured: z.boolean().default(false),
//     }),
// });

// /**
//  * Teachers Collection Schema
//  * For teacher/staff profiles
//  */
// const teachersCollection = defineCollection({
//     type: 'data',
//     schema: ({ image }) => z.object({
//         name: z.string(),
//         photo: image(),

//         // Role
//         role: z.string(), // "Guru Matematika", "Kepala Sekolah", etc.
//         subject: z.string().optional(), // Subject taught

//         // Message/quote
//         message: z.string().optional(),

//         // Order (for sorting)
//         order: z.number().optional(),
//     }),
// });

// /**
//  * Gallery Collection Schema
//  * For photo albums/categories
//  */
// const galleryCollection = defineCollection({
//     type: 'data',
//     schema: ({ image }) => z.object({
//         title: z.string(),
//         category: z.string(),
//         description: z.string().optional(),

//         // Cover image
//         cover: image(),

//         // All photos in this album
//         photos: z.array(z.object({
//             image: image(),
//             caption: z.string().optional(),
//             date: z.string().optional(),
//         })),

//         // Date
//         date: z.date(),

//         // Featured album?
//         featured: z.boolean().default(false),
//     }),
// });

// Export collections
// export const collections = {
//     'students': studentsCollection,
    // 'memories': memoriesCollection,
    // 'teachers': teachersCollection,
    // 'gallery': galleryCollection,
// };
