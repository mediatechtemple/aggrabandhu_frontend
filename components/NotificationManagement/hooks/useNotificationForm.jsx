import { useState } from 'react';

const useNotificationForm = () => {
  // State to store form data
  const [formData, setFormData] = useState({ title: '', message: '' });
  // State to store an array of submissions
  const [submissions, setSubmissions] = useState([ {
    title: "Project Kickoff Meeting",
    message: "Discussed the project scope and timeline with the team.",
    date: "2024-08-01"
  },
  {
    title: "Design Review",
    message: "Reviewed the initial design drafts and provided feedback.",
    date: "2024-08-03"
  },
  {
    title: "Client Presentation",
    message: "Presented the project proposal to the client.",
    date: "2024-08-05"
  },
  {
    title: "Code Implementation",
    message: "Started implementing the core features of the application.",
    date: "2024-08-07"
  },
  {
    title: "Testing Phase",
    message: "Conducted unit testing for the new features.",
    date: "2024-08-09"
  },
  {
    title: "Bug Fixing",
    message: "Resolved critical bugs identified during testing.",
    date: "2024-08-10"
  },
  {
    title: "Team Stand-up",
    message: "Daily stand-up meeting to discuss progress and blockers.",
    date: "2024-08-12"
  },
  {
    title: "Feature Enhancement",
    message: "Added new enhancements based on client feedback.",
    date: "2024-08-14"
  },
  {
    title: "Final Review",
    message: "Conducted a final review before the project handover.",
    date: "2024-08-16"
  },
  {
    title: "Project Handover",
    message: "Successfully handed over the project to the client.",
    date: "2024-08-18"
  }]);

  // Handle changes in form inputs
  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add the form data to the submissions array
    setSubmissions(prevSubmissions => [...prevSubmissions, formData]);
    // Reset the form
    setFormData({ title: '', message: '' });
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    submissions, // Expose the submissions array
  };
};

export default useNotificationForm;
