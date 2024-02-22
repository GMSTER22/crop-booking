
import { fetchBookings, createParticipants } from "@/app/lib/data";

export async function GET( request: Request ) {

  const response = await fetchBookings();

  const options = { 

    status: 200,

    statusText: 'success'

  }

  return new Response( JSON.stringify( response ), options );

}

export async function POST( request: Request ) {

  const participants = await request.json();

  const res = await createParticipants( participants );

  const options = { 

    status: 201,

    statusText: 'created'

  }
 
  return Response.json( 'Created', options );
  
}
