// components/PassengerSection.jsx
import React from 'react';

const PassengerSection = ({ passengers, setPassengers }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-5 border border-white/40">
      <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
        <i className="fas fa-users text-emerald-600"></i> Passengers
      </h2>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Number of Passengers</label>
        <input
          type="number"
          min="1"
          value={passengers}
          onChange={(e) => setPassengers(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-full md:w-64 px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 outline-none transition text-lg font-semibold"
        />
        <p className="text-xs text-gray-400 mt-2">* Transport will auto-adjust based on passenger count</p>
      </div>
    </div>
  );
};

export default PassengerSection;