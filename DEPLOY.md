# Deploy to GitHub Pages

This project is set up for **static export** and deployment via **GitHub Actions**.

## 1. Create the repo and push

- Create a new repository on GitHub (e.g. `be-pt-project`).
- Push your code (including the `.github/workflows/deploy.yml` workflow).

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/be-pt-project.git
git push -u origin main
```

## 2. Add Sanity secrets

The build needs your Sanity project id and dataset. In GitHub:

1. Open your repo → **Settings** → **Secrets and variables** → **Actions**.
2. **New repository secret** for:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` — your Sanity project ID.
   - `NEXT_PUBLIC_SANITY_DATASET` — your Sanity dataset (e.g. `production`).

(Use the same values as in your local `.env.local`.)

## 3. Enable GitHub Pages

1. Repo → **Settings** → **Pages**.
2. Under **Build and deployment**:
   - **Source**: GitHub Actions.

After the first successful run of the **Deploy to GitHub Pages** workflow, the site will be available at:

**https://YOUR_USERNAME.github.io/be-pt-project/**

(Replace `YOUR_USERNAME` and `be-pt-project` with your GitHub username and repo name.)

## 4. Add Sanity CORS origin (required for blog, resources, and Studio)

The blog, resources, and **Studio** all talk to Sanity from the browser. Sanity only allows requests from origins you approve.

1. Go to **[manage.sanity.io](https://manage.sanity.io)** and select your project.
2. Open **API** → **CORS origins** (or **Settings** → **API** → **CORS origins**).
3. Click **Add origin** and add:
   - **`https://YOUR_USERNAME.github.io`**  
     (e.g. `https://ifaneds.github.io` — no trailing slash, no path)
4. **Enable “Allow credentials”** for this origin (checkbox in the CORS list).  
   This is **required for the Studio**: it uses the Management API with cookies/auth, and the browser will block those requests unless credentials are allowed.
5. Save.

After this, the blog and resources lists should load, and the Studio at `https://YOUR_USERNAME.github.io/be-pt-project/studio` should load and log in without CORS or 403 errors.

## 5. Optional: favicon

Put a `favicon.ico` in the `public/` folder if you want a custom favicon. The layout uses the base path so it will work on GitHub Pages.

## 6. Optional: user/org site at root

If the repo is a **user or org site** (repo name is `YOUR_USERNAME.github.io`), the site is served at the root (e.g. `https://YOUR_USERNAME.github.io/`). In that case:

1. Open `.github/workflows/deploy.yml`.
2. Change the `BASE_PATH` env to be empty, e.g.:

   ```yaml
   env:
     BASE_PATH: ''
   ```

## Local static build (optional)

To test the exported site locally:

```bash
# Project page (same as GitHub Pages for repo "be-pt-project")
set BASE_PATH=/be-pt-project
npm run build
npx serve out
# Then open http://localhost:3000/be-pt-project/
```

On macOS/Linux use `export BASE_PATH=/be-pt-project` instead of `set`.
