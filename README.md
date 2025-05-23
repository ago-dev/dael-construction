This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, set up your environment variables:

1. Copy `.env.local.example` to `.env.local`
2. Update the values in `.env.local` with your own configuration
   - You'll need a Sanity project ID (required)
   - Configure email settings for the contact form

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load custom fonts.

## Environment Variables

This project requires several environment variables to function properly:

### Required Variables
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Your Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET`: Sanity dataset (defaults to "production")
- `NEXT_PUBLIC_SANITY_API_VERSION`: Sanity API version (defaults to "2023-05-03")

### Optional Variables
- `SANITY_STUDIO_API_TOKEN`: Required only for CMS content management
- `EMAIL_USER`, `EMAIL_PASS`, `ADMIN_EMAIL`: Required for contact form functionality

## Sanity CMS

This project uses Sanity as a headless CMS. The Sanity Studio is embedded in this project and can be accessed at `/studio` when running the development server.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

When deploying to Vercel, make sure to add all required environment variables in the Vercel project settings.
