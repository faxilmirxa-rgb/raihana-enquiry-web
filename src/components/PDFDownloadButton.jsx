// components/PDFDownloadButton.jsx
import React, { useRef } from 'react';

const PDFDownloadButton = ({
  customerName,
  groupName,
  passengers,
  totalNights,
  nights,
  selectedHotels,
  selectedTransport,
  selectedFood,
  addons,
  getHotelDetails,
  getBreakdownItems,
  grandTotal,
  perPassengerTotal,
  hotelCosts,
  transportTotalPrice,
  totalFoodCost,
  addonsTotal
}) => {
  const pdfContentRef = useRef(null);

  const generatePDF = () => {
    const element = pdfContentRef.current;
    if (!element) return;
    
    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: `Ziyarat_Quote_${customerName || 'Tour'}_${Date.now()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, letterRendering: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    
    import('html2pdf.js').then((html2pdf) => {
      html2pdf.default().set(opt).from(element).save();
    });
  };

  const breakdownItems = getBreakdownItems();

  return (
    <>
      <button
        onClick={generatePDF}
        className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-3 text-lg"
      >
        <i className="fas fa-file-pdf text-xl"></i>
        Download Breakdown PDF
      </button>
      
      {/* Hidden PDF Template */}
      <div className="hidden">
        <div ref={pdfContentRef} className="p-8 bg-white text-gray-800" style={{ fontFamily: 'Inter, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
          {/* Header */}
          <div className="text-center border-b-2 border-emerald-600 pb-4 mb-6">
            <div className="flex justify-center mb-3">
              <div className="bg-emerald-700 text-white p-3 rounded-full">
                <i className="fas fa-mosque text-2xl"></i>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Ziyarat Travel Manager</h1>
            <p className="text-gray-500 mt-1">Professional Tour Quotation · Holy Pilgrimage Packages</p>
            <p className="text-sm text-emerald-600 mt-2">Karbala · Najaf · Kazmain · Baghdad · Iran</p>
          </div>
          
          {/* Customer Info */}
          <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div><span className="font-semibold">Customer:</span> {customerName || '—'}</div>
            <div><span className="font-semibold">Group:</span> {groupName || '—'}</div>
            <div><span className="font-semibold">Passengers:</span> {passengers}</div>
            <div><span className="font-semibold">Total Nights:</span> {totalNights}</div>
          </div>
          
          {/* Detailed Breakdown */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-emerald-700 border-l-4 border-emerald-600 pl-3 mb-4">Cost Breakdown</h2>
            
            <div className="space-y-3">
              {/* Hotel Breakdown */}
              {breakdownItems.filter(i => !i.type).map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-200">
                  <div>
                    <span className="font-medium">{item.hotelName}</span>
                    <span className="text-gray-500 text-sm ml-2">({item.city})</span>
                    <div className="text-xs text-gray-400">{item.detail}</div>
                  </div>
                  <span className="font-semibold">${item.cost}</span>
                </div>
              ))}
              
              {/* Transport Breakdown */}
              {breakdownItems.filter(i => i.type === 'transport').map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-200">
                  <div>
                    <span className="font-medium">Transport ({item.name})</span>
                    <div className="text-xs text-gray-400">{item.detail}</div>
                  </div>
                  <span className="font-semibold">${item.totalPrice}</span>
                </div>
              ))}
              
              {/* Food Breakdown */}
              {breakdownItems.filter(i => i.type === 'food').map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-200">
                  <div>
                    <span className="font-medium">Food Plan ({item.name})</span>
                    <div className="text-xs text-gray-400">{item.detail}</div>
                  </div>
                  <span className="font-semibold">${item.total}</span>
                </div>
              ))}
              
              {/* Add-ons Breakdown */}
              {breakdownItems.filter(i => i.type === 'addons').map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-200">
                  <div>
                    <span className="font-medium">Add-on Services</span>
                    <div className="text-xs text-gray-400">{item.detail}</div>
                  </div>
                  <span className="font-semibold">${item.total}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Totals */}
          <div className="bg-emerald-50 rounded-lg p-4 mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Subtotal (Hotels + Transport + Food + Add-ons)</span>
              <span className="font-semibold">${grandTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t-2 border-emerald-300">
              <span className="text-lg font-bold text-gray-800">Per Passenger Total</span>
              <span className="text-xl font-bold text-emerald-700">${perPassengerTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mt-2 pt-2 border-t-2 border-emerald-400">
              <span className="text-2xl font-extrabold text-gray-900">GRAND TOTAL</span>
              <span className="text-2xl font-extrabold text-emerald-800">${grandTotal.toFixed(2)} USD</span>
            </div>
          </div>
          
          {/* Footer */}
          <div className="text-center text-gray-400 text-xs mt-6 pt-4 border-t border-gray-200">
            <p>This is a computer-generated quotation. All rates are in US Dollars.</p>
            <p className="mt-1">Ziyarat Travel Manager — Your trusted partner for Holy Pilgrimages</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PDFDownloadButton;