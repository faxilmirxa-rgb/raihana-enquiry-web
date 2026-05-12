// hooks/useTourCalculator.js
import { useState, useEffect, useCallback } from 'react';

// Configuration Data
export const HOTELS_CONFIG = {
  karbala: {
    label: "Karbala",
    options: [
      { id: "ziara", name: "Hotel Ziara", rate: 80 },
      { id: "aleYaseen", name: "Hotel Ale Yaseen", rate: 50 },
      { id: "khuddam", name: "Khuddam Al Hussain", rate: 60 }
    ]
  },
  najaf: {
    label: "Najaf",
    options: [
      { id: "shams", name: "Shams Shamoos", rate: 50 },
      { id: "golden", name: "Golden", rate: 70 },
      { id: "meraj", name: "Meraj", rate: 80 }
    ]
  },
  kazmain: {
    label: "Kazmain",
    options: [
      { id: "ardKazmiya", name: "Ard Kazmiya", rate: 30 }
    ]
  },
  baghdad: {
    label: "Baghdad",
    options: [
      { id: "bgw", name: "BGW Hotel", rate: 80 }
    ]
  }
};

export const TRANSPORT_OPTIONS = [
  { id: "taxi", name: "Taxi", seats: 4, price: 50 },
  { id: "7seater", name: "7 Seater", seats: 7, price: 450 },
  { id: "14seater", name: "14 Seater", seats: 14, price: 650 },
  { id: "coaster", name: "Coaster", seats: 24, price: 700 },
  { id: "40bus", name: "40 Seater Bus", seats: 40, price: 1100 },
  { id: "50bus", name: "50 Seater Bus", seats: 50, price: 2000 },
  { id: "55bus", name: "55 Seater Bus", seats: 55, price: 2800 }
];

export const FOOD_OPTIONS = [
  { id: "2dish", name: "2 Dish", rate: 10 },
  { id: "3dish", name: "3 Dish", rate: 20 },
  { id: "buffet", name: "Full Buffet", rate: 40 },
  { id: "packets", name: "Packets", rate: 50 }
];

export const ADDON_SERVICES = [
  { id: "arrival", name: "On Arrival Service", rate: 100 },
  { id: "standRoll", name: "Stand Roll Service", rate: 150 },
  { id: "etc", name: "Etc. Service", rate: 80 }
];

export const useTourCalculator = () => {
  const [passengers, setPassengers] = useState(15);
  const [nights, setNights] = useState({
    karbala: 7,
    najaf: 4,
    kazmain: 4,
    baghdad: 6
  });
  const [selectedHotels, setSelectedHotels] = useState({
    karbala: "ziara",
    najaf: "shams",
    kazmain: "ardKazmiya",
    baghdad: "bgw"
  });
  const [transportId, setTransportId] = useState("coaster");
  const [foodId, setFoodId] = useState("2dish");
  const [addons, setAddons] = useState({
    arrival: false,
    standRoll: false,
    etc: false
  });

  const getHotelRate = useCallback((city, hotelId) => {
    const cityConfig = HOTELS_CONFIG[city];
    if (!cityConfig) return 0;
    const hotel = cityConfig.options.find(h => h.id === hotelId);
    return hotel ? hotel.rate : 0;
  }, []);

  const getHotelDetails = useCallback((city, hotelId) => {
    const cityConfig = HOTELS_CONFIG[city];
    if (!cityConfig) return { name: '', rate: 0 };
    const hotel = cityConfig.options.find(h => h.id === hotelId);
    return hotel ? { name: hotel.name, rate: hotel.rate } : { name: '', rate: 0 };
  }, []);

  const hotelCosts = {
    karbala: nights.karbala * getHotelRate("karbala", selectedHotels.karbala),
    najaf: nights.najaf * getHotelRate("najaf", selectedHotels.najaf),
    kazmain: nights.kazmain * getHotelRate("kazmain", selectedHotels.kazmain),
    baghdad: nights.baghdad * getHotelRate("baghdad", selectedHotels.baghdad)
  };

  const totalNights = Object.values(nights).reduce((sum, n) => sum + n, 0);

  const getValidTransportOptions = useCallback(() => {
    return TRANSPORT_OPTIONS.filter(opt => opt.seats >= passengers);
  }, [passengers]);

  useEffect(() => {
    const validOptions = getValidTransportOptions();
    if (validOptions.length === 0) return;
    const currentValid = validOptions.some(opt => opt.id === transportId);
    if (!currentValid && validOptions.length > 0) {
      const recommended = validOptions.reduce((prev, curr) => (prev.seats < curr.seats ? prev : curr));
      setTransportId(recommended.id);
    }
  }, [passengers, transportId, getValidTransportOptions]);

  const selectedTransport = TRANSPORT_OPTIONS.find(t => t.id === transportId);
  const transportTotalPrice = selectedTransport ? selectedTransport.price : 0;
  const transportPerPassenger = passengers > 0 ? transportTotalPrice / passengers : 0;

  const selectedFood = FOOD_OPTIONS.find(f => f.id === foodId);
  const foodRate = selectedFood ? selectedFood.rate : 0;
  const totalFoodCost = foodRate * totalNights;

  const addonsTotal = ADDON_SERVICES.reduce((sum, service) => {
    return sum + (addons[service.id] ? service.rate : 0);
  }, 0);

  const totalHotelCostSum = Object.values(hotelCosts).reduce((a, b) => a + b, 0);
  const grandTotal = totalHotelCostSum + totalFoodCost + addonsTotal + transportTotalPrice;
  const perPassengerTotal = passengers > 0 ? grandTotal / passengers : 0;

  const updateNights = (city, value) => {
    const num = Math.max(0, parseInt(value) || 0);
    setNights(prev => ({ ...prev, [city]: num }));
  };

  const toggleAddon = (addonId) => {
    setAddons(prev => ({ ...prev, [addonId]: !prev[addonId] }));
  };

  const getBreakdownItems = () => {
    const items = [];
    
    Object.keys(HOTELS_CONFIG).forEach(city => {
      const cityNights = nights[city];
      if (cityNights > 0) {
        const hotel = getHotelDetails(city, selectedHotels[city]);
        const cost = cityNights * hotel.rate;
        items.push({
          city: HOTELS_CONFIG[city].label,
          hotelName: hotel.name,
          nights: cityNights,
          rate: hotel.rate,
          cost: cost,
          detail: `${cityNights} nights × $${hotel.rate} = $${cost}`
        });
      }
    });

    items.push({
      type: 'transport',
      name: selectedTransport?.name,
      seats: selectedTransport?.seats,
      totalPrice: transportTotalPrice,
      perPassenger: transportPerPassenger,
      passengers: passengers,
      detail: `$${transportTotalPrice} ÷ ${passengers} = $${transportPerPassenger.toFixed(2)} per person`
    });

    items.push({
      type: 'food',
      name: selectedFood?.name,
      rate: foodRate,
      nights: totalNights,
      total: totalFoodCost,
      detail: `${totalNights} nights × $${foodRate} = $${totalFoodCost}`
    });

    const activeAddons = ADDON_SERVICES.filter(s => addons[s.id]);
    if (activeAddons.length > 0) {
      const addonDetails = activeAddons.map(a => `${a.name} $${a.rate}`).join(' + ');
      items.push({
        type: 'addons',
        services: activeAddons,
        total: addonsTotal,
        detail: `${addonDetails} = $${addonsTotal}`
      });
    }

    return items;
  };

  return {
    passengers,
    setPassengers,
    nights,
    updateNights,
    selectedHotels,
    setSelectedHotels,
    transportId,
    setTransportId,
    foodId,
    setFoodId,
    addons,
    toggleAddon,
    totalNights,
    grandTotal,
    perPassengerTotal,
    hotelCosts,
    transportTotalPrice,
    transportPerPassenger,
    totalFoodCost,
    addonsTotal,
    selectedTransport,
    selectedFood,
    getHotelDetails,
    getBreakdownItems,
    totalHotelCostSum
  };
};