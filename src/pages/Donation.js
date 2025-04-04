import { useState } from "react";
import './donation.css';
const DonationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
    paymentMethod: "Cash",
    date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/donate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (data.success) {
      window.location.href = `/receipt/${data.donationId}`;
    }
  };

  return (
    <div>
      <h2>Make a Donation</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} required />
        <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
          <option value="Cash">Cash</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="UPI">UPI</option>
        </select>
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <button  type="submit">Donate</button>
      </form>
    </div>
  );
};

export default DonationForm;