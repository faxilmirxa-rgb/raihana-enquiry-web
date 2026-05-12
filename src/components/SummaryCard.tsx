function SummaryCard({
  totalNights,
  perPassengerTotal,
  grandTotal,
}) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm sticky top-24">
      <h2 className="text-xl font-bold mb-6">
        Tour Summary
      </h2>

      <div className="space-y-4">
        <div className="bg-slate-100 rounded-xl p-4">
          <p className="text-sm text-gray-500">
            Total Nights
          </p>

          <h3 className="text-2xl font-bold mt-1">
            {totalNights}
          </h3>
        </div>

        <div className="bg-emerald-100 rounded-xl p-4">
          <p className="text-sm text-gray-500">
            Per Passenger
          </p>

          <h3 className="text-2xl font-bold mt-1">
            ${perPassengerTotal.toFixed(2)}
          </h3>
        </div>

        <div className="bg-yellow-100 rounded-xl p-4">
          <p className="text-sm text-gray-500">
            Grand Total
          </p>

          <h3 className="text-2xl font-bold mt-1">
            ${grandTotal.toFixed(2)}
          </h3>
        </div>
      </div>
    </div>
  )
}

export default SummaryCard