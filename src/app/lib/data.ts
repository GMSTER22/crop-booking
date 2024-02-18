'use server';

import { sql, createClient } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

type User = {
  id: number;
  name: string;
  email: string;
  image: string;
}

export async function checkUser( user : User ) {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();

  try {

    const userData = await sql`SELECT * FROM swsUsers WHERE email = ${user.email}`;

    if ( ! userData.rows.length ) {

      const createdUser = await sql`
        INSERT INTO swsUsers ( name, email, is_admin ) VALUES ( ${user.name}, ${user.email}, false ) RETURNING *;
      `;

      return createdUser.rows[ 0 ];      

    }

    return userData.rows[ 0 ];

  } catch (error) {

    console.error('Database Error:', error);
    throw new Error('Failed to fetch user data.');

  }

}

export async function fetchUserByEmail( email : string) {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();

  try {

    console.log( 'Email', email );

    const user = await sql`SELECT * FROM swsUsers WHERE email = ${email}`;

    // const result = data.rows;

    // console.log(result, 'check data rows')

    // if ( ! data.rows.length ) return false.toString();

    return user.rows[0];

  } catch (error) {

    console.error('Database Error:', error);
    throw new Error('Failed to fetch user data.');

  }

}

export async function fetchBookings() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();

  try {

    const { rows } = await sql`SELECT id, date, seats_available, (SELECT COUNT(*)::INT as seats_booked FROM swsParticipants WHERE booking_id = swsBookings.id) FROM swsBookings ORDER BY swsBookings.date ASC;`;

    // const { rows } = await sql`SELECT swsBookings.* FROM swsBookings ORDER BY swsBookings.date ASC`;

    // console.log( rows, 'ROWS FIELDS' );

    return rows;

  } catch ( error ) {

    console.error( 'Database Error:', error );
    throw new Error( 'Failed to fetch bookings data.' );

  }

}

export async function createBookings( dates : Date[], seats: number ) {
  
  try {
    
    const values = dates.map( date => [ new Date(date), seats ] );

    values.forEach( async ( [ date, seats ] ) => await sql`INSERT INTO swsBookings (date, seats_available) VALUES (${date as number}, ${seats as number})` );

  } catch ( error ) {
    
    console.log( 'Failed to insert booked dates' );

  }

}

export async function createParticipants( participants : [] ) {
  
  try {
    
    // const participants = dates.map( date => [ new Date(date), seats ] );

    participants.forEach( async ( participant ) => await sql`INSERT INTO swsParticipants (name, email, booking_id, user_id) VALUES (${participant[0]}, ${participant[1]}, ${participant[2]}, ${participant[3]})` );

  } catch ( error ) {
    
    console.log( 'Failed to insert participants' );

  }

}

// INSERT INTO swsParticipants (name, email, booking_id, userId) VALUES 
// (Abdoul, abdoul@google.com, 12, 4),  *
// (Kader, kader@google.com, 12, 4),    *
// (Michel, michel@google.com, 13, 4), 
// (Joe, joe@google.com, 13, 1), 
// (Jane, jane@google.com, 13, 4), 
// (Alpha, alpha@gmail.com, 12, 1)       *
