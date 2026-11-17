import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string().trim().min(1),
    date: z.coerce.date(),
    tags: z.array(z.string().trim().min(1)).min(1),
    description: z.string().trim().min(1),
  }),
});

export const collections = { blog };
