'use client';

import React, { useEffect, useState, useRef, Suspense } from "react";
import { formatDate } from "../lib/utils";
import Button from "../ui/Button";
import { getSession, useSession } from "next-auth/react";
import MyBookingSkeleton from "../ui/MyBookingSkeleton";
import { useRouter } from "next/navigation";
import UnauthenticatedUserMessage from "../ui/UnauthenticatedUserMessage";
import Link from "next/link";

export type Participant = {
  id: number;
  name: string;
  email: string;
  date: Date;
}

type FormValues = {
  id: number | null;
  name: string | null;
  email: string | null;
}

type Acc = {

  [date: string]: Participant[];

}

export default function Page() {

  const { status } = useSession();

  // const router = useRouter();

  const [ participants, setParticipants ] = useState( {} );

  const [ isParticipantsLoading, setIsParticipantsLoading ] = useState( true );

  const [ sessionId, setSessionId ] = useState( null );

  const formInputInitialValues : FormValues = {

    id: null,

    name: null,

    email: null

  }

  const [ formInputValues, setFormInputValues ] = useState( formInputInitialValues );

  const fetchUserBookings = async () => {

    const session = await getSession();

    try {

      const response = await fetch( `api/bookings/${session?.user?.id}` );

      const bookings = await response.json();

      const bookingsPerDate = bookings.reduce( ( acc: Acc, currentParticipantBooking: Participant ) => {

        const formattedDate : string = formatDate( new Date( currentParticipantBooking?.date ) );

        if ( acc.hasOwnProperty( formattedDate ) ) acc[ formattedDate ].push( currentParticipantBooking )

        else acc[ formattedDate ] = [ currentParticipantBooking ];

        return acc;

      }, {} );

      // console.log( bookingsPerDate );

      setIsParticipantsLoading( false );

      setParticipants( bookingsPerDate );

    } catch( error ) {

      console.log( error );

    }

  }

  useEffect( () => {

    if ( status === 'authenticated' ) fetchUserBookings();

  } );

  function onUpdateHandler( id: number, name: string, email: string ) {

    setFormInputValues( { id, name, email } );

  }

  async function onFormSubmit( event: React.FormEvent<HTMLFormElement> ) {

    event.preventDefault();

    const formData = new FormData( event.target as HTMLFormElement );

    const participantData = {

      id: formData.get( 'id' ),

      name: formData.get( 'name' ),

      email: formData.get( 'email' )

    }

    const options = {

      method: 'POST',

      headers: { 'Content-Type': 'application/json' },

      body: JSON.stringify( participantData )

    }

    const response = await fetch( `api/bookings/${sessionId}`, options );

    if ( response.ok ) {

      const data = await response.text();

      const target = event.target as HTMLFormElement;

      setFormInputValues( { id: null, name: null, email: null } );

      target.reset();

      fetchUserBookings();

    }

  } 

  async function onDeleteHandler( id: number ) {

    const options = {

      method: 'DELETE',

      headers: { 'Content-Type': 'application/json' },

      body: JSON.stringify( { id } )

    }

    try {
      
      const response = await fetch( `api/bookings/${id}`, options );

      if ( response.ok ) {

        const data = await response.text();

        // console.log( response, 'check response here' );

        // console.log( data, 'check data here' );

        fetchUserBookings();

      }

    } catch (error) {
      
      console.log( 'Failed to fetch data' );

    }

  }

  if ( status === 'authenticated' ) {

    return (

      <div className="px-5 py-10 min-h-[600px]">

        <h1 className="mb-20 text-center">My Bookings</h1>

        <div className="sm:flex sm:flex-row-reverse gap-x-8 sm:gap-x-10">

          <div className="mb-10 sm:basis-1/2 sm:mb-0 md:basis-1/3" >

            {

              Object.keys( participants ).length ?

                <form
                
                  className="p-5 shadow-xl shadow-black rounded-md sm:p-6"
                  
                  onSubmit={onFormSubmit}
                  
                >

                  <div className="hidden">

                    <label htmlFor="id">Id</label>

                    <input className="w-full p-2 focus:ring-burnt-sienna focus:border-burnt-sienna" type="number" name="id" id="id" defaultValue={formInputValues.id as number} />

                  </div>

                  <div className="mb-5">

                    <label htmlFor="name">Name</label>

                    <input className="w-full p-2 focus:ring-burnt-sienna focus:border-burnt-sienna" type="text" name="name" id="name" defaultValue={formInputValues.name as string} required />

                  </div>

                  <div className="mb-10">

                    <label htmlFor="email">Email</label>

                    <input className="w-full p-2 focus:ring-burnt-sienna focus:border-burnt-sienna" type="email" name="email" id="email" defaultValue={formInputValues.email as string} required />

                  </div>

                  <div className="text-center">

                    <Button type="submit" cta="Update" />

                  </div>

                </form>

                :

                ''

            }

          </div>

          {/* Participants */}
          {

            isParticipantsLoading ?

              <MyBookingSkeleton />

              :

              <div className="sm:basis-1/2 md:basis-2/3">

                {

                  Object.keys( participants ).length ?

                    Object.keys( participants )

                      .sort( ( participantA, participantB ) => new Date( participantA ).valueOf() - new Date( participantB ).valueOf() )
                    
                      .map( ( date: keyof Acc ) => (

                        <div key={date} className="mb-8 p-5 shadow-sm shadow-black rounded-md">

                          <h2 className="h6 w-fit text-sm mb-4 bg-[#ccc] px-2 py-1 rounded-md">{ date }</h2>

                          <div className="flex flex-wrap gap-x-6">

                            {
                            
                              (participants[ date as keyof Object ] as unknown as Participant[])
                              
                                .sort( ( a: Participant, b: Participant ) => a.name.localeCompare( b.name ) )
                                
                                .map( ( { id, name, email } : { id: number, name: string, email: string } ) => (

                                  <div className="[&:not(last-of-type)]:mb-5 shadow-sm shadow-black rounded-md p-2" key={id}>
                                    
                                    <div className="mb-1 capitalize">{ name }</div>

                                    <div className="mb-2">{ email }</div>

                                    <div className="flex gap-x-2">

                                      <button className="px-2 py-1 text-xs text-white rounded-md bg-[green]" type="button" onClick={() => onUpdateHandler( id, name, email )}>
                                        
                                        Update
                                        
                                      </button>

                                      <button className="px-2 py-1 text-xs text-white rounded-md bg-[red]" type="button" onClick={() => onDeleteHandler( id )}>
                                        
                                        Delete
                                        
                                      </button>

                                    </div>

                                  </div>

                              ) )
                            
                            }

                          </div>

                        </div>

                    ) )

                    :

                    <div className="text-center">

                      <p className="mb-8 py-3 text-sm text-center text-[red]">
                      
                        No Bookings
                        
                      </p>

                      <Link className="px-8 py-3 text-black bg-burnt-sienna rounded-3xl hover:text-burnt-sienna hover:bg-black transition-colors duration-300" href='/booking'>
        
                        Book A Crop Session Now
                        
                      </Link>

                    </div>

                }

              </div>

          }

        </div>

      </div>

    )

  } else {

    return <UnauthenticatedUserMessage />

  }

}