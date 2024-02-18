
import { fetchBookings, createParticipants } from "@/app/lib/data";

export async function GET( request: Request ) {

  const response = await fetchBookings();

  // console.log(response, 'checkkkkkk')

  return new Response( JSON.stringify( response ) );

}

export async function POST( request: Request ) {

  const participants = await request.json();

  console.log( participants, 'body' );

  const res = await createParticipants( participants );

  const options = { 

    status: 200,

    statusText: 'success'

  }
 
  return Response.json( options );
  
}
