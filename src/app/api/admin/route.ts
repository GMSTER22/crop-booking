
import { createBookings, deleteBookings } from "@/app/lib/data";

// export async function GET( request: Request ) {

//   const response = {
//     response: 'boooom'
//   };

//   return new Response( JSON.stringify( response ) );

// }

export async function POST( request: Request ) {

  const options = { 

    status: 201,

    statusText: 'success'

  }

  const { dates, seats } = await request.json();

  console.log( dates, 'POST RESPONSE' );

  const response = await createBookings( dates, seats );

  console.log(response, 'POST RESPONSE');
 
  return Response.json( 'Created', options );
  
}

export async function DELETE( request: Request ) {

  const options = { 

    status: 200,

    statusText: 'deleted'

  }

  const { id } = await request.json();

  console.log(id, 'REQUEST')

  const response = await deleteBookings( id );

  console.log(response, 'checkkkkkk')

  return new Response( 'Deleted!', options );

}
