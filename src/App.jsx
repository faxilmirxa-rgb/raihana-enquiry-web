// App.jsx
import React, { useState } from 'react';

// Hotel Data
const HOTELS = {
  karbala: [
    { id: 'ziara', name: 'Hotel Ziara', rate: 80 },
    { id: 'aleyaseen', name: 'Hotel Ale Yaseen', rate: 50 },
    { id: 'khuddam', name: 'Khuddam Al Hussain', rate: 60 }
  ],
  najaf: [
    { id: 'shams', name: 'Shams Shamoos', rate: 50 },
    { id: 'golden', name: 'Golden', rate: 70 },
    { id: 'meraj', name: 'Meraj', rate: 80 }
  ],
  kazmain: [
    { id: 'ard', name: 'Ard Kazmiya', rate: 30 }
  ],
  baghdad: [
    { id: 'bgw', name: 'BGW Hotel', rate: 80 }
  ]
};

const TRANSPORT = [
  { id: 'taxi', name: 'Taxi', seats: 4, price: 50 },
  { id: '7seater', name: '7 Seater', seats: 7, price: 450 },
  { id: '14seater', name: '14 Seater', seats: 14, price: 650 },
  { id: 'coaster', name: 'Coaster', seats: 24, price: 700 },
  { id: '40bus', name: '40 Seater Bus', seats: 40, price: 1100 },
  { id: '50bus', name: '50 Seater Bus', seats: 50, price: 2000 },
  { id: '55bus', name: '55 Seater Bus', seats: 55, price: 2800 }
];

const FOOD = [
  { id: '2dish', name: '2 Dish', rate: 10 },
  { id: '3dish', name: '3 Dish', rate: 20 },
  { id: 'buffet', name: 'Full Buffet', rate: 40 },
  { id: 'packets', name: 'Packets', rate: 50 }
];

const ADDONS = [
  { id: 'arrival', name: 'On Arrival Service', rate: 100 },
  { id: 'standroll', name: 'Stand Roll Service', rate: 150 },
  { id: 'etc', name: 'Etc. Service', rate: 80 }
];

const App = () => {
  // State
  const [passengers, setPassengers] = useState(15);
  const [customerName, setCustomerName] = useState('');
  const [groupName, setGroupName] = useState('');
  const [nights, setNights] = useState({ karbala: 7, najaf: 4, kazmain: 4, baghdad: 6 });
  const [selectedHotel, setSelectedHotel] = useState({ karbala: 'ziara', najaf: 'shams', kazmain: 'ard', baghdad: 'bgw' });
  const [transportId, setTransportId] = useState('coaster');
  const [foodId, setFoodId] = useState('2dish');
  const [addons, setAddons] = useState({ arrival: false, standroll: false, etc: false });

  // Calculations
  const totalNights = Object.values(nights).reduce((a, b) => a + b, 0);
  
  // Hotel Cost
  const getHotelRate = (city, hotelId) => {
    const hotel = HOTELS[city].find(h => h.id === hotelId);
    return hotel ? hotel.rate : 0;
  };
  
  const hotelCost = {
    karbala: nights.karbala * getHotelRate('karbala', selectedHotel.karbala),
    najaf: nights.najaf * getHotelRate('najaf', selectedHotel.najaf),
    kazmain: nights.kazmain * getHotelRate('kazmain', selectedHotel.kazmain),
    baghdad: nights.baghdad * getHotelRate('baghdad', selectedHotel.baghdad)
  };
  const totalHotel = Object.values(hotelCost).reduce((a, b) => a + b, 0);
  
  // Transport
  const validTransport = TRANSPORT.filter(t => t.seats >= passengers);
  let selectedTransport = TRANSPORT.find(t => t.id === transportId);
  if (!selectedTransport || selectedTransport.seats < passengers) {
    selectedTransport = validTransport[0];
  }
  const transportPrice = selectedTransport ? selectedTransport.price : 0;
  
  // Food
  const selectedFood = FOOD.find(f => f.id === foodId);
  const foodPrice = (selectedFood ? selectedFood.rate : 0) * totalNights;
  
  // Addons
  const addonsPrice = ADDONS.reduce((sum, a) => sum + (addons[a.id] ? a.rate : 0), 0);
  
  // Totals
  const grandTotal = totalHotel + transportPrice + foodPrice + addonsPrice;
  const perPassenger = grandTotal / passengers;

  // PDF Download
  const downloadPDF = () => {
    const element = document.getElementById('pdf-content');
    if (!element) return;
    
    import('html2pdf.js').then(html2pdf => {
      html2pdf.default().set({
        margin: 0.5,
        filename: `quote_${customerName || 'tour'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      }).from(element).save();
    }).catch(() => {
      alert('Please run: npm install html2pdf.js');
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-emerald-700">Ziyarat Travel Manager</h1>
          <p className="text-gray-500">Karbala | Najaf | Kazmain | Baghdad | Iran</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Side - Form */}
          <div className="space-y-4">
            {/* Customer Info */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="font-bold text-lg mb-3">Tour Details</h2>
              <input type="text" placeholder="Customer Name" value={customerName} onChange={e => setCustomerName(e.target.value)} className="w-full p-2 border rounded mb-2" />
              <input type="text" placeholder="Group Name" value={groupName} onChange={e => setGroupName(e.target.value)} className="w-full p-2 border rounded" />
            </div>

            {/* Passengers */}
            <div className="bg-white p-4 rounded-lg shadow">
              <label className="font-bold">Number of Passengers</label>
              <input type="number" value={passengers} onChange={e => setPassengers(Math.max(1, parseInt(e.target.value) || 1))} className="w-full p-2 border rounded mt-1 text-xl font-bold" />
            </div>

            {/* Nights */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="font-bold mb-3">Nights per City</h2>
              <div className="grid grid-cols-2 gap-3">
                {Object.keys(nights).map(city => (
                  <div key={city}>
                    <label className="capitalize text-sm">{city}</label>
                    <input type="number" value={nights[city]} onChange={e => setNights({...nights, [city]: parseInt(e.target.value) || 0})} className="w-full p-2 border rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Hotels */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="font-bold mb-3">Hotels</h2>
              {Object.keys(HOTELS).map(city => (
                <div key={city} className="mb-3">
                  <label className="capitalize font-semibold">{city}</label>
                  <select value={selectedHotel[city]} onChange={e => setSelectedHotel({...selectedHotel, [city]: e.target.value})} className="w-full p-2 border rounded">
                    {HOTELS[city].map(hotel => (
                      <option key={hotel.id} value={hotel.id}>{hotel.name} - ${hotel.rate}/night</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* Transport */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="font-bold mb-3">Transport</h2>
              <div className="grid grid-cols-2 gap-2">
                {TRANSPORT.map(t => {
                  const isAvailable = t.seats >= passengers;
                  return (
                    <button key={t.id} onClick={() => isAvailable && setTransportId(t.id)} disabled={!isAvailable} className={`p-2 rounded text-sm ${transportId === t.id ? 'bg-emerald-600 text-white' : isAvailable ? 'bg-gray-200' : 'bg-gray-300 opacity-50 cursor-not-allowed'}`}>
                      {t.name} ({t.seats})<br/>${t.price}
                    </button>
                  );
                })}
              </div>
              <p className="text-sm text-gray-600 mt-2">Selected: {selectedTransport?.name} - ${transportPrice}</p>
            </div>

            {/* Food */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="font-bold mb-3">Food Plan</h2>
              <div className="grid grid-cols-2 gap-2">
                {FOOD.map(f => (
                  <button key={f.id} onClick={() => setFoodId(f.id)} className={`p-2 rounded ${foodId === f.id ? 'bg-emerald-600 text-white' : 'bg-gray-200'}`}>
                    {f.name} - ${f.rate}/night
                  </button>
                ))}
              </div>
            </div>

            {/* Addons */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="font-bold mb-3">Add-on Services</h2>
              {ADDONS.map(a => (
                <label key={a.id} className="flex items-center justify-between p-2 border rounded mb-2">
                  <span>{a.name}</span>
                  <div>
                    <span className="font-bold mr-3">${a.rate}</span>
                    <input type="checkbox" checked={addons[a.id]} onChange={e => setAddons({...addons, [a.id]: e.target.checked})} />
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Right Side - Quote Card */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-emerald-800 to-teal-800 rounded-lg shadow-lg p-6 text-white sticky top-4">
              <h2 className="text-2xl font-bold text-center mb-4">Live Quotation</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between text-lg">
                  <span>👥 Passengers:</span>
                  <span className="font-bold">{passengers}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>🌙 Total Nights:</span>
                  <span className="font-bold">{totalNights}</span>
                </div>
                <div className="border-t border-emerald-600 my-3"></div>
                <div className="flex justify-between text-xl">
                  <span>💰 Per Passenger:</span>
                  <span className="font-bold text-yellow-300">${perPassenger.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-2xl font-bold">
                  <span>💵 Grand Total:</span>
                  <span className="text-yellow-300">${grandTotal.toFixed(2)} USD</span>
                </div>
              </div>

              {/* PDF Button */}
              <button onClick={downloadPDF} className="w-full mt-6 bg-rose-600 hover:bg-rose-700 py-3 rounded-lg font-bold flex items-center justify-center gap-2">
                <i className="fas fa-file-pdf"></i> Download Breakdown PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Template - Hidden */}
      <div style={{ display: 'none' }}>
        <div id="pdf-content" className="p-8 bg-white" style={{ fontFamily: 'Arial', width: '750px' }}>
          <div style={{ textAlign: 'center', borderBottom: '2px solid #059669', paddingBottom: 20, marginBottom: 20 }}>
            <h1 style={{ fontSize: 28, color: '#064E3B' }}>Ziyarat Travel Manager</h1>
            <p>Professional Tour Quotation</p>
          </div>
          
          <div style={{ marginBottom: 20 }}>
            <p><strong>Customer:</strong> {customerName || '—'}</p>
            <p><strong>Group:</strong> {groupName || '—'}</p>
            <p><strong>Passengers:</strong> {passengers}</p>
            <p><strong>Total Nights:</strong> {totalNights}</p>
          </div>
          
          <h2 style={{ color: '#059669', borderLeft: '3px solid #059669', paddingLeft: 10, marginBottom: 15 }}>Cost Breakdown</h2>
          
          {Object.keys(hotelCost).map(city => {
            if (nights[city] > 0) {
              const hotel = HOTELS[city].find(h => h.id === selectedHotel[city]);
              const cost = nights[city] * hotel.rate;
              return (
                <div key={city} style={{ display: 'flex', justifyContent: 'space-between', padding: 5, borderBottom: '1px solid #ddd' }}>
                  <span>{hotel.name} ({city}) - {nights[city]} nights × ${hotel.rate}</span>
                  <span><strong>${cost}</strong></span>
                </div>
              );
            }
            return null;
          })}
          
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: 5, borderBottom: '1px solid #ddd' }}>
            <span>Transport ({selectedTransport?.name}) - ${transportPrice} ÷ {passengers}</span>
            <span><strong>${transportPrice}</strong></span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: 5, borderBottom: '1px solid #ddd' }}>
            <span>Food ({selectedFood?.name}) - {totalNights} nights × ${selectedFood?.rate}</span>
            <span><strong>${foodPrice}</strong></span>
          </div>
          
          {addonsPrice > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: 5, borderBottom: '1px solid #ddd' }}>
              <span>Add-on Services</span>
              <span><strong>${addonsPrice}</strong></span>
            </div>
          )}
          
          <div style={{ background: '#ECFDF5', padding: 15, marginTop: 20, borderRadius: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18 }}>
              <span><strong>Per Passenger Total</strong></span>
              <span><strong>${perPassenger.toFixed(2)}</strong></span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, marginTop: 10, borderTop: '2px solid #059669', paddingTop: 10 }}>
              <span><strong>GRAND TOTAL</strong></span>
              <span><strong>${grandTotal.toFixed(2)} USD</strong></span>
            </div>
          </div>
          
          <div style={{ textAlign: 'center', fontSize: 10, color: '#999', marginTop: 30 }}>
            <p>Thank you for choosing Ziyarat Travel Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;