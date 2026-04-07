# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager: **pnpm** (lockfile is `pnpm-lock.yaml`).

- `pnpm dev` — start Next.js dev server (Turbopack).
- `pnpm build` — production build.
- `pnpm start` — run the production build.
- `pnpm lint` — `next lint`.
- `pnpm email` — run the React Email dev server to preview templates in `emails/`.

There is no test runner configured (`@types/jest` is present but no test script).

## High-level architecture

Zen Lounge is a Next.js 15 (App Router, React 19) booking site for a wellness institute in French Guiana. It is in French and uses Firebase for data/auth, Stripe for payments, and Resend + React Email for transactional mail. Path alias `@/*` resolves to the repo root.

### Route layout (`app/`)

The App Router uses route groups to layer concerns:

- `app/layout.tsx` — root layout, only sets `<html>`/`<body>` and global SEO metadata. The shared site chrome (Navbar, Footer, Toaster, max-width container) lives in `app/(app)/layout.tsx`, **not** the root layout. Pages outside the `(app)` group (e.g. `app/admin/*`) intentionally render without the public navbar.
- `app/(app)/(protected)/` — `prestations` and `profil` routes, gated for logged-in users.
- `app/(app)/{forfaits,location,massages,soins,reservations,reviews,login,success,cancel}` — public marketing/booking pages.
- `app/admin/(dashboard)/` — admin area (`bookings`, `clients`, `forfaits`, `rentals`) with its own `layout.tsx`.
- `app/api/webhooks/stripe/route.ts` — Stripe webhook entry point (see Payments below).
- `app/sitemap.ts` — generated sitemap.

### Auth and route protection

Auth is Firebase Auth on the client (`firebase/firebase.ts`) with `firebase-admin` (`firebase/admin.ts`) used in server actions/API routes. Sessions are tracked via an `authToken` cookie.

`middleware.ts` is intentionally narrow: it only protects the **exact** paths `/prestations` and `/profil` (`matcher` is a fixed list, not a prefix). When adding new authenticated routes, add them both to the `protectedRoutes` array and the `matcher` config — placing them under the `(protected)` route group is not enough.

### Server actions (`actions/`)

All data mutations and most fetches go through `"use server"` files in `actions/` rather than API routes. Examples:

- Bookings: `saveBooking`, `saveRentBooking`, `cancelBooking`, `cancelRentBookings`, `fetchBookings`, `fetchRentBookings`, `fetchRentBookedDates`, `getUserBookings`.
- Catalog/users: `fetchForfaits`, `fetchClients`, `fetchReviews`, `submitReview`, `getUserInfos`, `getAdminStatus`.
- Auth/profile: `authActions`, `authClient`, `updateUserProfile`, `updateUserPassword`.
- Payments + email: `createCheckoutSession`, `sendEmail`, `sendCancellationEmail`.

`createCheckoutSession.ts` is the single entry point for Stripe checkout — it handles three booking shapes (one-off prestation, forfait/package, and Serenity Suite rental with `dateFrom`/`dateTo`) and packs the full booking payload into the Stripe session `metadata.bookingData` as JSON. Keep that contract in sync with the webhook.

### Payments flow

1. Client form → server action `createCheckoutSession` → Stripe Checkout session, with `bookingData`, `userId`, and optional `forfaitId` stuffed into `session.metadata`.
2. Stripe redirects to `/success` or `/cancel` (URLs are currently hardcoded to `https://zenlounge-guyane.fr` in `createCheckoutSession.ts`; commented localhost variants exist for dev).
3. `app/api/webhooks/stripe/route.ts` receives `checkout.session.completed`, re-parses `metadata.bookingData` through `validation/bookingData.ts` (`bookingDataSchema` — Zod), then dispatches: `serviceName === "Serenity Suite"` → `saveRentBooking`, otherwise `saveBooking`, and triggers `sendEmail`. Forfait credits are handled via the `forfaitId` metadata. The route disables the default body parser so the raw body is available for signature verification.

When changing the booking payload, update **all four** of: the form, `createCheckoutSession`, `validation/bookingData.ts` (Zod schema), and the webhook dispatcher.

### Data, validation, types

- `types/` — shared TS types (`bookingData`, `rentBookingData`, `forfaitsData`, `creditsData`, `userData`, …). Note that `BookingDataType` is used as a global ambient type in some server actions.
- `validation/` — Zod schemas (`bookingData`, `bookingSchema`, `clientInfoForm`, `Login`, `Profile`, `reviewSchemaClient`) plus a `validation/server/` subfolder for server-only schemas. The webhook is the canonical re-validation point for booking data crossing the Stripe boundary.
- `data/` — **static config**, not runtime data: navbar links, form field configs (`BookingForm.config.ts`, `LoginForm.config.ts`, `ProfileForm.config.ts`), dashboard table configs, review constants. Edit these to change copy, options, or form schemas rather than touching component internals.

### Components

Two-tier organization in `components/`:

- `components/ui/` — shadcn/ui primitives (Radix-based) generated via `components.json`.
- Top-level `components/*.tsx` — feature components (BookingForm, ServiceCard, Navbar, etc.). `components/admin/`, `components/prestations/`, and `components/profile/` group screens for the matching routes.

Forms use `react-hook-form` + `@hookform/resolvers` with the Zod schemas in `validation/`.

### Email

`emails/` holds React Email templates (`booking/`, `cancellation/`). Preview them with `pnpm email`. They are sent through Resend (`lib/resend.ts`) from server actions like `sendEmail` and `sendCancellationEmail`.

### Environment

Required env vars (see `.env.local`):

- `NEXT_PUBLIC_FIREBASE_*` — Firebase web SDK config consumed by `firebase/firebase.ts`.
- Firebase Admin credentials — consumed by `firebase/admin.ts`.
- `STRIPE_*` including `STRIPE_WEBHOOK_SECRET` — used by `lib/stripe.ts` and the webhook route.
- Resend API key — used by `lib/resend.ts`.
