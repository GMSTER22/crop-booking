import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'My Bookings',
};

export default async function MyBookingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <>
    
      {children}
    
    </>

  )

}