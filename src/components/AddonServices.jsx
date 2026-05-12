// components/AddonServices.jsx
import React from 'react';
import { ADDON_SERVICES } from '../hooks/useTourCalculator';

const AddonServices = ({ addons, toggleAddon, addonsTotal }) => {
  const getServiceIcon = (id) => {
    const icons = { arrival: 'fa-plane-arrival', standRoll: 'fa-hand-sparkles', etc: 'fa-concierge-bell' };
    return icons[id] || 'fa-plus-circle';
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-5 border border-white/40">
      <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
        <i className="fas fa-gem text-emerald-600"></i> Add-on Services
      </h2>
      
      <div className="space-y-3">
        {ADDON_SERVICES.map((service) => (
          <label
            key={service.id}
            className={`
              flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-200
              ${addons[service.id] 
                ? 'bg-emerald-50 border-2 border-emerald-400' 
                : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
              }
            `}
          >
            <div className="flex items-center gap-3">
              <i className={`fas ${getServiceIcon(service.id)} text-emerald-600 w-5`}></i>
              <span className="text-gray-700">{service.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-emerald-700">${service.rate}</span>
              <input
                type="checkbox"
                checked={addons[service.id]}
                onChange={() => toggleAddon(service.id)}
                className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
              />
            </div>
          </label>
        ))}
      </div>
      
      {addonsTotal > 0 && (
        <div className="mt-4 bg-emerald-50 rounded-xl p-3 text-center">
          <span className="text-gray-600">Add-ons Total:</span>
          <span className="ml-2 font-bold text-emerald-700 text-lg">${addonsTotal}</span>
        </div>
      )}
    </div>
  );
};

export default AddonServices;