function NightsSection({ nights, setNights }) {
  const handleChange = (city, value) => {
    setNights({
      ...nights,
      [city]: Number(value),
    })
  }

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm mt-4">
      <h2 className="text-lg font-semibold mb-4">
        Nights Selection
      </h2>

      <div className="grid grid-cols-1 gap-4">
        {Object.keys(nights).map((city) => (
          <div key={city}>
            <label className="block text-sm text-gray-600 mb-2 capitalize">
              Nights in {city}
            </label>

            <input
              type="number"
              min="0"
              value={nights[city]}
              onChange={(e) =>
                handleChange(city, e.target.value)
              }
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default NightsSection