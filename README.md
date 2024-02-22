
## Getting Started

First, run the development server:

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

Create a .env file with the variables to connect to the desired Vercel Postgres database (POSTGRES_URL, POSTGRES_PRISMA_URL, POSTGRES_URL_NO_SSL, POSTGRES_URL_NON_POOLING, POSTGRES_USER, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_DATABASE, NEXTAUTH_URL, NEXTAUTH_SECRET, GITHUB_ID, GITHUB_SECRET, GOOGLE_ID, GOOGLE_SECRET)

## Description

The Scrapping-with-sadie-app is application that allows potential customers interested in scrapbooking with my the designer Sadie to be able to book crop date(s) that only an admin can make available through the Admin page which is suppose to be restricted to administrator only (but for testing purposes, the admin route is not restricted).

 [Application URL](https://scrapping-with-sadie.vercel.app/)

## Features

The application requires customers to authenticate themselves in order to book a crop session or see their bookings.

Once the customers logs in:

  They will have access to the "Book Crop Session" page where they can see the dates available for booking and add them to a form where they add their information (name and email) but also the information of the friends they're booking with. This allow one person to book for the whole group.

  They will also have access to the "My Bookings" page where they can see the bookings that they have made with the possibility to update/delete some of the bookings.

  The "Admin" page is currently accessible to any authenticated user for testing purposes but will be restricted to administrators only who will be able to add dates available for customers to book. They can also delete dates, but only dates that haven't yet been booked by any customers to avoid unhappy customers.


