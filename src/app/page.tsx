import Image from "next/image";
import heroImage from '../../public/hero.jpeg';
import Link from "next/link";


export default function Home() {

  return (

    <>
      
      <section className="grid min-h-[450px]">
      
        <div className="relative row-start-1 col-start-1">

          <Image
          
            className="object-cover"
          
            src={heroImage} 

            alt=""

            fill
            
          />

          <div className="absolute w-full h-full bg-gradient-to-r from-[rgba(0,0,0,0.7)] to-[rgba(0,0,0,0.7)]"></div>

        </div>

        <div className="row-start-1 col-start-1 z-10 self-center">

          <h1 className="text-white text-center">
            
            Unleash Your Creativity

            <br />

            Craft Your Memories
            
          </h1>

          <div className="text-center">

            <Link className="px-8 py-3 text-white bg-burnt-sienna rounded-3xl hover:text-burnt-sienna hover:bg-white transition-colors duration-300" href="/booking">Book A Weekend</Link>

          </div>

        </div>

      </section> 

    </>

  );

}
