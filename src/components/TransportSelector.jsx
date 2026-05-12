// components/TransportSelector.jsx
import React from 'react';
import { TRANSPORT_OPTIONS } from '../hooks/useTourCalculator';

const TransportSelector = ({ passengers, transportId, setTransportId, selectedTransport, transportTotalPrice, transportPerPassenger }) => {
  const isValidVehicle = (seats) => seats >= passengers;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-5 border border-white/40">
      <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
        <i className="fas fa-bus text-emerald-600"></i> Transportation
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {TRANSPORT_OPTIONS.map((opt) => {
          const valid = isValidVehicle(opt.seats);
          const isSelected = transportId === opt.id;
          
          return (
            <button
              key={opt.id}
              onClick={() => valid && setTransportId(opt.id)}
              disabled={!valid}
              className={`
                p-3 rounded-xl text-center transition-all duration-200
                ${isSelected 
                  ? 'bg-emerald-600 text-white shadow-lg scale-105' 
                  : valid 
                    ? 'bg-white border-2 border-gray-200 hover:border-emerald-400 text-gray-700' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60'
                }
              `}
            >
              <div className="font-bold text-sm">{opt.name}</div>
              <div className="text-xs">{opt.seats} seats</div>
              <div className="text-xs font-semibold mt-1">${opt.price}</div>
            </button>
          );
        })}
      </div>
      
      {selectedTransport && (
        <div className="bg-emerald-50 rounded-xl p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-gray-700">Selected: {selectedTransport.name}</p>
              <p className="text-sm text-gray-600">{selectedTransport.seats} seats capacity</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total Transport Cost</p>
              <p className="text-xl font-bold text-emerald-700">${transportTotalPrice}</p>
              <p className="text-xs text-gray-500">= ${transportPerPassenger.toFixed(2)} per passenger</p>
            </div>
          </div>
          {selectedTransport.seats < passengers && (
            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
              <i className="fas fa-exclamation-triangle"></i> Insufficient capacity! Auto-selected larger vehicle.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default TransportSelector;