import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import ConsumpModal from './ConsumpModal';

const ConsumpFormModal = () => {
      const router = useRouter();
      const [showModal, setShowModal] = useState(false);
      const [formData, setFormData] = useState({
        date: "",
          loesche: "",
          grinding: "",
          project: "",
          production: "",
          type: "",
          time: ""
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    const handleRefresh = ()  =>{
    loadAll
    }
    
    
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        // You can replace this with any form submission logic (API call, etc.)
    
        const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/consumption/api`, {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "content-type": "application/json",
          },
        });
    
        const NextResponse = await resp?.json();
        console.log(NextResponse);
        if (NextResponse) {
          router.push("/consumption");
    
          toast.success(NextResponse?.message);
        }
    
        setShowModal(false); // Close the modal after submitting
        setFormData({
          date: "",
          loesche: "",
          grinding: "",
          project: "",
          production: "",
          type: "",
          time: ""
         
        });
      };
    
      const openModal = () => setShowModal(true);
      const closeModal = () => setShowModal(false);
    return (
          <div>
      <button className="btn btn-sm btn-outline btn-primary mr-3 animate-pulse text-blue-600" onClick={openModal}>
        Today Power Consumption
      </button>
<div>

</div>
      <ConsumpModal show={showModal} closeModal={closeModal}>
       <div className='text-center'> <h2 className="font-bold text-gray-500">Add the Consumption Data</h2></div>
        <hr />
        <form onSubmit={handleSubmit} className="mt-3 flex flex-col items-center gap-4 w-full max-w-md mx-auto">
          <div className='w-full'>
            <label className="floating-label w-full">
              <input
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                name="date"
                placeholder="Date "
                className="input input-md w-full"
              />
              <span>Date</span>
            </label>
          </div>
          <div className='w-full' >
            <label className="floating-label w-full ">
              <input
                type="text"
                value={formData.loesche}
                onChange={handleInputChange}
                name="loesche"
                placeholder="Mill Consumption(KW)-LOESCHE"
                className="input input-md w-full"
                required
              />
              <span>Mill Consumption(KW)-LOESCHE</span>
            </label>
          </div>
          <div className='w-full'>
            <label className="floating-label w-full">
              <input
                type="text"
                value={formData.grinding}
                onChange={handleInputChange}
                name="grinding"
                placeholder="Grinding Circuit Consumption(KW)"
                className="input input-md w-full"
              />
              <span>Grinding Circuit Consumption(KW)</span>
            </label>
          </div>
          <div className='w-full'>
            <label className="floating-label w-full">
              <input
                type="text"
                value={formData.project}
                onChange={handleInputChange}
                name="project"
                placeholder="Total Project Consumption(KW)"
                className="input input-md w-full"
              />
              <span>Total Project Consumption(KW)</span>
            </label>
          </div>
          <div className='w-full'>
            <label className="floating-label w-full">
              <input
                type="text"
                value={formData.production}
                onChange={handleInputChange}
                name="production"
                placeholder="Total Production(t)"
                className="input input-md w-full"
              />
              <span>Total Production(t)</span>
            </label>
          </div>
          <div className='w-full'>
             <label className="floating-label w-full">
              <select value={formData.type} name="type" onChange={handleInputChange} className="select w-full">
              <option  disabled={true}>Plesetype select the cement type </option>
                <option>PCC</option>
                <option>OPC</option>              
              </select>
              <span>Cement Type</span>
            </label>

          </div>
       <div className='w-full'>
            <label className="floating-label w-full">
              <input
                type="text"
                value={formData.time}
                onChange={handleInputChange}
                name="time"
                placeholder="Total Running Hour(hh:mm)"
                className="input input-md w-full"
              />
              <span>Total Running Hour(hh:mm)</span>
            </label>
          </div>

          <button type="submit" className='w-full'>ADD TASK</button>
        </form>
      </ConsumpModal>
    </div>
    );
};

export default ConsumpFormModal;