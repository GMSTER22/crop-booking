
import { createBookings, deleteBookings } from "@/app/lib/data";

export async function POST( request: Request ) {

  const options = { 

    status: 201,

    statusText: 'success'

  }

  const { dates, seats } = await request.json();

  const response = await createBookings( dates, seats );
 
  return Response.json( 'Created', options );
  
}

export async function DELETE( request: Request ) {

  const options = { 

    status: 200,

    statusText: 'deleted'

  }

  const { id } = await request.json();

  const response = await deleteBookings( id );

  return new Response( 'Deleted!', options );

}
