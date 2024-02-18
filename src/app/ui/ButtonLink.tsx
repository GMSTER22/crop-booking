import Link from "next/link";

export default function ButtonLink( { cta, url } : { cta: string, url: string } ) {

  return (

    <Link className="px-8 py-3 text-black bg-burnt-sienna rounded-3xl hover:text-burnt-sienna hover:bg-black transition-colors duration-300" href={url}>

      {cta}

    </Link>

  )

}