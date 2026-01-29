# AURUM - Luxury Lab-Grown Diamonds Website

## Overview

AURUM is a luxury e-commerce showcase website for lab-grown diamonds. The project features cinematic scroll-driven storytelling, smooth animations, and a premium dark aesthetic. Built as a full-stack application with a React frontend and Express backend, it emphasizes visual elegance through GSAP animations, Lenis smooth scrolling, and Framer Motion micro-interactions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, bundled with Vite
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS v4 with custom CSS variables for theming
- **UI Components**: shadcn/ui component library (New York style) with Radix UI primitives
- **State Management**: TanStack React Query for server state
- **Animation Stack**:
  - GSAP with ScrollTrigger for scroll-based animations
  - Lenis for ultra-smooth scrolling
  - Framer Motion for micro-interactions

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript compiled with tsx
- **API Pattern**: RESTful routes prefixed with `/api`
- **Development**: Vite dev server integration with HMR support
- **Production**: Static file serving from compiled dist folder

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` for shared types between frontend and backend
- **Validation**: Zod schemas generated from Drizzle schemas via drizzle-zod
- **Development Storage**: In-memory storage implementation available for rapid prototyping

### Project Structure
```
├── client/           # React frontend
│   ├── src/
│   │   ├── components/  # UI components including shadcn/ui
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utilities and query client
├── server/           # Express backend
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route definitions
│   └── storage.ts    # Data access layer
├── shared/           # Shared types and schemas
└── migrations/       # Drizzle database migrations
```

### Design Patterns
- **Component Architecture**: Functional components with hooks
- **Path Aliases**: `@/` maps to client/src, `@shared/` maps to shared folder
- **Build Process**: Vite for frontend, esbuild for backend bundling
- **Environment**: DATABASE_URL environment variable for PostgreSQL connection

## External Dependencies

### Database
- **PostgreSQL**: Primary database (requires DATABASE_URL environment variable)
- **connect-pg-simple**: Session storage for Express sessions

### Frontend Libraries
- **@tanstack/react-query**: Server state management
- **@studio-freight/lenis**: Smooth scroll library
- **gsap**: Animation library with ScrollTrigger plugin
- **framer-motion**: React animation library
- **Radix UI**: Headless UI primitives (extensive collection for dialogs, dropdowns, etc.)

### Backend Libraries
- **express**: Web framework
- **drizzle-orm**: Database ORM
- **zod**: Schema validation

### Build Tools
- **Vite**: Frontend bundler with React plugin
- **esbuild**: Backend bundler for production
- **drizzle-kit**: Database migration tooling

### Replit-Specific
- **@replit/vite-plugin-runtime-error-modal**: Error overlay in development
- **@replit/vite-plugin-cartographer**: Development tooling
- **@replit/vite-plugin-dev-banner**: Development environment indicator