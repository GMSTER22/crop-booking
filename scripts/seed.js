const { db } = require('@vercel/postgres');
// const {
//   invoices,
//   customers,
//   revenue,
//   users,
// } = require('../app/lib/placeholder-data.js');

async function seedTables(client) {
  try {
    // await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createUsersTable = await client.sql`
        CREATE TABLE IF NOT EXISTS swsUsers (
        id SERIAL NOT NULL PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        email VARCHAR(255) NOT NULL,
        is_admin BOOLEAN NOT NULL,
        date DATE NOT NULL
      );
    `;

    const createBookingTable = await client.sql`
        CREATE TABLE IF NOT EXISTS swsBookings (
        id SERIAL NOT NULL PRIMARY KEY,
        date DATE NOT NULL,
        seats_available INT NOT NULL
      );
    `;

    const createParticipantsTable = await client.sql`
        CREATE TABLE IF NOT EXISTS swsParticipants (
        id SERIAL NOT NULL PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        email VARCHAR(255) NOT NULL,
        booking_id INT NOT NULL,
        user_id INT NOT NULL,
        FOREIGN KEY (booking_id) REFERENCES sws-bookings,
        FOREIGN KEY (user_id) REFERENCES sws-users
      );
    `;

    console.log(`Created all tables`);

    return {

      createUsersTable,

      createBookingTable,

      createParticipantsTable

    };

  } catch (error) {
    console.error('Error seeding invoices:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedTables(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
