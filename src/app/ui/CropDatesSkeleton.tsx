
import { formatDate } from "../lib/utils";
import { PlusCircleIcon } from "@heroicons/react/16/solid";

const bookedDates = [

  {
    id: 1,
    date: '2024-02-01',
    seats_available: 8,
    seats_booked: 3
  },

  {
    id: 2,
    date: '2024-02-02',
    seats_available: 8,
    seats_booked: 4
  },

  {
    id: 3,
    date: '2024-02-01',
    seats_available: 8,
    seats_booked: 3
  },

]

export default function CropDateSkeleton() {

  return (

    <ul>

      {

        bookedDates
            
          .map( ( { id, date, seats_available, seats_booked } ) => (

            <li key={id} className="w-fit mx-auto grid grid-cols-[100px_140px_50px] justify-items-center items-center py-2 gap-x-3 shadow-sm shadow-black">

              <div className="text-[#ececec] bg-[#ececec]">{ formatDate( new Date( date ) ) }</div>

              <div className="text-[#ececec] bg-[#ececec]">{ `${seats_available - seats_booked}` }</div>

              <div className="px-4">

                <button type="button" aria-label="add picked dates">

                  <PlusCircleIcon className="h-6 w-6 text-[green] pointer-events-none" />

                </button>

              </div>

            </li>

          ) )

      }

    </ul>

  )

}

export function CropDateAdminSkeleton() {

  return (

    <ul>

      {

        bookedDates
            
          .map( ( { id, date, seats_available, seats_booked } ) => (

            <li key={id} className="w-fit mx-auto grid grid-cols-[100px_130px_80px] justify-items-center items-center py-2 gap-x-3 shadow-sm shadow-black">

              <div className="text-[#ececec] bg-[#ececec]">{ formatDate( new Date( date ) ) }</div>

              <div className="text-[#ececec] bg-[#ececec]">{ `${seats_available - seats_booked}` }</div>

              <div className="px-4">

                <button className="px-2 py-1 text-xs rounded-md bg-[red] text-[red]" type="button">

                  Delete

                </button>

              </div>

            </li>

          ) )

      }

    </ul>

  )

}