import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./component/shared/Navbar";
import Footer from "./component/shared/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import AuthProvider from "@/lib/AuthProvider";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CCDL EE",
  description: "CCDL EE Internal Use",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <AuthProvider>
        <Navbar></Navbar>
        <ToastContainer />
        {children}
        <Footer></Footer>
        </AuthProvider>
      </body>
 

    </html>
  );
}
