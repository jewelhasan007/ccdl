"use client"
import React from 'react';
import Section from './Section';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

const Homepage = () => {
  const { data: session, status } = useSession();

  console.log("Admin checked from homepage=",  session?.user?.type)
    const handleToDo = async (event) => {
        event.preventDefault();
        const newTodo = {
          name: event.target.name.value,
          description: event.target.description.value,
          date: event.target.date.value,
          section: event.target.section.value,
          status: event.target.status.value,
        };
        console.log(newTodo);
        const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/todo/api`, {
          method: "POST",
          body: JSON.stringify(newTodo),
          headers: {
            "content-type": "application/json",
          },
        });
    
        const res = await resp?.json();
        toast.success(res?.message);
        event.target.reset();
      };
    return (
        <div className=' flex h-full mx-auto items-top justify-center ' >
        
        { session && session.user &&  session?.user?.type === "Admin" ?
        <Section ></Section> : <Image src='/bg-home.png' width={300} height={300} alt='image'></Image> }
        
        </div>
    );
};

export default Homepage;