'use client';

import { useState, useEffect } from "react";
import { formatDate } from "../lib/utils";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/16/solid";
import Button, { SmallButton } from "../ui/Button";
import { getSession, useSession } from "next-auth/react";
import { Booking } from "../lib/definition";
import { fetchBookings } from "../lib/data";
import { useRouter } from "next/navigation";
import CropDateSkeleton from "../ui/CropDatesSkeleton";
import UnauthenticatedUserMessage from "../ui/UnauthenticatedUserMessage";

// export const metadata: Metadata = {
//   title: 'Book A Session',
// };

export default function Page() {

  const router = useRouter();

  const { data: session, status } = useSession();

  const [ bookedDates, setBookedDates ] = useState( [] as Booking[] );

  const [ isBookedDatesLoading, setIsBookedDatesLoading ] = useState( true );

  const [ pickedDates, setPickedDates ] = useState( [] as Booking[] );

  const [ dates, setDates ] = useState( 1 );

  const [ participants, setParticipants ] = useState( 1 );

  const [ dateFieldValidation, setDateFieldValidation ] = useState( false );

  const [ bookedDatesFilterLimit, setBookedDatesFilterLimit ] = useState( 3 );

  useEffect( () => {

    const fetchBookings = async () => {

      const response = await fetch( 'api/bookings' );

      const bookings = await response.json();

      // console.log( bookings, 'BOOKINGS' );

      setIsBookedDatesLoading( false );

      setBookedDates( bookings );
  
    }

    if ( status === 'authenticated' ) fetchBookings();

  } );

  const decreaseParticipants = () => setParticipants( previousValue => previousValue > 1 ?  previousValue - 1 : 1 );

  const increaseParticipants = () => setParticipants( previousValue => previousValue + 1 );

  const addPickedDate = ( booking : Booking ) => {

    if ( pickedDates.find( ( { id } ) => +id === +booking.id ) ) return;

    setPickedDates( ( previousValue: Booking[] ) => [ ...previousValue, booking ] )

  };

  const removePickedDate = ( booking : Booking ) => setPickedDates( ( previousValue: Booking[] ) => previousValue.filter( item => item.id !== booking.id ) );

  function onShowMoreDatesHandler() {

    const remainingDatesShowed = bookedDates.length - bookedDatesFilterLimit;

    if ( remainingDatesShowed > 1 ) setBookedDatesFilterLimit( previousValue => previousValue + 1 );

    else setBookedDatesFilterLimit( bookedDates.length );

  }

  async function onFormSubmit( event: React.FormEvent<HTMLFormElement> ) {

    event.preventDefault();

    if ( ! pickedDates.length ) return setDateFieldValidation( true );

    const target = event.target as HTMLFormElement;

    const formData = new FormData( target );

    const participantList = Array( participants ).fill( undefined ).map( ( participant, index ) => {

      const name = formData.get( `name-${index+1}` );

      const email = formData.get( `email-${index+1}` );

      return [ name, email ];

    } );

    const participantListFinal = pickedDates.map( ( { id } ) => {

      return participantList.map( participant => [ ...participant, id, session?.user?.id ] )

    } )

    console.log( participantListFinal.flat() );    

    const options = {

      method: 'POST',

      headers: { 'Content-Type': 'application/json' },

      body: JSON.stringify( participantListFinal.flat() )

    }

    try {
      
      const response = await fetch( 'api/bookings', options );

      if ( response.ok ) {

        const data = await response.text();

        const target = event.target as HTMLFormElement;

        target.reset();

        // fetchBookings();
        router.push( '/my-bookings' );

      }

    } catch (error) {
      
      console.log( 'Failed to POST bookings' );

    }

  }

  if ( status === 'authenticated' ) {

    return (

      <div className="px-5 py-10 min-h-[600px]">

        <h1 className="mb-20 text-center">Crop Dates</h1>

        <div className="md:flex">

          {/* Dates Available */}
          <div className="mb-16 w-fit mx-auto md:w-auto md:basis-1/2">

            <div className="w-fit mx-auto grid grid-cols-[100px_140px_50px] justify-items-center gap-x-3 py-2 text-[#6b7280] shadow-sm shadow-black">

              <div>Dates</div>

              <div>Seats Remaining</div>

              <div></div>

            </div>

            {

              isBookedDatesLoading ?

                <CropDateSkeleton />

                :

                bookedDates.length ?

                  <ul>

                    {

                      bookedDates
                      
                        .filter( ( _, index ) => index < bookedDatesFilterLimit )
                          
                        .map( ( { id, date, seats_available, seats_booked } ) => (

                          <li key={id} className="w-fit mx-auto grid grid-cols-[100px_140px_50px] justify-items-center items-center py-2 gap-x-3 shadow-sm shadow-black">

                            <div>{ formatDate( new Date( date ) ) }</div>

                            <div>{ `${seats_available - seats_booked}` }</div>

                            <div className="px-4">

                              <button type="button" aria-label="add picked dates" onClick={() => addPickedDate( { id, date, seats_available, seats_booked } )}>

                                <PlusCircleIcon className="h-6 w-6 text-[green] pointer-events-none" />

                              </button>

                            </div>

                          </li>

                        ) )

                    }

                  </ul>

                  :

                  <p className="py-3 text-sm text-center text-[red]">
                    
                    No Dates Available at the moment
                    
                  </p>

            }

            <div className="my-3 text-center">

              {

                bookedDatesFilterLimit < bookedDates.length ?

                  <SmallButton type="button" cta="Show More Dates" onClickHandler={onShowMoreDatesHandler}></SmallButton>

                  :

                  ''

              }

            </div>

          </div>

          {/* Form */}
          <div className="md:basis-1/2">

            {

              bookedDates.length ?

                <form className="p-5 shadow-xl shadow-black rounded-md sm:p-8" onSubmit={onFormSubmit}>

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

                              <MinusCircleIcon className="h-6 w-6 text-[red] pointer-events-none" />

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

                    <button className="mr-2" type="button" aria-label="decrease dates" onClick={decreaseParticipants}>

                      <MinusCircleIcon className={`h-6 w-6 text-[red] pointer-events-none transition-opacity ${participants < 2 ? 'opacity-30' : ''}`} />

                    </button>

                    <button type="button" aria-label="increase dates" onClick={increaseParticipants}>

                      <PlusCircleIcon className="h-6 w-6 text-[green] pointer-events-none" />

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

                :

                ''

            }

          </div>

        </div>

      </div>

    )

  } else {

    return <UnauthenticatedUserMessage />

  }

}