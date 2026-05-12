import { hotels } from "../data/rates"

function HotelSection({ selectedHotels, setSelectedHotels }) {
  const handleHotelChange = (city, hotelName) => {
    const selectedHotel = hotels[city].find(
      (hotel) => hotel.name === hotelName
    )

    setSelectedHotels({
      ...selectedHotels,
      [city]: selectedHotel,
    })
  }

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm mt-4">
      <h2 className="text-lg font-semibold mb-4">
        Hotel Selection
      </h2>

      <div className="space-y-4">
        {Object.keys(hotels).map((city) => (
          <div key={city}>
            <label className="block text-sm text-gray-600 mb-2 capitalize">
              {city} Hotel
            </label>

            <select
              onChange={(e) =>
                handleHotelChange(city, e.target.value)
              }
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option>Select Hotel</option>

              {hotels[city].map((hotel) => (
                <option key={hotel.name} value={hotel.name}>
                  {hotel.name} (${hotel.rate})
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HotelSection