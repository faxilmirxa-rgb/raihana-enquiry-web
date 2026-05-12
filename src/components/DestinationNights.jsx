// components/DestinationNights.jsx
import React from 'react';

const DestinationNights = ({ nights, updateNights }) => {
  const destinations = [
    { key: 'karbala', label: 'Karbala', icon: 'fa-mosque', color: 'emerald' },
    { key: 'najaf', label: 'Najaf', icon: 'fa-star-and-crescent', color: 'teal' },
    { key: 'kazmain', label: 'Kazmain', icon: 'fa-landmark', color: 'blue' },
    { key: 'baghdad', label: 'Baghdad', icon: 'fa-city', color: 'purple' }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-5 border border-white/40">
      <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
        <i className="fas fa-moon text-emerald-600"></i> Nights per Destination
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {destinations.map((dest) => (
          <div key={dest.key} className="text-center">
            <i className={`fas ${dest.icon} text-${dest.color}-500 text-xl mb-2 block`}></i>
            <label className="block text-sm font-medium text-gray-600 mb-1">{dest.label}</label>
            <input
              type="number"
              min="0"
              value={nights[dest.key]}
              onChange={(e) => updateNights(dest.key, e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 outline-none text-center"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationNights;