import { useMemo, useState } from "react"

import Navbar from "./components/Navbar"
import PassengerSection from "./components/PassengerSection"
import NightsSection from "./components/NightsSection"
import HotelSection from "./components/HotelSection"
import TransportSection from "./components/TransportSection"
import SummaryCard from "./components/SummaryCard"

function App() {
  const [passengers, setPassengers] = useState(1)

  const [nights, setNights] = useState({
    karbala: 0,
    najaf: 0,
    kazmain: 0,
    baghdad: 0,
  })

  const [selectedHotels, setSelectedHotels] = useState({})

  const [selectedTransport, setSelectedTransport] = useState(null)

  const totalNights = useMemo(() => {
    return Object.values(nights).reduce(
      (acc, curr) => acc + curr,
      0
    )
  }, [nights])

  const hotelTotal = useMemo(() => {
    let total = 0

    Object.keys(selectedHotels).forEach((city) => {
      const hotel = selectedHotels[city]

      if (hotel) {
        total += hotel.rate * nights[city]
      }
    })

    return total
  }, [selectedHotels, nights])

  const transportTotal = selectedTransport
    ? selectedTransport.price / passengers
    : 0

  const perPassengerTotal = hotelTotal + transportTotal

  const grandTotal = perPassengerTotal * passengers

  return (
    <div className="bg-slate-100 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <PassengerSection
            passengers={passengers}
            setPassengers={setPassengers}
          />

          <NightsSection
            nights={nights}
            setNights={setNights}
          />

          <HotelSection
            nights={nights}
            selectedHotels={selectedHotels}
            setSelectedHotels={setSelectedHotels}
          />

          <TransportSection
            selectedTransport={selectedTransport}
            setSelectedTransport={setSelectedTransport}
          />
        </div>

        <SummaryCard
          totalNights={totalNights}
          hotelTotal={hotelTotal}
          transportTotal={transportTotal}
          perPassengerTotal={perPassengerTotal}
          grandTotal={grandTotal}
        />
      </div>
    </div>
  )
}

export default App