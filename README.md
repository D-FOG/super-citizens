# Supersite Citizens Frontend

Supersite Citizens is a Next.js application for a structured Kingdom growth system. It includes the public website, onboarding pages, application forms, payment initialization routes, member dashboards, and leader dashboards that integrate with the Supersite Citizens backend API.

## Tech Stack

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS
- TanStack Query
- Zustand
- Framer Motion
- Lucide React icons

## Key Features

- Public marketing and information pages for clusters, training, events, resources, leadership, orientation, payments, and contact.
- Authentication page that logs in or registers against the backend API.
- General dashboard for resources, academy, deployment, skills, certification, communication, cluster centers, partner applications, social links, and attendance.
- Leader dashboard for cluster profile, members, training progress, assignments, reports, leader resources, and private leader forums.
- Dashboard API client with JWT support from browser storage and optional environment-token fallback.
- Local Next.js route handlers for join, cluster application, contact, and Flutterwave-ready payment initialization.

## Project Structure

```txt
app/                       Next.js routes, layouts, pages, and local API handlers
components/                Shared UI, navigation, footer, sections, forms, dashboard shell
constants/                 Dashboard navigation and role constants
docs/                      API contract documentation
features/                  Feature-level dashboard and application modules
hooks/                     React Query hooks for dashboard data
lib/                       Utility, content, and local route-handler helpers
providers/                 App-level providers
services/                  Backend API client and dashboard service functions
store/                     Zustand dashboard UI state
types/                     Shared TypeScript types
```

## Requirements

- Node.js 20 or newer recommended
- npm
- Supersite Citizens backend running locally or deployed

## Environment Variables

Create `.env.local` from `.env.example`:

```bash
cp .env.example .env.local
```

Important variables:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Supersite Citizens"
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_API_ACCESS_TOKEN=
NEXT_PUBLIC_WHATSAPP_URL=https://wa.me/
CONTACT_EMAIL=hello@supersitecitizens.org
FLW_PUBLIC_KEY=
FLW_SECRET_KEY=
FLW_REDIRECT_URL=http://localhost:3000/payments?status=success
```

`NEXT_PUBLIC_API_ACCESS_TOKEN` is optional. The login page stores the backend access token in `localStorage` as `superCitizensAccessToken`, and dashboard requests use that token first.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

The dashboard is available at:

```txt
http://localhost:3000/dashboard
http://localhost:3000/leader-dashboard
```

Sign in or register at:

```txt
http://localhost:3000/login
```

## Scripts

```bash
npm run dev      # Start the Next.js development server
npm run build    # Create a production build
npm run start    # Start the production server
npm run lint     # Run Next.js linting
```

## Backend Integration

The dashboard service layer is implemented in `services/dashboard-service.ts`. It calls the backend API defined by `NEXT_PUBLIC_API_BASE_URL`.

Protected requests require a JWT access token. The app resolves the token in this order:

1. `localStorage.superCitizensAccessToken`
2. `NEXT_PUBLIC_API_ACCESS_TOKEN`

Main integrated backend areas:

- Auth: login, register, current profile
- Resources
- Academy overview, lessons, manuals, quizzes, exams, certificates
- Attendance and meeting check-in
- Deployments
- Skills profiles
- Certification levels
- Communication, announcements, prayer networks, project updates
- Cluster centers
- Partner applications
- Leader assignments

## SEO

The app uses Next.js Metadata API defaults from `lib/seo.ts`, with page-level metadata on the public landing pages, plus generated:

- `/sitemap.xml`
- `/robots.txt`

Production SEO environment values:

```bash
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_APP_NAME="Supersite Citizens"
NEXT_PUBLIC_SEO_OG_IMAGE=https://your-domain.com/your-share-image.jpg
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=google-search-console-meta-token
```

Use `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` only for the Search Console HTML tag verification method. For the preferred Domain property method, add the TXT record in DNS instead.
- Leader reports
- Leader forum threads
- Social links

## Local API Routes

The frontend also includes local route handlers under `app/api` for lightweight form and payment flows:

- `POST /api/join`
- `POST /api/contact`
- `POST /api/cluster-applications`
- `POST /api/payments/flutterwave`

These routes currently validate payloads and return structured responses. They are ready to be extended with persistent storage, email delivery, and Flutterwave checkout calls.

## Styling

The UI uses Tailwind CSS with a dark-first visual system, shared components, responsive dashboard layouts, and Lucide icons. Theme preference is managed through the app theme provider and persisted in browser storage.

## Production Notes

- Set `NEXT_PUBLIC_API_BASE_URL` to the deployed backend API URL.
- Configure the backend `CORS_ORIGIN` to include the frontend production origin.
- Use real Flutterwave keys before enabling live payments.
- Do not rely on `NEXT_PUBLIC_API_ACCESS_TOKEN` in production user flows; use the login/session flow.

## Related Documentation

See `docs/api-endpoints.md` for the frontend/backend API contract.
