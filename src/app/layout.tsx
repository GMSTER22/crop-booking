import type { Metadata } from "next";
import { Inter, Poppins, Montserrat, Roboto } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import logoImage from '../../public/logo.svg';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: ['500','600','700'] });
const montserrat = Montserrat({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"], weight: ['500', '700'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Scrapping with Sadie',
    default: 'Home',
  },
  description: 'Scrapping with Sadie allows scrapbook lovers to benefit from the experience of a 15 year old scrapbook designer experience by booking a day/weekend with Sadie to learn.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={`${roboto.className} max-w-7xl mx-auto`}>
        
        <header>

          <div className="py-8">

            <Image

              className="mx-auto"

              src={logoImage}

              alt="Scrapping With Sadie logo"

              width={150}

              height={150}

            />

          </div>

          <nav className="max-w-fit mx-auto my-8 flex justify-center flex-wrap gap-x-10 gax-y-5">

            <Link className="my-2 border-b-transparent hover:text-burnt-sienna border-b-2 hover:border-b-burnt-sienna transition-opacity duration-300" href='/'>Home</Link>

            <Link className="my-2 border-b-transparent hover:text-burnt-sienna border-b-2 hover:border-b-burnt-sienna transition-opacity duration-300" href='/booking'>Book Crop Session</Link>

            <Link className="my-2 border-b-transparent hover:text-burnt-sienna border-b-2 hover:border-b-burnt-sienna transition-opacity duration-300" href='/pricing'>Pricing</Link>

            <Link className="my-2 border-b-transparent hover:text-burnt-sienna border-b-2 hover:border-b-burnt-sienna transition-opacity duration-300" href='/login'>Login</Link>

          </nav>

        </header>

        <main>
          
          {children}
          
        </main>

        <footer>

          <div className="py-8 text-center text-white bg-black">

            <p>&copy;{new Date().getFullYear()} ScrappingWithSadie</p>

            {/* <p>Contact: <a href="mailto:scrappingwithsadie@gmail.com">scrappingwithsadie@gmail.com</a></p> */}

          </div>

        </footer>
        
      </body>
    </html>
  );
}
