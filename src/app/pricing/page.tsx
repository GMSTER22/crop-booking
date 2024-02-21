import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Pricing',
};

export default function Page() {

  return (

    <div className="px-5 py-10 min-h-[600px]">

      <h1 className="mb-20 text-center">Pricing</h1>

      <div className="flex flex-col gap-12 items-center sm:flex-row justify-around">

        <div>

          <h2 className="max-w-fit mx-auto">Daily</h2>

          <div className="max-w-fit grid grid-cols-2 gap-x-6 gap-y-1">

            <span className="justify-self-end">Individual</span>

            <span className="justify-self-center">$40</span>

            <span className="justify-self-end">Group Rate for 5</span>

            <span className="justify-self-center">$180</span>

            <span className="justify-self-end">Group Rate for 6</span>

            <span className="justify-self-center">$200</span>

            <span className="justify-self-end">Group Rate for 7</span>

            <span className="justify-self-center">$220</span>

            <span className="justify-self-end">Group Rate for 8</span>

            <span className="justify-self-center">$240</span>

          </div>

        </div>

        <div>

          <h2 className="max-w-fit mx-auto">Weekend</h2>

          <div className="max-w-fit grid grid-cols-2 gap-x-6 gap-y-1">

            <span className="justify-self-end">Individual</span>

            <span className="justify-self-center">$100</span>

            <span className="justify-self-end">Group Rate for 5</span>

            <span className="justify-self-center">$450</span>

            <span className="justify-self-end">Group Rate for 6</span>

            <span className="justify-self-center">$500</span>

            <span className="justify-self-end">Group Rate for 7</span>

            <span className="justify-self-center">$550</span>

            <span className="justify-self-end">Group Rate for 8</span>

            <span className="justify-self-center">$600</span>

          </div>

        </div>

      </div>

    </div>

  )

}