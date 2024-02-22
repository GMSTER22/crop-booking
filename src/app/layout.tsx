import type { Metadata } from 'next';
import { Inter, Poppins, Montserrat, Roboto } from 'next/font/google';
import Image from 'next/image';
import logoImage from '../../public/logo.svg';
import './globals.css';
import SessionProvider from './session/SessionProvider';
import { getServerSession } from 'next-auth';
import Navigation from './ui/Navigation';

// const inter = Inter({ subsets: ["latin"] });
// const poppins = Poppins({ subsets: ["latin"], weight: ['500','600','700'] });
// const montserrat = Montserrat({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"], weight: ['500', '700'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Scrapping with Sadie',
    default: 'Home',
  },
  description: 'Scrapping with Sadie allows scrapbook lovers to benefit from the experience of a 15 year old scrapbook designer experience by booking a day/weekend with Sadie to learn.',
}

export default async function RootLayout({

  children

}: Readonly<{

  children: React.ReactNode

}>) {

  const session = await getServerSession();

  return (

    <html lang="en" className="scroll-smooth">

      <SessionProvider session={session}>

        <body className={`${roboto.className} max-w-7xl mx-auto`}>
          
          <header>

            <div className="py-5">

              <Image

                className="mx-auto"

                src={logoImage}

                alt="Scrapping With Sadie logo"

                width={150}

                height={150}

              />

            </div>

            <Navigation />

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

      </SessionProvider>

    </html>

  );

}
