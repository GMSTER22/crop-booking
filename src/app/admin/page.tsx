'use client';

import { useState, useEffect } from "react";
import Button from "../ui/Button";
import { formatDate } from "../lib/utils";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/16/solid";

export default function Page() {

  const [ dates, setDates ] = useState( 1 );

  const [ bookedDates, setBoookedDates ] = useState( [] );

  useEffect( () => {

    const fetchBookings = async () => {

      const response = await fetch( 'api/bookings' );

      const bookings = await response.json();

      console.log( bookings, 'BOOKINGS' );

      setBoookedDates( bookings );
  
    }

    fetchBookings();

  }, [] )

  const decreaseDateInputs = () => setDates( previousValue => previousValue - 1 );

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

  }

  async function onFormSubmit( event: React.FormEvent<HTMLFormElement> ) {

    event.preventDefault();

    const target = event.target as HTMLFormElement;

    const formData = new FormData( target );

    const data = {

      dates: Array( dates ).fill( undefined ).map( ( item, index ) => formData.get( `date-${++index}` ) ),
        
      seats: formData.get( 'seats' )

    }

    // console.log(data, 'dataaaa');

    const options = {

      method: 'POST',

      headers: { 'Content-Type': 'application/json' },

      body: JSON.stringify( data )

    }

    try {
      
      const response = await fetch( 'api/admin', options );

      const data = await response.json();

      console.log( data, 'check data here' )

    } catch (error) {
      
    }

  }

  return (

    <div className="px-5 py-10">

      <h1 className="text-center">Admin</h1>

      <div>

        <div>

        </div>

        <div>

          <form className="max-w-96 mx-auto p-5 shadow-xl shadow-burnt-sienna rounded-md sm:p-8" onSubmit={onFormSubmit}>

            <div className="mb-5">

              <div className="flex justify-between gap-x-1">

                <span>{ dates > 1 ? 'Dates' : 'Date' }</span>

                <div>

                  <button className="mr-3" type="button" aria-label="decrease dates" onClick={decreaseDateInputs}>

                    <MinusCircleIcon className="h-5 w-5 text-[red] pointer-events-none" />

                  </button>

                  <button type="button" aria-label="increase dates" onClick={increaseDateInputs}>

                    <PlusCircleIcon className="h-5 w-5 text-[green] pointer-events-none" />

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

}
