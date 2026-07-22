import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import WrapperNav from "@/components/Home/Navbar/WrapperNav";
import Footer from "@/components/Home/Footer/Footer";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "TajwidQu",
  description: "Belajar tajwid berbasis kuis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} antialiased`}>
          <WrapperNav />
          {children}
          <Footer />
      </body>
    </html>
  );
}
