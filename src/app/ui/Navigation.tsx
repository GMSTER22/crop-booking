'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export default function Navigation() {

  const { status } = useSession();

  const pathname = usePathname();

  function onLogoutClickHandler( event: React.MouseEvent<HTMLAnchorElement> ) : void {

    event.preventDefault();

    signOut( { callbackUrl: '/' }  );

  }
  
  return (

    <nav className="max-w-fit mx-auto my-5 flex justify-center flex-wrap gap-x-10 gax-y-5">

      <Link className={`my-2 border-b-transparent font-bold hover:text-medium-purple border-b-2 hover:border-b-medium-purple transition-opacity duration-300 ${pathname === '/' && 'text-medium-purple'}`} href='/'>
        
        Home
        
      </Link>

      <Link className={`my-2 border-b-transparent hover:text-medium-purple border-b-2 hover:border-b-medium-purple transition-opacity duration-300 ${pathname === '/booking' && 'text-medium-purple'}`} href='/booking'>
        
        Book Crop Session
        
      </Link>

      <Link className={`my-2 border-b-transparent hover:text-medium-purple border-b-2 hover:border-b-medium-purple transition-opacity duration-300 ${pathname === '/my-bookings' && 'text-medium-purple'}`} href='/my-bookings'>
        
        My Bookings
        
      </Link>

      <Link className={`my-2 border-b-transparent hover:text-medium-purple border-b-2 hover:border-b-medium-purple transition-opacity duration-300 ${pathname === '/admin' && 'text-medium-purple'}`} href='/admin'>
        
        Admin
        
      </Link>

      <Link className={`my-2 border-b-transparent hover:text-medium-purple border-b-2 hover:border-b-medium-purple transition-opacity duration-300 ${pathname === '/pricing' && 'text-medium-purple'}`} href='/pricing'>
        
        Pricing
        
      </Link>

      {

        status === 'authenticated' ?

          <Link className={`my-2 border-b-transparent hover:text-medium-purple border-b-2 hover:border-b-medium-purple transition-opacity duration-300 ${pathname === '/logout' && 'text-medium-purple'}`} href='/logout' onClick={onLogoutClickHandler}>
            
            Logout
            
          </Link>

          :

          <Link className={`my-2 border-b-transparent hover:text-medium-purple border-b-2 hover:border-b-medium-purple transition-opacity duration-300 ${pathname === '/login' && 'text-medium-purple'}`} href='/login'>
            
            Login
            
          </Link>

      }

    </nav>

  )

}