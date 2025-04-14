# Kilimanjaro Training App

A Next.js application for tracking your training progress for climbing Mount Kilimanjaro.

> ✅ **Development Complete**: All planned components and files in the plan.md have been created!

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Supabase Setup

This project uses Supabase for the backend. To set up Supabase locally:

1. Make sure Docker Desktop is installed and running
2. Run the following command to start Supabase locally:

```bash
npx supabase start
```

3. Supabase services will be available at:

   - API: http://127.0.0.1:54321
   - Studio: http://127.0.0.1:54323

4. You can test the Supabase connection by visiting `/supabase-test` route

To stop the local Supabase instance:

```bash
npx supabase stop
```

## Image Resources

Before running the application, make sure to add the required images:

1. Replace the placeholder files in `public/images/` with actual WebP images:
   - `trail-background.webp` - Kilimanjaro background image
   - `tanzania-wildlife.webp` - Tanzania wildlife image

See the README in the `public/images/` directory for specific image recommendations.

## Project Structure

- `/app` - Next.js App Router pages and layout
- `/components` - React components organized by function
- `/hooks` - Custom React hooks
- `/utils` - Utility functions
- `/types` - TypeScript type definitions
- `/styles` - Design tokens and global styles
- `/public` - Static assets

## Features

- Interactive trail visualization showing progress climbing Kilimanjaro
- Weekly workout schedule with expandable/collapsible weeks
- Detailed workout pages with exercise instructions
- Countdown timer to the summit date
- Tanzania fun facts
- Elevation progress tracking

## Development

This project uses:

- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Custom React hooks for state management
- Supabase for backend services

## License

[MIT](https://choosealicense.com/licenses/mit/)
