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

      <Link className={`my-2 border-b-transparent hover:text-burnt-sienna border-b-2 hover:border-b-burnt-sienna transition-opacity duration-300 ${pathname === '/' && 'border-b-burnt-sienna text-burnt-sienna'}`} href='/'>
        
        Home
        
      </Link>

      <Link className={`my-2 border-b-transparent hover:text-burnt-sienna border-b-2 hover:border-b-burnt-sienna transition-opacity duration-300 ${pathname === '/booking' && 'border-b-burnt-sienna text-burnt-sienna'}`} href='/booking'>
        
        Book Crop Session
        
      </Link>

      <Link className={`my-2 border-b-transparent hover:text-burnt-sienna border-b-2 hover:border-b-burnt-sienna transition-opacity duration-300 ${pathname === '/my-bookings' && 'border-b-burnt-sienna text-burnt-sienna'}`} href='/my-bookings'>
        
        My Bookings
        
      </Link>

      <Link className={`my-2 border-b-transparent hover:text-burnt-sienna border-b-2 hover:border-b-burnt-sienna transition-opacity duration-300 ${pathname === '/admin' && 'border-b-burnt-sienna text-burnt-sienna'}`} href='/admin'>
        
        Admin
        
      </Link>

      <Link className={`my-2 border-b-transparent hover:text-burnt-sienna border-b-2 hover:border-b-burnt-sienna transition-opacity duration-300 ${pathname === '/pricing' && 'border-b-burnt-sienna text-burnt-sienna'}`} href='/pricing'>
        
        Pricing
        
      </Link>

      {

        status === 'authenticated' ?

          <Link className={`my-2 border-b-transparent hover:text-burnt-sienna border-b-2 hover:border-b-burnt-sienna transition-opacity duration-300 ${pathname === '/logout' && 'border-b-burnt-sienna text-burnt-sienna'}`} href='/logout' onClick={onLogoutClickHandler}>
            
            Logout
            
          </Link>

          :

          <Link className={`my-2 border-b-transparent hover:text-burnt-sienna border-b-2 hover:border-b-burnt-sienna transition-opacity duration-300 ${pathname === '/login' && 'border-b-burnt-sienna text-burnt-sienna'}`} href='/login'>
            
            Login
            
          </Link>

      }

    </nav>

  )

}