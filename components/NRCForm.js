// components/NRCForm.js
import React, { useState } from 'react';
import { hashData } from '../utils/hash';

const NRCForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    nrcNumber: '',
    dateOfBirth: '',
    address: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Hash the form data before sending to the server
    const hashedData = hashData(formData);
    
    // Send the hashed data to the backend API (for blockchain storage)
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ hashedData }),
    });

    const result = await response.json();
    console.log(result);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Full Name:</label>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
      </div>

      <div>
        <label>NRC Number:</label>
        <input type="text" name="nrcNumber" value={formData.nrcNumber} onChange={handleChange} required />
      </div>

      <div>
        <label>Date of Birth:</label>
        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
      </div>

      <div>
        <label>Address:</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} required />
      </div>

      <button type="submit">Register</button>
    </form>
  );
};

export default NRCForm;
