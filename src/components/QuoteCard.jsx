// components/QuoteCard.jsx
import React from 'react';

const QuoteCard = ({ 
  passengers, 
  totalNights, 
  perPassengerTotal, 
  grandTotal, 
  totalHotelCost, 
  transportTotalPrice, 
  totalFoodCost, 
  addonsTotal 
}) => {
  return (
    <div className="bg-gradient-to-br from-emerald-800 to-teal-800 rounded-2xl shadow-2xl p-6 text-white sticky top-6">
      <div className="text-center border-b border-emerald-600/50 pb-4 mb-4">
        <i className="fas fa-star-of-life text-3xl text-amber-300"></i>
        <h2 className="text-2xl font-bold mt-2">Live Quotation</h2>
        <p className="text-emerald-200 text-sm">Real-time price calculation</p>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center py-2">
          <span className="flex items-center gap-2"><i className="fas fa-users"></i> Passengers</span>
          <span className="font-bold text-xl">{passengers}</span>
        </div>
        
        <div className="flex justify-between items-center py-2 border-t border-emerald-700/50">
          <span className="flex items-center gap-2"><i className="fas fa-moon"></i> Total Nights</span>
          <span className="font-bold text-xl">{totalNights}</span>
        </div>
        
        <div className="bg-black/20 rounded-xl p-3 space-y-2 my-3">
          <div className="flex justify-between text-sm">
            <span>🏨 Hotels</span>
            <span>${totalHotelCost}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>🚌 Transport</span>
            <span>${transportTotalPrice}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>🍽️ Food</span>
            <span>${totalFoodCost}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>✨ Add-ons</span>
            <span>${addonsTotal}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center py-2 border-t border-emerald-500">
          <span className="text-lg">Per Passenger</span>
          <span className="text-2xl font-bold text-amber-300">${perPassengerTotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between items-center pt-2 pb-1">
          <span className="text-xl font-semibold">Grand Total</span>
          <span className="text-3xl font-extrabold text-amber-300">${grandTotal.toFixed(2)}</span>
        </div>
        <div className="text-right text-emerald-200 text-xs">USD</div>
      </div>
    </div>
  );
};

export default QuoteCard;