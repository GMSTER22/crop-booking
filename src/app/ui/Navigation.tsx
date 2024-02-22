'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Navigation() {

  const { status } = useSession();

  function onLogoutClickHandler( event: React.MouseEvent<HTMLAnchorElement> ) : void {

    event.preventDefault();

    signOut( { callbackUrl: '/' }  );

  }
  
  return (

    <nav className="max-w-fit mx-auto my-5 flex justify-center flex-wrap gap-x-10 gax-y-5">

      <Link className="my-2 border-b-transparent hover:text-burnt-sienna border-b-2 hover:border-b-burnt-sienna transition-opacity duration-300" href='/'>
        
        Home
        
      </Link>

      <Link className="my-2 border-b-transparent hover:text-burnt-sienna border-b-2 hover:border-b-burnt-sienna transition-opacity duration-300" href='/booking'>
        
        Book Crop Session
        
      </Link>

      <Link className="my-2 border-b-transparent hover:text-burnt-sienna border-b-2 hover:border-b-burnt-sienna transition-opacity duration-300" href='/my-bookings'>
        
        My Bookings
        
      </Link>

      <Link className="my-2 border-b-transparent hover:text-burnt-sienna border-b-2 hover:border-b-burnt-sienna transition-opacity duration-300" href='/admin'>
        
        Admin
        
      </Link>

      <Link className="my-2 border-b-transparent hover:text-burnt-sienna border-b-2 hover:border-b-burnt-sienna transition-opacity duration-300" href='/pricing'>
        
        Pricing
        
      </Link>

      {

        status === 'authenticated' ?

          <Link className="my-2 border-b-transparent hover:text-burnt-sienna border-b-2 hover:border-b-burnt-sienna transition-opacity duration-300" href='/logout' onClick={onLogoutClickHandler}>
            
            Logout
            
          </Link>

          :

          <Link className="my-2 border-b-transparent hover:text-burnt-sienna border-b-2 hover:border-b-burnt-sienna transition-opacity duration-300" href='/login'>
            
            Login
            
          </Link>

      }

    </nav>

  )

}