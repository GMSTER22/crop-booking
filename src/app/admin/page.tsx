'use client';

import { useState, useEffect } from "react";
import Button, { SmallButton } from "../ui/Button";
import { formatDate } from "../lib/utils";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/16/solid";
import { CropDateAdminSkeleton } from "../ui/CropDatesSkeleton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import UnauthenticatedUserMessage from "../ui/UnauthenticatedUserMessage";

export default function Page() {

  const router = useRouter();

  const { status } = useSession();

  const [ dates, setDates ] = useState( 1 );

  const [ bookedDates, setBoookedDates ] = useState( [] );

  const [ isBookedDatesLoading, setIsBookedDatesLoading ] = useState( true );

  const [ bookedDatesFilterLimit, setBookedDatesFilterLimit ] = useState( 3 );

  const fetchBookings = async () => {

    const response = await fetch( 'api/bookings' );

    if ( response.ok ) {

      const bookings = await response.json();

      // console.log( bookings, 'BOOKINGS' );

      setIsBookedDatesLoading( false );

      setBoookedDates( bookings );

    }

  }

  useEffect( () => {

    if ( status === 'authenticated' ) fetchBookings();

  } );

  const decreaseDateInputs = () => setDates( previousValue => previousValue > 1 ?  previousValue - 1 : 1 );

  const increaseDateInputs = () => setDates( previousValue => previousValue + 1 );

  function onDateChange( event: React.ChangeEvent<HTMLInputElement> ) : void {

    const target : string = event.target.value;

    const currentDate = new Date();

    const selectedDate = new Date( target );

    const currentYear = currentDate.getFullYear();
    const selectedYear = selectedDate.getFullYear();

    const currentMonth = currentDate.getMonth() + 1;
    const selectedMonth = selectedDate.getMonth() + 1;

    const currentDay = currentDate.getDate();
    const selectedDay = selectedDate.getDate();

    if ( ( selectedYear > currentYear ) || ( selectedYear === currentYear && selectedMonth < currentMonth ) || ( selectedYear === currentYear && selectedMonth === currentMonth && selectedDay < currentDay ) ) {

      event.target.value = formatDate( currentDate );

    }

    // const isIdenticalDate = bookedDates.filter( ( { date } ) => {

    //   const currentIterationDate = new Date( date );

    //   console.log(date, currentIterationDate)

    //   console.log( selectedYear, currentIterationDate.getFullYear(), selectedYear === currentIterationDate.getFullYear() );

    //   console.log( selectedMonth, currentIterationDate.getMonth() + 1, selectedMonth === currentIterationDate.getMonth() + 1 );

    //   console.log( selectedDay, currentIterationDate.getDate(), selectedDay === currentIterationDate.getDate() );

    //   return (
        
    //     selectedYear === currentIterationDate.getFullYear()
        
    //     && 

    //     selectedMonth === currentIterationDate.getMonth() + 1

    //     &&

    //     selectedDay === currentIterationDate.getDate()
        
    //   )

    // } );

    // console.log( isIdenticalDate, 'id datesss' );

    // console.log( selectedDate );

  }

  function onShowMoreDatesHandler() {

    const remainingDatesShowed = bookedDates.length - bookedDatesFilterLimit;

    if ( remainingDatesShowed > 1 ) setBookedDatesFilterLimit( previousValue => previousValue + 1 );

    else setBookedDatesFilterLimit( bookedDates.length );

  }

  async function deleteCropDate( id : number ) {

    const options = {

      method: 'DELETE',

      headers: { 'Content-Type': 'application/json' },

      body: JSON.stringify( { id } )

    }

    try {
      
      const response = await fetch( 'api/admin', options );

      if ( response.ok ) {

        const data = await response.text();

        fetchBookings();

      }

    } catch (error) {
      
      console.log( 'Failed to fetch data' );

    }

  }

  async function onFormSubmit( event: React.FormEvent<HTMLFormElement> ) {

    event.preventDefault();

    const target = event.target as HTMLFormElement;

    const formData = new FormData( target );

    const data = {

      dates: Array( dates ).fill( undefined ).map( ( item, index ) => formData.get( `date-${++index}` ) ),
        
      seats: formData.get( 'seats' )

    }

    const options = {

      method: 'POST',

      headers: { 'Content-Type': 'application/json' },

      body: JSON.stringify( data )

    }

    try {
      
      const response = await fetch( 'api/admin', options );

      if ( response.ok ) {

        const data = await response.text();

        // console.log( data, 'check data here' );

        // console.log( event.target, 'target' );

        const target = event.target as HTMLFormElement;

        target.reset();

        fetchBookings();

      }

    } catch (error) {
      
      console.log( error );

    }

  }

  if ( status === 'authenticated' ) {

    return (
  
      <div className="px-2 py-10 sm:px-5  min-h-[600px]">
  
        <h1 className="mb-20 text-center">Admin</h1>
  
        <div className="md:flex">
  
          {/* Dates Available */}
          <div className="mb-16 w-fit mx-auto md:w-auto md:basis-1/2">
  
            <div className="w-fit mx-auto grid grid-cols-[100px_130px_80px] justify-items-center gap-x-3 py-2 text-[#6b7280] shadow-sm shadow-black">
  
              <div>Dates</div>
  
              <div>Seats Remaining</div>
  
              <div></div>
  
            </div>
  
            {
  
              isBookedDatesLoading ?
  
                <CropDateAdminSkeleton />
  
                :
  
                bookedDates.length ?
  
                  <ul>
  
                    {
  
                      bookedDates
                      
                        .filter( ( _, index ) => index < bookedDatesFilterLimit )
                          
                        .map( ( { id, date, seats_available, seats_booked } ) => (
  
                          <li key={id} className="w-fit mx-auto grid grid-cols-[100px_130px_80px] justify-items-center items-center py-2 gap-x-3 shadow-sm shadow-black">
  
                            <div>{ formatDate( new Date( date ) ) }</div>
  
                            <div>{ `${seats_available - seats_booked}` }</div>
  
                            <div className="px-4">
  
                              <button className="px-2 py-1 text-xs text-white rounded-md bg-[red] disabled:opacity-30" type="button" onClick={() => deleteCropDate( id )} disabled={ seats_booked > 0 }>
  
                                Delete
  
                              </button>
  
                            </div>
  
                          </li>
  
                        ) )
  
                    }
  
                  </ul>
  
                  :
  
                  <p className="py-3 text-sm text-center text-[red]">No Dates Available for customers to book</p>
  
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
          <div className="basis-1/2">
  
            <form className="p-5 shadow-xl shadow-black rounded-md sm:p-8" onSubmit={onFormSubmit}>
  
              <div className="mb-5">
  
                <div className="flex justify-between gap-x-1">
  
                  <span>{ dates > 1 ? 'Dates' : 'Date' }</span>
  
                  <div>
  
                    <button className="mr-3" type="button" aria-label="decrease dates" onClick={decreaseDateInputs}>
  
                      <MinusCircleIcon className="h-6 w-6 text-[red] pointer-events-none" />
  
                    </button>
  
                    <button type="button" aria-label="increase dates" onClick={increaseDateInputs}>
  
                      <PlusCircleIcon className="h-6 w-6 text-[green] pointer-events-none" />
  
                    </button>
  
                  </div>
  
                </div>
  
                {              
  
                  Array( dates ).fill( null ).map( ( date: number, index: number ) => (
  
                    <div key={++index} className="mb-2">
  
                      <label >
                        <input className="w-full p-2 focus:ring-burnt-sienna focus:border-burnt-sienna" type="date" name={`date-${++index}`} onChange={onDateChange} required />
                      </label>
  
                    </div>
  
                  ) ) 
  
                }
  
              </div>
  
              <div className="mb-10">
  
                <label htmlFor="seats">Seats Available</label>
  
                <input className="w-full p-2 focus:ring-burnt-sienna focus:border-burnt-sienna" type="number" min={1} name="seats" id="seats" required />
  
              </div>
  
              <div className="text-center">
  
                <Button type="submit" cta="Add Crop Date" />
  
              </div>
  
            </form>
  
          </div>
  
        </div>
  
      </div>
  
    )

  } else {

    return <UnauthenticatedUserMessage />

  }


}
