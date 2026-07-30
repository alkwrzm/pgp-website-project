# PGP INT PACIFIC - Project State

## 1. Current Project Overview
Full-Stack Website & CMS for PGP INT PACIFIC built with Next.js 16 (App Router), Tailwind CSS v4, Prisma, and Supabase Storage.
Features **Light & Dark Mode Theme Switcher** and fixed preview screenshot layout for Services.

## 2. Tech Stack & Environment Variables
**Stack:** Next.js (App Router), TypeScript, Tailwind CSS v4, Prisma ORM, Supabase Storage, Lucide React icons.

**Required `.env` Variables for Vercel Deployment:**
- `DATABASE_URL`: Connection string for PostgreSQL with `?pgbouncer=true&connection_limit=1` (pooler 6543) or `?connection_limit=5` (direct 5432)
- `DIRECT_URL`: Direct connection string (port 5432) for Prisma migrations
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL (`https://mtorxpfzlfurpssyceua.supabase.co`)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase public anon key
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key
- `SUPABASE_STORAGE_BUCKET`: Supabase storage bucket (`pgp-website`)
- `ADMIN_PASSWORD`: Custom password for `/admin` login (defaults to `admin`)

## 3. File Structure Map
- `/app/(public)/page.tsx`: Single landing page with HeroSection, CompanyProfileSection, ServicesSection, PortfolioSection, and ContactSection
- `/app/admin`: CMS dashboard for Projects (`/admin`) and Services (`/admin/services`) with full Edit & Delete actions
- `/app/api`: Route handlers (`/api/login`, `/api/projects`, `/api/services`, `/api/upload`)
- `/components`: `Navbar` (Typography Brand + Sun/Moon Theme Switcher + ID/EN Language Switcher), `Footer`, `HeroSection`, `CompanyProfileSection`, `ServicesSection`, `PortfolioSection`, `ContactSection`, `ProjectCard`, `ProjectForm`, `ServiceForm`, `DeleteButton`
- `/context`: `LanguageContext.tsx`, `ThemeContext.tsx`
- `/lib`: `translations.ts` (Full ID/EN dictionary), `prisma.ts`, `supabase.ts`, `auth.ts`, `seedServices.ts`
- `/prisma`: `schema.prisma` (Project & Service models)

## 4. Database Schema Status
- **Model `Project`**: `id`, `title`, `category`, `imageUrl`, `eventDate`, `description`, `createdAt`.
- **Model `Service`**: `id`, `title`, `subtitle`, `category`, `description`, `images` (String[]), `order`, `createdAt`.
- **Status**: Live & synced to Supabase PostgreSQL via Prisma migration.

## 5. Next Steps / Todo List
- All theme updates and layout fixes completed.
