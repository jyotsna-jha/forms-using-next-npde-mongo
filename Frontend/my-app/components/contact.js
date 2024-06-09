"use client"
import { default as axios } from 'axios'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/home', formData);
      // await keyword is used to wait for the response from the server.
      // axios.post send post request to the backend with the 'formData'
      console.log('Form submitted successfully:', response.data);
      // Optionally, reset the form
      setFormData({
        name: '',
        email: '',
        contactNumber: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting the form:', error);
      console.error('Error details:', error.response ? error.response.data : error.message);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
        <div>
          <label htmlFor="name" className="block text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            className="w-full p-2 bg-slate-100 border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Your Email"
            className="w-full p-2 bg-slate-100 border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="contactNumber" className="block text-gray-700">Contact Number</label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            placeholder="Your Contact Number"
            className="w-full p-2 bg-slate-100 border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.contactNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-gray-700">Your Message</label>
          <textarea
            name="message"
            id="message"
            className="w-full p-2 bg-slate-100 border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="4"
            placeholder="Your Text"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="w-[30%] p-2 bg-blue-500 text-white border-gray-300 rounded mt-1 focus:outline-none focus:ring-blue-500 focus:border-transparent transition duration-200 transform hover:bg-blue-600 hover:scale-105">
          Submit
        </button>
      </form>
    </div>
  );
}
