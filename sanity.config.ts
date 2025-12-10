import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'

// Import schemas
import author from './schemas/author'
import blogPost from './schemas/blogPost'
import videoEmbed from './schemas/custom/videoEmbed'

// Sanity Studio automatically loads environment variables prefixed with SANITY_STUDIO_
// These are available via process.env in the config file
const projectId = 
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.VITE_SANITY_PROJECT_ID ||
  undefined

const dataset = 
  process.env.SANITY_STUDIO_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.VITE_SANITY_DATASET ||
  'production'

if (!projectId) {
  throw new Error(
    'Missing NEXT_PUBLIC_SANITY_PROJECT_ID. Please create a .env.local file with your Sanity project ID.\n' +
    'See .env.example for reference.'
  )
}

export default defineConfig({
  name: 'default',
  title: 'Personal Trainer Blog',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Blog Posts')
              .child(
                S.documentTypeList('blogPost')
                  .title('Blog Posts')
                  .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
              ),
            S.listItem()
              .title('Authors')
              .child(
                S.documentTypeList('author')
                  .title('Authors')
                  .defaultOrdering([{field: 'name', direction: 'asc'}])
              ),
            // Add other document types here
            ...S.documentTypeListItems().filter(
              (listItem) =>
                !['blogPost', 'author'].includes(listItem.getId() || '')
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: [author, blogPost, videoEmbed],
  },
})

