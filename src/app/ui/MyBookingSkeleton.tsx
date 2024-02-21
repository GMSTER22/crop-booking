'use client';

export type Participant = {
  id: number;
  name: string;
  email: string;
  date: Date;
}

// type FormValues = {
//   id: number | null;
//   name: string | null;
//   email: string | null;
// }


export default function MyBookingSkeleton() {

  const participant1 = {
    
    id: 1,
    
    name: 'John',
    
    email: 'johndoe@22@gmail.com'
  
  }

  const participant2 = {
    
    id: 1,
    
    name: 'John',
    
    email: 'johndoe@22@gmail.com'
  
  }

  const participants = {

    '2024-02-23': [ participant1, participant2 ],

    '2024-02-24': [ participant1, participant2 ],

    // '2024-02-25': [ participant1, participant2 ]

  };

  // const formInputInitialValues : FormValues = {

  //   id: null,

  //   name: null,

  //   email: null

  // }

  return (

    <div className="sm:basis-1/2 md:basis-2/3">

      {

        Object.keys( participants ).map( ( date ) => (

          <div key={date} className="mb-8 p-5 shadow-sm shadow-black rounded-md">

            <h2 className="h6 w-fit text-sm mb-4 bg-[#ccc] text-[#ccc] px-2 py-1 rounded-md">{ date }</h2>

            <div className="flex flex-wrap gap-x-6">

              {
              
                (participants[ date as keyof Object ] as unknown as []).sort( ( a: Participant, b: Participant ) => a.name.localeCompare( b.name ) ).map( ( { id, name, email } : { id: number, name: string, email: string } ) => (

                  <div className="[&:not(last-of-type)]:mb-5 shadow-sm shadow-black rounded-md p-2" key={id}>
                    
                    <div className="w-fit bg-[#ececec] text-[#ececec]">{ name }</div>

                    <div className="mb-2 bg-[#ececec] text-[#ececec]">{ email }</div>

                    <div className="flex gap-x-2">

                      <button className="px-2 py-1 text-xs rounded-md bg-[green] text-[green]" type="button">
                        
                        Update
                        
                      </button>

                      <button className="px-2 py-1 text-xs rounded-md bg-[red] text-[red]" type="button">
                        
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

  )

}