'use client'
import React, { useState } from 'react';

const NotificationComponent = () => {
  const [title, setTitle] = useState('');
  const [notification, setNotification] = useState('');
  const [notifications, setNotifications] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Notification ko notifications array me add karna
    if (notification) {
      setNotifications([...notifications, { title, notification }]);
      setTitle('');
      setNotification('');
    }
  };

  const convertToClickableLink = (text) => {
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlPattern);
    return parts.map((part, index) => {
      if (urlPattern.test(part)) {
        return (
          <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Notification (with link if any)"
          value={notification}
          onChange={(e) => setNotification(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Add Notification
        </button>
      </form>

      <div className="mt-5">
        <h2 className="text-lg font-semibold">Notifications:</h2>
        <ul className="list-disc pl-5">
          {notifications.map((notif, index) => (
            <li key={index}>
              <strong>{notif.title}:</strong> {convertToClickableLink(notif.notification)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NotificationComponent;
