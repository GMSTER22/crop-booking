import { sql } from "@vercel/postgres";
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
