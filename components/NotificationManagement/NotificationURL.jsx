import React from 'react';

const NotificationURL = ({ message }) => {
  // Regex pattern to detect URLs in the message text
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // Replace URLs with clickable anchor tags
  const formattedMessage = message.replace(urlRegex, (url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
  });

  return (
    <div
      className="notification"
      dangerouslySetInnerHTML={{ __html: formattedMessage }}
    ></div>
  );
};

export default NotificationURL;
