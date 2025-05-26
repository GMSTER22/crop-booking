# Scrapbook Concierge Retreat Booking App

The [Scrapbook Concierge Retreat Booking App](https://scrapping-with-sadie.vercel.app/) is an application that allows potential customers interested in scrapbooking with Scrapbook Concierge talented designer Sadie to book crop date(s).

## ✨ Features

- **OAuth Login:** Secure login using GitHub and Google accounts.
- **Retreat Date Management:** Admins can add new retreat dates for users to book.
- **Booking System:**
  - View all available retreat dates.
  - Book a retreat for yourself or your group by adding participant names and emails.
  - Manage your bookings: view, update, or delete participant information as needed.

## 🛤️ User Flow

1. **Sign Up / Login:** Authenticate with your GitHub or Google account.
2. **Browse Retreat Dates:** See all upcoming scrapbooking retreat dates available for booking.
3. **Book Your Spot:** Choose a date and add participants (yourself and/or friends/group members).
4. **Manage Bookings:** Review your bookings, edit participant details, or cancel if needed.


## 🚀 Getting Started
### Prerequisites
* Node.js (18 or higher recommended)
* Yarn or npm

### Configuration

To run this project, you need to configure the following environment variables in the `.env.example`.

### Installation

**Clone the repository**
```
git clone https://github.com/GMSTER22/crop-booking.git
cd crop-booking
```

**Install dependencies**
```
npm install
# or
yarn install
```

**Development**
```
npm run dev
# or
yarn dev
```
This will run the app on `http://localhost:3000`.

**Build**
```
npm run build
# or
yarn build
```

## 🛠️ Tech Stack

* JavaScript
* TypeScript
* React.js
* Next.js
* Next Auth
* TailwindCSS
* POSTGRES (Vercel Postgres database)


## 📂 Project Structure

    src/    
      └── app/    
          ├── admin/    
          ├── api/
          ├── booking/
          ├── lib/
          ├── login/
          ├── my-bookings/
          ├── pricing/
          ├── session/
          ├── ui/
          ├── global.css
          ├── layout.tsx
          └── page.tsx


## 📄 License

© 2025 Scrapbook Concierge. All rights reserved.

