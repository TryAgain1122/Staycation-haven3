"use client";

import { X } from "lucide-react";
import { useState } from "react";

export default function NewBookingModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    guestName: "",
    email: "",
    phone: "",
    haven: "",
    checkIn: "",
    checkOut: "",
    guests: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    alert("Booking Saved! (Connect to backend)");
    onClose();
  };

  return (
<div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-[9999] p-4">      <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6 space-y-6 animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">New Booking</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <input
            type="text"
            name="guestName"
            placeholder="Guest Name"
            className="w-full border p-3 rounded-lg"
            value={form.guestName}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-3 rounded-lg"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="w-full border p-3 rounded-lg"
            value={form.phone}
            onChange={handleChange}
          />

          <select
            name="haven"
            className="w-full border p-3 rounded-lg"
            value={form.haven}
            onChange={handleChange}
          >
            <option value="">Select Haven</option>
            <option value="Haven 1">Haven 1</option>
            <option value="Haven 2">Haven 2</option>
            <option value="Haven 3">Haven 3</option>
            <option value="Haven 4">Haven 4</option>
          </select>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              name="checkIn"
              className="border p-3 rounded-lg"
              value={form.checkIn}
              onChange={handleChange}
            />
            <input
              type="date"
              name="checkOut"
              className="border p-3 rounded-lg"
              value={form.checkOut}
              onChange={handleChange}
            />
          </div>

          <input
            type="number"
            name="guests"
            placeholder="Guests"
            className="w-full border p-3 rounded-lg"
            value={form.guests}
            onChange={handleChange}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            Save Booking
          </button>
        </div>
      </div>
    </div>
  );
}
