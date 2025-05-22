import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Authorize from "@/components/Authorize";
import { ToastContainer } from "react-toastify";
import 'mapbox-gl/dist/mapbox-gl.css';

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Приложение паводков",
  description: "Научно-Инновационный Центр Big Data and Blockchain Technologies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} antialiased`}
      >

        <ToastContainer position="bottom-right" />

        <Authorize>
          {children}
        </Authorize>
      </body>
    </html>
  );
}
