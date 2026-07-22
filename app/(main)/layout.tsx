import type { Metadata } from "next";
import WrapperNav from "@/components/Home/Navbar/WrapperNav";
import Footer from "@/components/Home/Footer/Footer";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";


export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "TajwidQu",
  description: "Belajar tajwid berbasis kuis",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <WrapperNav />
      <main>
      {children}
      </main>
      <Footer />
    </>
  );
}
