"use client";

import Link from "next/link";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FaWhatsapp } from "react-icons/fa";

export function ContactForm() {
  const [captchaVerified, setCaptchaVerified] = useState(false);

  

  const onCaptchaChange = (value) => {
    if (value) {
      setCaptchaVerified(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaVerified) {
      alert("Please verify that you are not a robot.");
      return;
    }

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch("https://backend.aggrabandhuss.org/api/support", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      alert("Form submitted successfully!");
      e.target.reset();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <div className="flex items-center justify-between w-full p-4 ">
      {/* Left Form Section */}
      <div className="flex-1 text-center border-l border-gray-300 pl-4 m-2">
        <h2 className="text-2xl font-bold text-center mb-6 bg-blue-500 text-white">Contact Us</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name Field */}
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Enter Your Full Name"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Mobile Number Field */}
          <div>
            <label htmlFor="contact" className="block mb-2 text-sm font-medium">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              id="contact"
              name="contact"
              type="tel"
              required
              placeholder="Enter Your Mobile Number"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Member ID Field (Optional) */}
          <div>
            <label htmlFor="memberId" className="block mb-2 text-sm font-medium">
              Member ID (Optional)
            </label>
            <input
              id="memberId"
              name="memberId"
              type="text"
              placeholder="Enter Your Member ID (if any)"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block mb-2 text-sm font-medium">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              placeholder="Write Your Message"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* reCAPTCHA */}
          <div className="flex justify-center mb-4">
            <ReCAPTCHA
              sitekey="6LdF22oqAAAAAPC6-DZdFF13hy5Lb7j7ElYc3eZ8"
              onChange={onCaptchaChange}
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Right WhatsApp Section */}
      <div className="w-3/4 text-center p-4 bg-white rounded-lg shadow-md m-2">
        <div className="mb-4">
          <span className="text-2xl font-semibold">WhatsApp No: 7830305040</span>
        </div>
        <div className="flex justify-center">
          <Link
            href="https://whatsapp.com/channel/0029VajOtfp59PwSxSNdHT1W" // Replace with your WhatsApp number
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:text-green-600"
          >
            <FaWhatsapp size={48} />
          </Link>
        </div>
      </div>
    </div>
  );
}

