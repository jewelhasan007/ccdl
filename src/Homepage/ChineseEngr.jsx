import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React, { useEffect, useState } from 'react';

const ChineseEngr = () => {

    const [engr, setEngr] = useState([])
    const loadEngr = async () =>{
        const engr = await fetch('/chinese_engr.json');
        const data = await engr.json()
        setEngr(data.chinese_engr)
   
    }
    useEffect(()=>{
        loadEngr()
    },[])
console.log(engr)

    return (
        <div>
            <h5 className='text-2xl mb-3 underline'>Commissioning Engineers Dispatch Schedule, tour & Status:</h5>
            <div>
                <Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Sl No</TableHead>
      <TableHead>Engineer's Name</TableHead>
      <TableHead>Start Time</TableHead>
      <TableHead className="text-right">Duration</TableHead>
      <TableHead>Requirement</TableHead>
      <TableHead>Commissioning Mode</TableHead>
      <TableHead>Remarks</TableHead>
      <TableHead>Site Visit</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
   {
    engr.map((engr, index)=>( <TableRow key={index}>
      <TableCell className="font-medium">{index}</TableCell>
      <TableCell>{engr.engr}</TableCell>
      <TableCell>{engr.date}</TableCell>
      <TableCell className="text-right">{engr.duration}</TableCell>
      <TableCell className="font-medium">{engr.requirement}</TableCell>
      <TableCell>{engr.mode}</TableCell>
      <TableCell>{engr.remarks}</TableCell>
      <TableCell className={`${engr.site_visit === 'Done' ? 'bg-green-100 text-green-800 font-bold' :
        engr.site_visit === 'Pending' ? 'bg-red-100 text-red-800 font-bold' : 
        'bg-gray-100 text-gray-800'
      }`}>{engr.site_visit}</TableCell>
    </TableRow>))
   }
  </TableBody>
</Table>
            </div>
        </div>
    );
};

export default ChineseEngr;