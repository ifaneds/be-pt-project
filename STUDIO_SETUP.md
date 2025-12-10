# Sanity Studio Setup & Access Guide

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   - Copy `.env.example` to `.env.local`
   - Add your Sanity project ID and dataset

3. **Login to Sanity (first time only):**
   ```bash
   npx sanity login
   ```

4. **Deploy the Studio:**
   ```bash
   npm run sanity:deploy
   ```

5. **Invite your client:**
   - Go to [sanity.io/manage](https://sanity.io/manage)
   - Invite them as an "Editor"
   - Share the studio URL with them

## Deploying the Studio for Client Access

The Sanity Studio can be accessed in two ways:

### Option 1: Deploy to Sanity Hosting (Recommended)

This is the easiest way for you and your client to access the studio.

1. **Build the studio:**
   ```bash
   npm run sanity:build
   ```

2. **Deploy to Sanity:**
   ```bash
   npm run sanity:deploy
   ```

3. **Access the Studio:**
   - After deployment, you'll get a URL like: `https://your-project-name.sanity.studio`
   - This URL will be accessible to anyone with access to your Sanity project

### Option 2: Run Locally (Development)

For local development:
```bash
npm run sanity
```

This runs the studio at `http://localhost:3333`

## Setting Up User Access

### For You (Developer)

1. Make sure you're logged into Sanity:
   ```bash
   npx sanity login
   ```

2. You'll automatically have access to the studio once deployed.

### For Your Client

1. **Invite them to your Sanity project:**
   - Go to [sanity.io/manage](https://sanity.io/manage)
   - Select your project
   - Go to "Members" or "Team" section
   - Click "Invite member"
   - Enter their email address
   - Choose their role:
     - **Editor**: Can create/edit content (recommended for clients)
     - **Viewer**: Can only view content
     - **Administrator**: Full access (use with caution)

2. **Share the Studio URL:**
   - Once deployed, share the studio URL with them
   - They'll need to sign in with the email you invited

3. **First-time Access:**
   - They'll receive an email invitation
   - They need to create a Sanity account (if they don't have one)
   - Then they can access the studio at the deployed URL

## Environment Variables

Make sure your `.env.local` file has:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

## Studio Features

The deployed studio includes:
- **Blog Posts** - Create and manage blog posts
- **Authors** - Manage author profiles
- **Vision Tool** - Test GROQ queries
- **Portable Text Editor** - Rich text editing with:
  - Headings (H1, H2)
  - Blockquotes
  - Images
  - Video embeds (YouTube/Vimeo)

## Troubleshooting

### Studio won't deploy
- Make sure you're logged in: `npx sanity login`
- Check that your project ID is correct in `.env.local`
- Verify you have deployment permissions for the project

### Client can't access studio
- Verify they've accepted the invitation email
- Check they're using the correct email address
- Ensure they have the correct role/permissions
- Try having them log out and log back in at the studio URL

### Need to update the studio
- Make any changes to schemas or config
- Run `npm run sanity:build` to rebuild
- Run `npm run sanity:deploy` to deploy updates

