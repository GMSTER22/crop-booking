
import { fetchUserBookings, updateParticipants, deleteParticipants } from "@/app/lib/data";

export async function GET( request: Request, { params }: { params: { id: number } } ) {

  const id = params.id;

  const response = await fetchUserBookings( id as unknown as number );

  const options = { 

    status: 200,

    statusText: 'success'

  }

  return new Response( JSON.stringify( response ), options );

}

export async function POST( request: Request ) {

  const participantData = await request.json();

  const res = await updateParticipants( participantData );

  const options = {

    status: 200,

    statusText: 'updated'

  }
 
  return Response.json( 'Updated', options );
  
}

export async function DELETE( request: Request, { params }: { params: { id: number } } ) {

  const options = { 

    status: 200,

    statusText: 'deleted'

  }

  const id = params.id;

  const response = await deleteParticipants( id );

  return new Response( 'Deleted!', options );

}

