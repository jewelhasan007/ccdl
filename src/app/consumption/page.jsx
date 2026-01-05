"use client"
import React, { useEffect, useState } from 'react';
import ConsumpModal from './ConsumpFormModal';
import ConsumpFormModal from './ConsumpFormModal';
import { getAllPowerConsumptionDB } from './getAllPowerConsumption';

const page = () => {

  const [allPower, setAllPower] = useState([]);


  const loadPower = async () => {
    const tasks = await getAllPowerConsumptionDB();
    setAllPower(tasks.res);
  };

  useEffect(() => {
    loadPower();
  }, []);

  const mill = allPower.loesche
  const production = allPower.production
  const millKWh = production !== 0 ? mill / production : 0;
  console.log("mill=, production=, mill kwh=", mill,production, millKWh)
  console.log(allPower);


    return (
        <div className='m-3 p-3 '>
           <div className='text-end mb-3'>
                <ConsumpFormModal ></ConsumpFormModal>
            </div>

             <div className='text-center underline font-semibold'>
              <h1>CCDL Specific Power Consumption(KWh/t)</h1>
             </div>
           
    

 {/* table */}
 <div className="overflow-x-auto ">
  <table className="table table-zebra text-[12px] ">
    {/* head */}
    <thead className='text-[12px] border-b-2'>
      <tr className='text-center text-black'>
        <th >Date</th>
        <th >Vertical Roller <br />Mill Consumption <br />(KW)</th>
        <th >Grinding Circuit <br /> Consumption <br />(KW)</th>   
         <th >Total Project <br /> Consumption <br />(KW)</th>   
        <th >Total Production <br />(t)</th>
        <th >Cement Type <br />(PCC/OPC)</th>
        <th >Total Grinding Hour <br />(HH:MM)</th>
        
        <th className='bg-amber-200'>Mill Circuit <br />KWh/t</th>
        <th className='bg-amber-200'>Grinding Feed-to-SILO<br />KWh/t</th>
        <th className='bg-amber-200'>Total Project <br />KWh/t</th>
      </tr>
    </thead>
    
    <tbody>
      {/* row 1 */}
     {allPower.map((power, index)=>(
       <tr className='text-center border-b-1' key={index}>
       <th>{power.date}</th>
        <th className='text-gray-500'>{power.loesche}</th>
        <th className='text-gray-500'>{power.grinding}</th>
        <th className='text-gray-500'>{power.project}</th>
        <th className='text-gray-500'>{power.production}</th>
        <th className='text-gray-500'>{power.type}</th>
        <th className='text-gray-500'>{power.time}</th>
        <th className='bg-amber-200'>{(power.loesche / power.production).toFixed(2)}</th>
        <th className='bg-amber-200'>{(power.grinding / power.production).toFixed(2)}</th>
        <th className='bg-amber-200'>{(power.project / power.production).toFixed(2)}</th>
    
      </tr >
     ))}

    </tbody>
  </table>
  <div className='mt-5 text-gray-400'>
    <h2>Ref: </h2>
    <div>Specific Power Consumption (KWh/t) * of Vertical
Roller Mill : 18.9 kWh/t</div>
    <div>Specific Power Consumption (KWh/t) * for grinding
circuit (Mill feeding to cement silo feeding, excluding
coal mil, HGG system) 30.5 kWh/t</div>

  </div>
</div>
   
        </div>
    );
};

export default page;