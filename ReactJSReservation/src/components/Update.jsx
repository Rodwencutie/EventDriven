import React, { useState } from 'react';

const UpdateForm = ({ customerId, onUpdate, onClose }) => {
  const [updatedData, setUpdatedData] = useState({
    customerId,
    name: '',
    email: '',
    contactNo: '',
    venue: '',
    menu: '',
    event: '',
    date: '',
    time: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Add validation if needed

    try {
      // Call the onUpdate function with the customerId and updatedData
      await onUpdate(customerId, updatedData);
      // TODO: Optionally, add logic to handle success or close the form
      onClose();
    } catch (error) {
      console.error('Error updating data:', error);
      // TODO: Optionally, add logic to handle errors
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Customer_ID:
      <input type="text" name="Customer_ID" value={updatedData.customerId} onChange={handleChange} />
      </label>
      <label>
        Name:
        <input type="text" name="name" value={updatedData.name} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="text" name="email" value={updatedData.email} onChange={handleChange} />
      </label>
      <label>
        Contact No:
        <input type="text" name="contactNo" value={updatedData.contactNo} onChange={handleChange} />
      </label>
      <label>
        Venue:
        <input type="text" name="venue" value={updatedData.venue} onChange={handleChange} />
      </label>
      <label>
        Menu:
        <input type="text" name="menu" value={updatedData.menu} onChange={handleChange} />
      </label>
      <label>
        Event:
        <input type="text" name="event" value={updatedData.event} onChange={handleChange} />
      </label>
      <label>
        Date:
        <input type="text" name="date" value={updatedData.date} onChange={handleChange} />
      </label>
      <label>
        Time:
        <input type="text" name="time" value={updatedData.time} onChange={handleChange} />
      </label>

      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateForm;
