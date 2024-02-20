
import { fetchUserByEmail } from "@/app/lib/data";

export async function GET( request: Request ) {

  const { email } = await request.json();

  const response = await fetchUserByEmail( email );

  const options = { 

    status: 200,

    statusText: 'success'

  }

  return new Response( JSON.stringify( response ), options );

}