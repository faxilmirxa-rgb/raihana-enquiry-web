import { transportOptions } from "../data/rates"

function TransportSection({
  passengers,
  selectedTransport,
  setSelectedTransport,
}) {
  const availableTransport = transportOptions.filter(
    (vehicle) => vehicle.seats >= passengers
  )

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm mt-4">
      <h2 className="text-lg font-semibold mb-4">
        Transportation
      </h2>

      <select
        onChange={(e) => {
          const transport = transportOptions.find(
            (item) => item.name === e.target.value
          )

          setSelectedTransport(transport)
        }}
        className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
      >
        <option>Select Vehicle</option>

        {availableTransport.map((vehicle) => (
          <option key={vehicle.name} value={vehicle.name}>
            {vehicle.name} ({vehicle.seats} Seats)
          </option>
        ))}
      </select>

      {selectedTransport && (
        <div className="mt-4 bg-emerald-50 p-4 rounded-xl">
          <p className="text-sm text-gray-700">
            Vehicle Price: ${selectedTransport.price}
          </p>

          <p className="text-sm text-gray-700 mt-1">
            Per Passenger:
            ${(selectedTransport.price / passengers).toFixed(2)}
          </p>
        </div>
      )}
    </div>
  )
}

export default TransportSection