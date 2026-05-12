function Navbar() {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-emerald-700">
            Raihana Tours
          </h1>

          <p className="text-sm text-gray-500">
            Ziyarat Cost Calculator
          </p>
        </div>

        <button className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-medium">
          Download PDF
        </button>
      </div>
    </header>
  )
}

export default Navbar