/**
 * This configuration file lets you run `$ sanity [command]` in this folder
 * Go to https://www.sanity.io/docs/cli to learn more.
 *
 * Sanity CLI loads .env.development (sanity start) and .env.production (sanity build/deploy).
 * Loading dotenv here ensures vars are available when the CLI runs in CI or deployment
 * where .env files might not be auto-loaded. See:
 * https://www.sanity.io/answers/issue-with-environment-variables-not-working-in-the-sanity-config-js-file-when-deploying-to-sanity-studio-
 */
import 'dotenv/config'
import { defineCliConfig } from 'sanity/cli'

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset =
  process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET

export default defineCliConfig({ api: { projectId, dataset } })
