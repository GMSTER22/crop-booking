'use client';

import React, { useEffect, useState, useRef } from "react";
import { formatDate } from "../lib/utils";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/16/solid";
import Button, { SmallButton } from "../ui/Button";
import { getSession, useSession } from "next-auth/react";
import { Booking } from "../lib/definition";

export type Participant = {
  id: number;
  name: string;
  email: string;
  date: Date;
}


export default function Page() {

  const [ participants, setParticipants ] = useState( {} );

  const formInputInitialValues = {

    id: undefined,

    name: undefined,

    email: undefined

  }

  const [ formInputValues, setFormInputValues ] = useState( formInputInitialValues );

  const formRef = useRef<HTMLFormElement>( null );

  const fetchUserBookings = async () => {

    const session = await getSession();

    console.log( session, 'SESSION HERE' );

    const response = await fetch( `api/bookings/${session?.user?.id}` );

    const bookings = await response.json();

    type Acc = {
      [date: string]: Participant[];
    }

    const bookingsPerDate = bookings.reduce( ( acc: Object, currentParticipantBooking: Participant ) => {

      const formattedDate = formatDate( new Date( currentParticipantBooking?.date ) );

      // console.log( formattedDate, typeof formattedDate );

      // console.log( acc );

      if ( acc.hasOwnProperty( formattedDate ) ) acc[ formattedDate as keyof Acc ].push( currentParticipantBooking );

      else acc[ formattedDate as keyof Acc ] = [ currentParticipantBooking ];

      return acc;

    }, {} );

    console.log( bookingsPerDate );

    setParticipants( bookingsPerDate );

  }

  useEffect( () => {

    fetchUserBookings();

  }, [] );

  function onUpdateHandler( id: number, name: string, email: string ) {

    setFormInputValues( { id, name, email } );

  }

  async function onFormSubmit( event: React.FormEvent<HTMLFormElement> ) {

    event.preventDefault();

    const formData = new FormData( event.target as HTMLFormElement );

    const data = {

      id: formData.get( 'id' ),

      name: formData.get( 'name' ),

      email: formData.get( 'email' )

    }

    console.log( data );

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

        console.log( response, 'check response here' );

        console.log( data, 'check data here' );

        fetchUserBookings();

      }

    } catch (error) {
      
      console.log( 'Failed to fetch data' );

    }

  }

  return (

    <div className="px-5 py-10">

      <h1 className="mb-20 text-center">My Bookings</h1>

      <div className="sm:flex sm:flex-row-reverse gap-x-8 sm:gap-x-10">

        <div className="mb-10 sm:basis-1/2 sm:mb-0 md:basis-1/3" >

          {/* Form */}
          <form ref={formRef} className="p-5 shadow-xl shadow-black rounded-md sm:p-6">

            <div className="">

              <label htmlFor="id">Id</label>

              <input className="w-full p-2 focus:ring-burnt-sienna focus:border-burnt-sienna" type="number" name="id" id="id" value={formInputValues.id} />

            </div>

            <div className="mb-5">

              <label htmlFor="name">Name</label>

              <input className="w-full p-2 focus:ring-burnt-sienna focus:border-burnt-sienna" type="text" name="name" id="name" value={formInputValues.name} required />

            </div>

            <div className="mb-10">

              <label htmlFor="email">Email</label>

              <input className="w-full p-2 focus:ring-burnt-sienna focus:border-burnt-sienna" type="email" name="email" id="email" value={formInputValues.email} required />

            </div>

            <div className="text-center">

              <Button type="submit" cta="Update" />

            </div>

          </form>

        </div>

        {/* Participants */}
        <div className="sm:basis-1/2 md:basis-2/3">

          {

            Object.keys( participants ).map( ( date ) => (

              <div key={date} className="mb-8 p-5 shadow-sm shadow-black rounded-md">

                <h2 className="h6 w-fit text-sm mb-4 bg-[#ccc] px-2 py-1 rounded-md">{ date }</h2>

                <div className="flex flex-wrap gap-x-6">

                  {
                  
                    participants[ date ].sort( ( a: Participant, b: Participant ) => a.name.localeCompare( b.name ) ).map( ( { id, name, email } : { id: number, name: string, email: string } ) => (

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

          }

        </div>

      </div>

    </div>

  )

}