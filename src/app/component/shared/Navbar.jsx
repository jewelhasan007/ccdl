"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { navItemsDB } from "./navItems";
import { toast } from "react-toastify";
import FormModal from "./modal-form/FormModal";
import Profile from "./Profile";
import { useSession } from "next-auth/react";
import NavbarUser from "./NavbarUser";


const Navbar = () => {
  // const session = useSession();
  const { data: session, status } = useSession();
  console.log("session status no login", session?.status)
  const pathname = usePathname();
  const router = useRouter();
  const activeColor = "#0070f3";
  const [modalClose, setModalClose] = useState(false);
  const [allSections, setAllSections] = useState([]);
useEffect(()=>{
  if(status === "unauthenticated" & pathname !== "/login"){router.push("/login")}
},[status, pathname, router])
useEffect(()=>{
  if(status === "authenticated" & session?.user?.type === "User" & pathname !== "/consumption"){router.push("/consumption")}
},[status, pathname, router])

  useEffect(() => {
    const loadSections = async () => {
      const sections = await navItemsDB();
      setAllSections(sections.services);
    };
    loadSections();
  }, []);

  const userMenu = allSections.filter(menu => menu.title === "Power Consumption(KWh/t)")

  return (
    <div className="navbar bg-gray-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
         {          
         status === "authenticated" && session.user.type === "Admin" ?
        <>
        { allSections?.map((item) => (
          <li key={item.path}>
            <Link
              style={{
                color: pathname === `${item.path}` ? activeColor : "black",
                textDecoration:
                  pathname === `${item.path}` ? "underline" : "none",
              }}
              className="font-bold m-3 hover:text-primary"
              href={item.path}
              key={item.path}
            >
              {item.title}
            </Link>
          </li>
        ))} </> :  <> 
      
 {status === "unauthenticated" ? (
        <p>Login</p>
      ) : (
        <>{ userMenu?.map((item) => (
          <li key={item.path}>
            <Link
              style={{
                color: pathname === `${item.path}` ? activeColor : "black",
                textDecoration:
                  pathname === `${item.path}` ? "underline" : "none",
              }}
              className="font-bold m-3 hover:text-primary"
              href={item.path}
              key={item.path}
            >
              {item.title}
            </Link>
          </li>
        ))}
        </>
      )}

         </> }

           
          </ul>
        </div>
       <button className="btn  text-white bg-[url('/cement-logo.png')] bg-cover bg-center"> <Link href="/"></Link></button>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu-sm menu-horizontal px-1 ">
        { status === "authenticated" && session.user.type === "Admin" ?
        <>
        {allSections?.map((item) => (
          <li key={item.path}>
            <Link
              style={{
                color: pathname === `${item.path}` ? activeColor : "black",
                textDecoration:
                  pathname === `${item.path}` ? "underline" : "none",
              }}
              className="font-bold mt-2 hover:text-primary"
              href={item.path}
              key={item.path}
            >
              {item.title}
            </Link>
          </li>
        ))} <div><FormModal ></FormModal></div> </> : <> 
      
 {status === "unauthenticated" ? (
        <p>Login</p>
      ) : (
        <>{ userMenu?.map((item) => (
          <li key={item.path}>
            <Link
              style={{
                color: pathname === `${item.path}` ? activeColor : "black",
                textDecoration:
                  pathname === `${item.path}` ? "underline" : "none",
              }}
              className="font-bold m-3 hover:text-primary"
              href={item.path}
              key={item.path}
            >
              {item.title}
            </Link>
          </li>
        ))}
        </>
      )}

         </> } 
        </ul>
      </div>

      <div className="navbar-end">
      
{/* Add Modal Form*/}


    { !session ? 
   <Link href={'/login'}><button className="btn btn-sm btn-primary">Login</button></Link> 
   : 
   <Profile></Profile>
  }  

        {/* Login Button */}
        <div>
        {/* <button className="btn btn-sm btn-outline btn-primary"> <Link href="/">Login</Link></button> */}
        </div>
      </div>
    
    </div>
  );
};

export default Navbar;
