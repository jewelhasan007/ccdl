import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import React, { useEffect, useState } from 'react';

const ChmcCosting = () => {
    
        const [chmcPrice, setChmcPrice] = useState([])
        const loadPrices = async () =>{
            const prices = await fetch('/chmc_prices.json');
            const data = await prices.json()
            setChmcPrice(data.prices)
       
        }
        useEffect(()=>{
            loadPrices()
        },[])

    return (
         <div>
            <h5 className='text-2xl mb-3 underline'>CHMC Damaged Products with Costing 2025:</h5>
            <div>
                <Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Sl No</TableHead>
      <TableHead>Item Name</TableHead>
      <TableHead>Description</TableHead>
      <TableHead className="text-right">Delivery Date</TableHead>
      <TableHead>Delivery method</TableHead>
      <TableHead>Received date</TableHead>
        <TableHead>Unit Price</TableHead>
      <TableHead>Total Quantity</TableHead>
      <TableHead>Unit Price</TableHead>
      <TableHead>Total Price</TableHead>
       <TableHead>Currency</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
   {
    chmcPrice.map((pri, index)=>( <TableRow key={index}>
      <TableCell className="font-medium">{index+1}</TableCell>
      <TableCell >{pri.title}</TableCell>
      <TableCell>{pri.description}</TableCell>
      <TableCell className="text-right">{pri.delivery_date}</TableCell>
      <TableCell className="font-medium">{pri.delivery_method}</TableCell>
      <TableCell>{pri.received_date}</TableCell>
      <TableCell>{pri.unit_price}</TableCell>
      <TableCell>{pri.quantity}</TableCell>
        <TableCell>{pri.unit_price}</TableCell>
        <TableCell>{pri.total_price}</TableCell>
        <TableCell>{pri.currency}</TableCell>
    </TableRow>))
   }
  </TableBody>
</Table>
            </div>
        </div>
    );
};

export default ChmcCosting;