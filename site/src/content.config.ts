import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

// Standard Starlight docs collection (content under src/content/docs/).
// Astro 6 content layer requires an explicit loader; docsLoader() is Starlight's.
// The schema is extended with the optional fields the generator emits so the
// generated framework/family/recipe/evidence pages validate.
export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        generated: z.boolean().optional(),
        source: z.string().optional(),
        family: z.string().optional(),
        evidence_tier: z.string().optional(),
        artifact: z.string().optional(),
        skill_id: z.string().optional(),
        skill_name: z.string().optional(),
        version: z.string().or(z.number()).optional(),
      }),
    }),
  }),
};
