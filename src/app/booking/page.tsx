'use client';

import { useState, useEffect, EventHandler } from "react";
import { Metadata } from "next";
import { formatDate } from "../lib/utils";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/16/solid";
import Button from "../ui/Button";
import { useSession } from "next-auth/react";
import { Booking } from "../lib/definition";

// export const metadata: Metadata = {
//   title: 'Book A Session',
// };



export default function Page() {

  const { data: session } = useSession();

  const [ bookedDates, setBoookedDates ] = useState( [] as Booking[] );

  const [ pickedDates, setPickedDates ] = useState( [] as Booking[] );

  const [ dates, setDates ] = useState( 1 );

  const [ participants, setParticipants ] = useState( 1 );

  const [ dateFieldValidation, setDateFieldValidation ] = useState( false );

  useEffect( () => {

    const fetchBookings = async () => {

      const response = await fetch( 'api/bookings' );

      const bookings = await response.json();

      console.log( bookings, 'BOOKINGS' );

      setBoookedDates( bookings );
  
    }

    fetchBookings();

  }, [] );

  const decreaseDateInputs = () => setDates( previousValue => previousValue > 1 ?  previousValue - 1 : 1 );

  const increaseDateInputs = () => setDates( previousValue => previousValue + 1 );

  const decreaseParticipants = () => setParticipants( previousValue => previousValue > 1 ?  previousValue - 1 : 1 );

  const increaseParticipants = () => setParticipants( previousValue => previousValue + 1 );

  const addPickedDate = ( booking : Booking ) => {

    if ( pickedDates.find( ( { id } ) => +id === +booking.id ) ) return;

    setPickedDates( ( previousValue: Booking[] ) => [ ...previousValue, booking ] )

  };

  const removePickedDate = ( booking : Booking ) => setPickedDates( ( previousValue: Booking[] ) => previousValue.filter( item => item.id !== booking.id ) );

  function onDateChange( event: React.ChangeEvent<HTMLInputElement> ) {



  }

  function onPickDateButtonHandler() {

    console.log('');

  }

  async function onFormSubmit( event: React.FormEvent<HTMLFormElement> ) {

    event.preventDefault();

    if ( ! pickedDates.length ) return setDateFieldValidation( true );

    const target = event.target as HTMLFormElement;

    const formData = new FormData( target );

    // const data = {

    //   dates: Array( dates ).fill( undefined ).map( ( item, index ) => formData.get( `date-${++index}` ) ),
        
    //   seats: formData.get( 'seats' )

    // } 

    const participantList = Array( participants ).fill( undefined ).map( ( participant, index ) => {

      const name = formData.get( `name-${index+1}` );

      const email = formData.get( `email-${index+1}` );

      return [ name, email ];

    } );

    const participantListFinal = pickedDates.map( ( { id } ) => {

      return participantList.map( participant => [ ...participant, id, session?.user?.id ] )

    } )

    console.log( participantListFinal.flat() );

    // for (const value of formData.values()) {
    //   console.log( value );
    //   console.log( session?.user?.id );
    // }

    // console.log(pickedDates, 'dataaaa');

    // return;
    

    const options = {

      method: 'POST',

      headers: { 'Content-Type': 'application/json' },

      body: JSON.stringify( participantListFinal.flat() )

    }

    try {
      
      const response = await fetch( 'api/bookings', options );

      const data = await response.json();

      console.log( data, 'check data HERE' )

    } catch (error) {
      
    }

  }

  return (

    <div className="px-5 py-10">

      <h1 className="mb-20 text-center">Crop Dates</h1>

      <div className="mb-16 w-fit mx-auto">

        <div className="w-fit grid grid-cols-[100px_140px_50px] justify-items-center gap-x-3 py-2 text-[#6b7280] shadow-sm shadow-burnt-sienna">

          <div>Dates</div>

          <div>Seats Remaining</div>

          <div></div>

        </div>

        <ul>

          {

            bookedDates.map( ( { id, date, seats_available, seats_booked } ) => (

              <li key={id} className="w-fit grid grid-cols-[100px_140px_50px] justify-items-center items-center py-2 gap-x-3 shadow-sm shadow-burnt-sienna">

                <div>{ formatDate( new Date( date ) ) }</div>

                <div>{ `${seats_available - seats_booked}` }</div>

                <div className="px-4">

                  {/* <button className="mr-1" type="button" aria-label="remove picked dates" onClick={() => removePickedDate( { id, date, seats_available } )}>

                    <MinusCircleIcon className="h-5 w-5 text-[red] pointer-events-none" />

                  </button> */}

                  <button type="button" aria-label="add picked dates" onClick={() => addPickedDate( { id, date, seats_available, seats_booked } )}>

                    <PlusCircleIcon className="h-5 w-5 text-[green] pointer-events-none" />

                  </button>

                </div>

              </li>

            ) )

          }


        </ul>

      </div>

      <div>

        <form className="max-w-96 mx-auto p-5 shadow-xl shadow-burnt-sienna rounded-md sm:p-8" onSubmit={onFormSubmit}>

        <div className="mb-8">

          <div className="flex justify-between gap-x-1">

            { dates > 1 ? 'Dates' : 'Date' }

          </div>

          {

            pickedDates.length ?       

              pickedDates.map( ( { id, date, seats_available, seats_booked } ) => (

                <div key={id} className="grid mb-2">

                  <label className="row-start-1 col-start-1">
                    <input className="w-full p-2 focus:ring-burnt-sienna focus:border-burnt-sienna" type="text" name={`booking-${id}`} value={formatDate(new Date(date))} disabled />
                  </label>

                  <button className="row-start-1 col-start-1 justify-self-end z-10 mr-1" type="button" aria-label="remove picked dates" onClick={() => removePickedDate( { id, date, seats_available, seats_booked } )}>

                    <MinusCircleIcon className="h-5 w-5 text-[red] pointer-events-none" />

                  </button>

                </div>

              ) )

              :

              <div className="p-2 text-[#6b7280]">

                Pick Date(s) Above

              </div>

          }

          {

            ! pickedDates.length && dateFieldValidation ?

              <p className="text-sm text-[red]">

                Date selection required

              </p>

              :

              ''

          }


        </div>

        <div className="mb-10">

        <div className="flex justify-between gap-x-1">

          <span>{ participants > 1 ? 'Participants' : 'Participant' }</span>

          <div>

            <button className="mr-3" type="button" aria-label="decrease dates" onClick={decreaseParticipants}>

              <MinusCircleIcon className={`h-5 w-5 text-[red] pointer-events-none transition-opacity ${participants < 2 ? 'opacity-50' : ''}`} />

            </button>

            <button type="button" aria-label="increase dates" onClick={increaseParticipants}>

              <PlusCircleIcon className="h-5 w-5 text-[green] pointer-events-none" />

            </button>

          </div>

          </div>

          {              

            Array( participants ).fill( null ).map( ( participant: number, index: number ) => (

              <div key={++index} className="mb-4">

                <div className="mb-1">

                  <span className="flex justify-center items-center w-6 h-6 text-xs bg-[#ccc] text-black rounded-full">

                    {index + 1}

                  </span>

                </div>

                <label className="block mb-2">
                  <input className="w-full p-2 focus:ring-burnt-sienna focus:border-burnt-sienna" type="text" name={`name-${index + 1}`} placeholder='Participant Name' required />
                </label>

                <label >
                  <input className="w-full p-2 focus:ring-burnt-sienna focus:border-burnt-sienna" type="email" name={`email-${index + 1}`} placeholder="Participant Email" required />
                </label>

              </div>

            ) ) 

          }

        </div>

        <div className="text-center">

          <Button type="submit" cta="Book Dates" />

        </div>

        </form>

      </div>

    </div>

  )

}