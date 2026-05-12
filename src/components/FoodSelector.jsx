// components/FoodSelector.jsx
import React from 'react';
import { FOOD_OPTIONS } from '../hooks/useTourCalculator';

const FoodSelector = ({ foodId, setFoodId, selectedFood, totalNights, totalFoodCost }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-5 border border-white/40">
      <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
        <i className="fas fa-utensils text-emerald-600"></i> Meal Plan
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {FOOD_OPTIONS.map((food) => (
          <button
            key={food.id}
            onClick={() => setFoodId(food.id)}
            className={`
              p-3 rounded-xl text-center transition-all duration-200
              ${foodId === food.id 
                ? 'bg-emerald-600 text-white shadow-md' 
                : 'bg-gray-50 border border-gray-200 text-gray-700 hover:border-emerald-300'
              }
            `}
          >
            <div className="font-semibold text-sm">{food.name}</div>
            <div className="text-lg font-bold">${food.rate}</div>
            <div className="text-xs">per night</div>
          </button>
        ))}
      </div>
      
      {selectedFood && totalNights > 0 && (
        <div className="mt-4 bg-amber-50 rounded-xl p-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">{selectedFood.name} × {totalNights} nights</span>
            <span className="font-bold text-amber-700">${totalFoodCost}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodSelector;