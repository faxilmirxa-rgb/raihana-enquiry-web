// components/HotelSelector.jsx
import React from 'react';
import { HOTELS_CONFIG } from '../hooks/useTourCalculator';

const HotelSelector = ({ selectedHotels, setSelectedHotels, nights, hotelCosts, getHotelDetails }) => {
  const cities = Object.keys(HOTELS_CONFIG);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-5 border border-white/40">
      <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
        <i className="fas fa-hotel text-emerald-600"></i> Hotel Selection
      </h2>
      <div className="space-y-4">
        {cities.map((city) => {
          const cityConfig = HOTELS_CONFIG[city];
          const cityNights = nights[city];
          const cost = hotelCosts[city];
          
          return (
            <div key={city} className="border-b border-gray-100 pb-3 last:border-0">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="md:w-1/3">
                  <span className="font-semibold text-gray-700 capitalize">{cityConfig.label}</span>
                  {cityNights > 0 && (
                    <span className="text-sm text-emerald-600 block">
                      {cityNights} nights → ${cost}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <select
                    value={selectedHotels[city]}
                    onChange={(e) => setSelectedHotels(prev => ({ ...prev, [city]: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 outline-none"
                  >
                    {cityConfig.options.map(hotel => (
                      <option key={hotel.id} value={hotel.id}>
                        {hotel.name} - ${hotel.rate}/night
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HotelSelector;