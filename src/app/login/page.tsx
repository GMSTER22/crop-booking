'use client';

import { signIn, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";

// import { authOptions } from "../api/auth/[...nextauth]/route";

type Provider = {

  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;

}

export default function Page() {

  const [ providers, setProviders ] = useState( [] as Provider[] );

  useEffect( () => {

    fetchProvider();
    
  }, [] );

  async function fetchProvider() {

    const providers = await getProviders() as unknown as Provider[];

    setProviders( providers );

  }
  

  return (

    <div className="px-2 py-10 sm:px-5  min-h-[600px]">

      <h1 className="mb-20 text-center">
        
        Login
        
      </h1>

      <div className="max-w-fit mx-auto flex flex-col gap-y-6">

        {

          Object.values( providers ).map( provider => (

            <div key={ provider?.id }>

              <button

                className="px-6 py-3 rounded-md font-bold text-black bg-burnt-sienna hover:text-burnt-sienna hover:bg-black transition-colors duration-150"

                type="button" 
                
                onClick={ () => signIn( provider.id, { callbackUrl: '/' }  ) }
                
              >

                Login With { provider?.name }

              </button>

            </div>
            
          ) )

        }
        
      </div>
    
    </div>

  )

}
