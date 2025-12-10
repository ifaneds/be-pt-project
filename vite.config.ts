import {defineConfig} from 'vite'
import {loadEnv} from 'vite'

export default defineConfig(({mode}) => {
  // Load all env variables from .env files
  const env = loadEnv(mode, process.cwd(), ['NEXT_PUBLIC_', 'VITE_'])
  
  return {
    define: {
      // Make environment variables available in the config
      'process.env.NEXT_PUBLIC_SANITY_PROJECT_ID': JSON.stringify(
        env.NEXT_PUBLIC_SANITY_PROJECT_ID || env.VITE_SANITY_PROJECT_ID
      ),
      'process.env.NEXT_PUBLIC_SANITY_DATASET': JSON.stringify(
        env.NEXT_PUBLIC_SANITY_DATASET || env.VITE_SANITY_DATASET || 'production'
      ),
    },
    // Expose env vars to client
    envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
  }
})

