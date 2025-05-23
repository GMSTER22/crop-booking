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

    const user = await sql`SELECT * FROM swsUsers WHERE email = ${email}`;

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

    const { rows } = await sql`SELECT id, date::TIMESTAMP WITHOUT TIME ZONE, seats_available, (SELECT COUNT(*)::INT as seats_booked FROM swsParticipants WHERE booking_id = swsBookings.id) FROM swsBookings ORDER BY swsBookings.date ASC;`;

    return rows;

  } catch ( error ) {

    console.error( 'Database Error:', error );
    throw new Error( 'Failed to fetch bookings data.' );

  }

}

export async function fetchUserBookings( userId : number ) {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();

  try {

    const { rows } = await sql`SELECT swsParticipants.id, swsParticipants.name, swsParticipants.email, swsBookings.date FROM swsParticipants LEFT JOIN swsBookings ON swsParticipants.booking_id = swsBookings.id WHERE swsParticipants.user_id = ${userId}`;

    return rows;

  } catch ( error ) {

    console.error( 'Database Error:', error );
    throw new Error( 'Failed to fetch bookings data.' );

  }

}

export async function createBookings( dates : Date[], seats: number ) {
  
  try {
    
    const values = dates.map( date => [ new Date(date), seats ] );

    values.forEach( async ( [ date, seats ] ) => await sql`INSERT INTO swsBookings (date, seats_available) VALUES (${date as number}::timestamp AT TIME ZONE 'America/New_York', ${seats as number})` );

  } catch ( error ) {
    
    console.log( 'Failed to insert booked dates' );

  }

}

export async function deleteBookings( id : number ) {
  
  try {
    
    const deleteBookingOutcome = await sql`DELETE FROM swsBookings WHERE id = ${id};`;

  } catch ( error ) {
    
    console.log( 'Failed to delete booked date ' + id );

  }

}

export async function createParticipants( participants : [] ) {
  
  try {

    participants.forEach( async ( participant ) => await sql`INSERT INTO swsParticipants (name, email, booking_id, user_id) VALUES (${participant[0]}, ${participant[1]}, ${participant[2]}, ${participant[3]})` );

  } catch ( error ) {
    
    console.log( 'Failed to insert participants' );

  }

}

export async function updateParticipants( { id, name, email } : { id : number, name: string, email: string } ) {
  
  try {
    
    const updateParticipantOutcome = await sql`UPDATE swsParticipants SET name = ${name}, email = ${email} WHERE id = ${id};`;

    console.log( updateParticipantOutcome, 'UPDATED Participant OUtcome' );

  } catch ( error ) {
    
    console.log( 'Failed to update participant booking ' + id );

  }

}

export async function deleteParticipants( id : number ) {
  
  try {
    
    const deleteParticipantOutcome = await sql`DELETE FROM swsParticipants WHERE id = ${id};`;

    console.log( deleteParticipantOutcome, 'DELETE Participant OUtcome' );

  } catch ( error ) {
    
    console.log( 'Failed to delete participant booking ' + id );

  }

}
