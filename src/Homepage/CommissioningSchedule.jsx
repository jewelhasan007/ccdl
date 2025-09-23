import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React, { useEffect, useState } from 'react';

const CommissioningSchedule = () => {

     const [commissioning, setCommissioning] = useState([])
        const loadCom = async () =>{
            const com = await fetch('/comm_schedule.json');
            const data = await com.json()
            setCommissioning(data.com_schedule)
       
        }
        useEffect(()=>{
            loadCom()
        },[])

    return (
         <div>
            <h5 className='text-2xl mb-3 underline'>Commissioning Engineers Dispatch Schedule, tour & Status:</h5>
            <div>
                <Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Sl No</TableHead>
      <TableHead>Equipment Name</TableHead>
      <TableHead>Commissioning Start Date</TableHead>
      <TableHead >Finishing Date</TableHead>
      <TableHead>Engr's Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Vendor</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
   {
    commissioning.map((commissioning, index)=>( <TableRow key={index}>
      <TableCell className="font-medium">{index+1}</TableCell>
      <TableCell className={`${commissioning.status === 'Done' ? ' text-green-800 font-bold' :
        commissioning.status === 'Pending' ? ' text-red-800 font-bold' : 
        commissioning.status === 'Ongoing' ? ' text-blue-800 font-bold' : 
        'bg-white-100 text-black'
      }`}>{commissioning.equipment}</TableCell>
      <TableCell>{commissioning.start_date}</TableCell>
      <TableCell >{commissioning.finished_date}</TableCell>
      <TableCell className="font-medium">{commissioning.engr_name}</TableCell>
      <TableCell>{commissioning.email}</TableCell>
      <TableCell>{commissioning.vendor}</TableCell>
      <TableCell className={`${commissioning.status === 'Done' ? 'bg-green-100 text-green-800 font-bold' :
        commissioning.status === 'Pending' ? 'bg-red-100 text-red-800 font-bold' : 
        'bg-gray-100 text-gray-800'
      }`}>{commissioning.status}</TableCell>
    </TableRow>))
   }
  </TableBody>
</Table>
            </div>
        </div>
    );
};

export default CommissioningSchedule;