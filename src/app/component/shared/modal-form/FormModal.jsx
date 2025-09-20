import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { getAllTask } from "@/Homepage/getAllTask";

const FormModal = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    section: "",
    status: "",
    tag: "",
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
useEffect(()=>{
  
},[])


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // You can replace this with any form submission logic (API call, etc.)

    const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/add-task/api`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "content-type": "application/json",
      },
    });

    const NextResponse = await resp?.json();
    console.log(NextResponse);
    if (NextResponse) {
      router.push("/");

      toast.success(NextResponse?.message);
    }

    setShowModal(false); // Close the modal after submitting
    setFormData({
      name: "",
      description: "",
      date: "",
      section: "",
      status: "",
      tag: "",
    });
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div>
      <button className="btn btn-sm btn-outline btn-primary mr-3" onClick={openModal}>
        Add Task
      </button>

      <Modal show={showModal} closeModal={closeModal}>
        <h2 className="font-bold text-gray-500">Task Description</h2>
        <hr />
        <form onSubmit={handleSubmit} className="mt-3">
          <div>
            <label className="floating-label">
              <input
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                name="name"
                placeholder="Task Name"
                className="input input-md"
                required
              />
              <span>Task Name</span>
            </label>
          </div>
          <div>
            <label className="floating-label">
              <input
                type="text"
                value={formData.description}
                onChange={handleInputChange}
                name="description"
                placeholder="Description"
                className="input input-md"
              />
              <span>Description</span>
            </label>
          </div>
          <div>
            <label className="floating-label">
              <input
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                name="date"
                placeholder="Date "
                className="input input-md"
              />
              <span>Date</span>
            </label>
          </div>
         
          <label className="floating-label">
              <select value={formData.section} name="section" onChange={handleInputChange} className="select">
              <option  disabled={true}>Plese select the section </option>
                <option>chmc</option>
                <option>civil</option>
                <option>email</option>
                <option>manpower</option>
                <option>mech</option>
                <option>miscellaneous</option>
                <option>note</option>
                <option>overall</option>
                <option>purchase</option>
                <option>reb</option>
                <option>substation</option>
                
              </select>
              <span>Section</span>
            </label>

          <div>
            <label className="floating-label">
              <input
                type="text"
                value={formData.tag}
                onChange={handleInputChange}
                name="tag"
                placeholder="Tag"
                className="input input-md"
              />
              <span>Tag</span>
            </label>
          </div>
          <div>
         
          <label className="floating-label">
              <select value={formData.status} name="status" onChange={handleInputChange} className="select">
                <option>Pending</option>
                <option>Done</option>
              </select>
              <span>Status</span>
            </label>
     
          </div>

          <button type="submit">ADD TASK</button>
        </form>
      </Modal>
    </div>
  );
};

export default FormModal;
