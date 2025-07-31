import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Api from "../../services/Api";

const CreateJobCard = () => {

  const navigate = useNavigate();
  const [mechanics, setMechanics] = useState([]);
  const [formData, setFormData] = useState({

    customerName: "",
    contact: "",
    email: "",
    bikeModel: "",
    bikeNumber: "",
    problemDescription: "",
    assignedMechanic: "",
    esstimateDeliveryDate: "",
    jobStatus: "pending",
    partsUsed: [{ partName: "", quantity: 1, price: 0 }],
    service: [{ serviceType: "", serviceCharges: 0 }]
  });

  const fetchMechanics = async () => {
    try {
      const token = localStorage.getItem("token"); // or sessionStorage if you store it there

      const response = await Api.get("/staff/mechanic", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMechanics(response.data);
    } catch (error) {
      console.error("Error loading mechanics", error);
    }
  };


  useEffect(() => {
    fetchMechanics();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;       
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (index, type, field, value) => {
    setFormData(prev => {
      const updated = [...prev[type]];
      updated[index][field] = value;
      return { ...prev, [type]: updated };
    });
  };

  const addArrayItem = (type) => {
    const newItem = type === "partsUsed"
      ? { partName: "", quantity: 1, price: 0 }
      : { serviceType: "", serviceCharges: 0 };

    setFormData(prev => ({
      ...prev,
      [type]: [...prev[type], newItem]
    }));
  };

    const jobStatusOptions = [
      { value: "pending", label: "Pending", id:1 },
      { value: "inprogress", label: "In Progress", id:2 },
      { value: "completed", label: "Completed", id:3 },
      { value: "Delivered", label: "Delivered", id:4 },
      { value: "cancelled", label: "Cancelled", id:5 }
    ]
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const response = await Api.post("/jobcards/create-jobcard", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

     
      alert("Job Card Created!");

      
      navigate('/job-card/view-job-cards');

      // Reset the form
      setFormData({
        customerName: "",
        contact: "",
        email: "",
        bikeModel: "",
        bikeNumber: "",
        problemDescription: "",
        assignedMechanic: "",
        esstimateDeliveryDate: "",
        jobStatus: "pending",
        partsUsed: [{ partName: "", quantity: 1, price: 0 }],
        service: [{ serviceType: "", serviceCharges: 0 }]
      });
      

    } catch (err) {
      console.error("Job Card creation failed", err.response?.data || err.message);
      alert("Job Card creation failed.");
    }
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-xl mt-6 w-full">
      <h2 className="text-2xl font-bold mb-4">Create Job Card</h2>
      <form onSubmit={handleSubmit} className="space-y-5 p-6  overflow-y-auto max-h-[550px]">
        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <input name="customerName" placeholder="Customer Name" onChange={handleChange} value={formData.customerName} required className="input" />
          <input name="contact" placeholder="Contact" onChange={handleChange} value={formData.contact} required className="input" />
          <input name="email" placeholder="Email" onChange={handleChange} value={formData.email} className="input" />

          <input name="bikeModel" placeholder="Bike Model" onChange={handleChange} value={formData.bikeModel} required className="input" />
          <input name="bikeNumber" placeholder="Bike Number" onChange={handleChange} value={formData.bikeNumber} required className="input uppercase" />
          <select name="assignedMechanic" onChange={handleChange} value={formData.assignedMechanic} required className="input">
            <option value="">Select Mechanic</option>
            {mechanics.map(m => (
              <option key={m._id} value={m._id}>{m.fullName || m.name}</option>
            ))}
          </select>

          <input type="date" name="esstimateDeliveryDate" onChange={handleChange} value={formData.esstimateDeliveryDate} required className="input" />
           <select name="jobStatus" onChange={handleChange} value={formData.jobStatus} className="input">
            {jobStatusOptions.map(status => (
              <option key={status.id}  value={status.value}>{status.label}</option>
              
            ))
              
            }
          </select>
        </div>
        

        {/* Problem Description */}
        <textarea name="problemDescription" placeholder="Problem Description" onChange={handleChange} value={formData.problemDescription} className="input w-full" />

        {/* Parts Used Section */}
        <div>
          <h3 className="font-semibold mt-4">Parts Used</h3>
          {formData.partsUsed.map((part, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2">

              <input type="text" placeholder="Part Name" value={part.partName}
                onChange={e => handleArrayChange(idx, "partsUsed", "partName", e.target.value)} className="input" />
              <input type="number" placeholder="Qty" value={part.quantity}
                onChange={e => handleArrayChange(idx, "partsUsed", "quantity", e.target.value)} className="input" />
              <input type="number" placeholder="Price" value={part.price}
                onChange={e => handleArrayChange(idx, "partsUsed", "price", e.target.value)} className="input" />
              <button
                type="button"
                onClick={() =>
                  setFormData(prev => ({
                    ...prev,
                    partsUsed: prev.partsUsed.filter((_, i) => i !== idx)
                  }))
                }
                className="text-white bg-red-500 hover:bg-red-600 text-sm rounded px-2 py-1 transition duration-300 ease-in-out"
              >
                Remove

              </button>

            </div>
          ))}

          <button type="button" onClick={() => addArrayItem("partsUsed")} className="btn">+ Add Part</button>
        </div>

        {/* Services Section */}
        <div>
          <h3 className="font-semibold mt-4">Services</h3>
          {formData.service.map((s, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2">
              <input type="text" placeholder="Service Type" value={s.serviceType}
                onChange={e => handleArrayChange(idx, "service", "serviceType", e.target.value)} className="input" />
              <input type="number" placeholder="Charge" value={s.serviceCharges}
                onChange={e => handleArrayChange(idx, "service", "serviceCharges", e.target.value)} className="input" />

              <button
                type="button"
                onClick={() =>
                  setFormData(prev => ({
                    ...prev,
                    service: prev.service.filter((_, i) => i !== idx)
                  }))
                }
                className="text-white bg-red-500 hover:bg-red-600 text-sm rounded px-2 py-1 transition duration-300 ease-in-out"
              >
                Remove

              </button>

            </div>
          ))}
          <button type="button" onClick={() => addArrayItem("service")} className="btn">+ Add Service</button>
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button type="submit" className="btn-submit">Create Job Card</button>
        </div>
      </form>

    </div>
  );
};

export default CreateJobCard;
