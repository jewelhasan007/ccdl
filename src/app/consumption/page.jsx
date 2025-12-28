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
            <h1>Specific Power Consumption(KWh/t)</h1>
            <div className='text-end'>
                <ConsumpFormModal ></ConsumpFormModal>
            </div>

 {/* table */}
 <div className="overflow-x-auto ">
  <table className="table table-zebra text-[12px] ">
    {/* head */}
    <thead className='text-[12px] border-b-2'>
      <tr className='text-center'>
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
       <tr className='text-center border-b-1'>
       <th>{power.date}</th>
        <th>{power.loesche}</th>
        <th>{power.grinding}</th>
        <th>{power.project}</th>
        <th>{power.production}</th>
        <th>{power.type}</th>
        <th>{power.time}</th>
        <th className='bg-amber-200'>{(power.loesche / power.production).toFixed(2)}</th>
        <th className='bg-amber-200'>{(power.grinding / power.production).toFixed(2)}</th>
        <th className='bg-amber-200'>{(power.project / power.production).toFixed(2)}</th>
    
      </tr >
     ))}

    </tbody>
  </table>
</div>
   
        </div>
    );
};

export default page;