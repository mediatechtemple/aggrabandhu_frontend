// Card.js
import React from 'react';

const Card = ({ title, value, bgColor }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center ${bgColor} text-white p-8 rounded-lg shadow-md w-full md:w-1/3`}
    >
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-4xl font-bold mt-4">{value}</p>
    </div>
  );
};

export default Card;
