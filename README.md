# Orbit

Orbit is a modern React-based city discovery dashboard for exploring global hubs, experiences, and locations. It features an interactive map, curated location cards, and polished detail pages built with Tailwind CSS and shadcn UI.

## Live Product

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## Project Description

Orbit is a client-side single-page application built with Vite and TypeScript. It showcases global hubs across categories like coworking, nightlife, art, cafés, hotels, and fitness. The homepage highlights featured locations, category cards, and an interactive map explorer. Each hub has a dedicated detail page with descriptions, services, reviews, and booking prompts.

## Key Features

- Interactive map explorer with Leaflet markers and popups
- Featured hub cards and discovery sections
- Responsive navigation bar with mobile menu
- Hub detail pages with services, reviews, and booking calls to action
- Smooth UI animation via Framer Motion
- Client-side routing with React Router
- Native browser Payment Request API integration for real payment flow
- Universal currency payment and off-ramp flow for global bookings
- Traveler language assistant with local conversation starters and essential city services

## Architecture

### Core structure

- `src/main.tsx` - application entry point that renders the React app
- `src/App.tsx` - root component with providers and route definitions
- `src/pages/Index.tsx` - homepage layout, hero, categories, stats, map, and featured hubs
- `src/pages/HubDetail.tsx` - hub detail page with services, reviews, and sidebar details
- `src/pages/NotFound.tsx` - fallback route for unmatched URLs

### UI and components

- `src/components/` - reusable page components such as `Navbar`, `SearchBar`, `StatsBar`, `CategoryGrid`, `HubCard`, `MapExplorer`, and `CommandPalette`
- `src/components/ui/` - shared shadcn UI primitives and component building blocks
- `src/data/hubs.ts` - static hub dataset with location metadata, review content, and map coordinates

### State and navigation

- `react-router-dom` manages client-side navigation and dynamic routing
- `@tanstack/react-query` provides app-wide query support and shared provider setup
- `react-leaflet` renders the interactive world map and markers
- `framer-motion` handles page and component animations

### Design and styling

- Tailwind CSS for utility-first styling and responsive layouts
- `shadcn-ui` style primitives for consistent design patterns
- `lucide-react` icons for visual accents and interface controls

## Tech stack

- Vite
- React 18
- TypeScript
- Tailwind CSS
- React Router DOM
- React Query
- React Leaflet
- Framer Motion
- shadcn UI
- Lucide icons

## Planned Infrastructure

The current repository contains the frontend experience. A production-grade backend and off-ramp infrastructure would include the following folders and services:

- `server/stripe/` — real payment processing with Stripe, payment intent creation, webhook handling, and secure receipt flow
- `server/crypto-bridge/` — actual crypto bridge backend to convert payments into blockchain-friendly assets and manage off-ramping
- `server/rust/` — Rust backend logic for secure transaction signing, performance-sensitive API endpoints, on-chain transaction orchestration, and backend business logic
- `onchain/` — on-chain transaction execution layer for smart contract interactions, transaction monitoring, event handling, and wallet integration

## Getting Started

```bash
npm install
npm run dev
```

Open the local development server shown by Vite, typically `http://localhost:5173`.

## Available Scripts

- `npm run dev` — start the development server
- `npm run build` — build the production bundle
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint
- `npm run test` — run Vitest tests
- `npm run test:watch` — run tests in watch mode

## Project Layout

```
src/
  App.tsx
  main.tsx
  pages/
    Index.tsx
    HubDetail.tsx
    NotFound.tsx
  components/
    Navbar.tsx
    SearchBar.tsx
    StatsBar.tsx
    CategoryGrid.tsx
    HubCard.tsx
    MapExplorer.tsx
    CommandPalette.tsx
    ui/        # shadcn-style UI primitives
  data/
    hubs.ts
  assets/     # images and static media
```

## Notes

- The app currently uses static hub data in `src/data/hubs.ts`.
- `MapExplorer` renders marker popups and navigates to hub detail pages.
- `src/components/ui` contains shared UI primitives and reusable design elements.
- The payments and off-ramp flow are currently implemented as frontend UI and browser payment sheet support; the backend Stripe/crypto bridge/Rust/on-chain infrastructure is planned but not included in this repo.
