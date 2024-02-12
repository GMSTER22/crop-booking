import Image from "next/image";
import heroImage from '../../public/hero.jpeg';
import weekendCraft from '../../public/weekend-craft.jpeg';
import designer from '../../public/sadie.jpeg';
import workOne from '../../public/work-1.jpeg';
import workTwo from '../../public/work-2.jpeg';
import workThree from '../../public/work-3.jpeg';
import workFour from '../../public/work-4.jpeg';
import workFive from '../../public/work-5.jpeg';
import workSixth from '../../public/work-6.jpeg';
import Link from "next/link";
import ButtonLink from "./ui/ButtonLink";


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

            <ButtonLink cta="Book A Weekend" url="/booking" />

          </div>

        </div>

      </section>

      <section className="px-8 py-10 sm:px-10 sm:py-12 md:flex md:items-center md:gap-x-10">

        <div className="flex-1 basis-1/2 mb-10 md:mb-0">

          <h2 className="mb-5">What you get</h2>

          <p>

            During your session, you will learn how to use your cutting machines to maximize your experience using them as well as learn how to take Scrapbook Concierge Kit SVG's and cut them on your own! This is your opportunity to customize our kits them to fit your pictures perfectly; or not, it's up to you.

          </p>

        </div>

        <div className="flex-1 basis-1/2">

          <Image src={weekendCraft} alt="" />

        </div>

      </section>

      <section className="px-8 py-10 sm:px-10 sm:py-12 md:flex md:items-center md:gap-x-10 bg-medium-purple">

        <div className="flex-1 basis-1/2 mb-10 md:mb-0">

          <Image 
          
            className="rounded-full aspect-square object-cover" 
            
            src={designer} 
            
            width={300} 
            
            height={300} 
            
            alt="designer" 
            
          />

        </div>

        <div className="flex-1 basis-1/2 mb-10 md:mb-0">

          <h2 className="mb-5">I'm Sadie</h2>

          <p>

            I have been designing scrapbook layouts for over 10 years and has a special eye for colors and layouts. I, along with my mother started Scrapbook Concierge 10 years ago and has sold thousands of kits at crops, conventions and through e-commerce.

          </p>

        </div>

      </section>

      <section className="py-10 sm:py-12">

        <h2 className="mb-5 text-center">My Work</h2>

        <div className="grid grid-rows-1 grid-cols-1 gap-5 p-5 sm:grid-cols-2 lg:grid-cols-3">

          {

            [ workOne, workTwo, workThree, workFour, workFive, workSixth ].map( ( workImage, index ) => (

              <Image 

                key={index}
              
                src={workImage}
                
                alt=""
                
              />

            ) )

          }

        </div>

      </section>

    </>

  );

}
