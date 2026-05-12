function PassengerSection({ passengers, setPassengers }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">
        Passenger Details
      </h2>

      <div>
        <label className="text-sm text-gray-600 block mb-2">
          Number of Passengers
        </label>

        <input
          type="number"
          min="1"
          value={passengers}
          onChange={(e) => setPassengers(Number(e.target.value))}
          className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>
    </div>
  )
}

export default PassengerSection