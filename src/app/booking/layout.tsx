import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Book a Crop Date',
};

export default function BookingsLayout({
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