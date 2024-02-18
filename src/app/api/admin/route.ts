
import { createBookings } from "@/app/lib/data";
// export async function GET( request: Request ) {

//   const response = {
//     response: 'boooom'
//   };

//   return new Response( JSON.stringify( response ) );

// }

export async function POST( request: Request ) {

  const { dates, seats } = await request.json();

  const res = await createBookings( dates, seats );
 
  return Response.json({res: 'received'})
  
}