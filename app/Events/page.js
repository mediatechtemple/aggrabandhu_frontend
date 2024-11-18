'use client';
import React, { useState, useEffect } from "react";

const API_URL = "https://backend.aggrabandhuss.org/api/events";

const EventForm = () => {
  const [formData, setFormData] = useState({ title: "", content: "" });
  
  const [message, setMessage] = useState("");
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null); // For tracking which event is being edited

  // Fetch existing events
  const fetchEvents = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setEvents(data.data); // Assuming API returns an array of events
      } else {
        setMessage("Failed to fetch events.");
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage(editingId ? "Event successfully updated!" : "Event successfully added!");
        setFormData({ title: "", content: "" }); // Reset the form
        setEditingId(null); // Reset editing state
        fetchEvents(); // Refresh events list
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || "Failed to save event"}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  // Handle edit button click
  const handleEdit = (event) => {
    setEditingId(event.id); // Set the ID of the event being edited
    setFormData({ title: event.title, content: event.content }); // Fill form with event details
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

      if (response.ok) {
        setMessage("Event successfully deleted!");
        fetchEvents(); // Refresh events list
      } else {
        setMessage("Failed to delete event.");
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <div className="p-4 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">{editingId ? "Edit Event" : "Add Event"}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Field */}
          <div>
            <label className="block mb-1 font-medium" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border px-3 py-2 w-full"
              placeholder="Enter event title"
              required
            />
          </div>

          {/* Content Field */}
          <div>
            <label className="block mb-1 font-medium" htmlFor="content">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="border px-3 py-2 w-full"
              placeholder="Enter event content"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {editingId ? "Update Event" : "Add Event"}
          </button>
        </form>

        {/* Success/Error Message */}
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>

      {/* Events Table */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4 text-center text-blue-500">Events List</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-4/5 mx-auto border">
            <thead>
              <tr>
                <th className="px-4 py-2 border bg-blue-500 text-white">Sr no</th>
                <th className="px-4 py-2 border bg-blue-500 text-white">Title</th>
                <th className="px-4 py-2 border bg-blue-500 text-white">Content</th>
                <th className="px-4 py-2 border bg-blue-500 text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {events.length > 0 ? (
                events.map((event, index) => (
                  <tr key={event.id}>
                    <td className="px-4 py-2 border text-center">{index + 1}</td>
                    <td className="px-4 py-2 border text-center">{event.title}</td>
                    <td className="px-4 py-2 border text-center">{event.content}</td>
                    <td className="px-4 py-2 border text-center">
                      <button
                        onClick={() => handleEdit(event)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-200 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-2 border text-center" colSpan="4">
                    No events found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default EventForm;
