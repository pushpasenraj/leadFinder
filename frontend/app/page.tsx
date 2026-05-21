"use client"

import { useEffect, useState } from "react"

export default function Home() {
  const [leads, setLeads] = useState<any[]>([])
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [industry, setIndustry] = useState("")

  useEffect(() => {
    getAllLeads()
  }, [])

  function getAllLeads() {
    fetch("http://127.0.0.1:8000/leads")
      .then((response) => response.json())
      .then((data) => setLeads(data))
      .catch((error) => console.log(error))
  }

  function searchLeads() {
    fetch("http://127.0.0.1:8000/filter-leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        city: city || null,
        state: state || null,
        industry: industry || null,
      }),
    })
      .then((response) => response.json())
      .then((data) => setLeads(data))
      .catch((error) => console.log(error))
  }

  function clearSearch() {
    setCity("")
    setState("")
    setIndustry("")
    getAllLeads()
  }

  return (
    <main className="min-h-screen bg-white">
      <header className="flex items-center justify-between px-10 py-5 bg-gray-100">
        <div>
          <h1 className="text-4xl font-bold text-blue-700">LeadFinder</h1>
          <p className="text-sm text-gray-700">Marketing Solutions</p>
        </div>

        <div className="text-right">
          <p className="text-2xl text-blue-700">Call Us Today!</p>
          <p className="text-3xl font-bold text-red-600">9876543210</p>
        </div>
      </header>

      <nav className="flex justify-center gap-10 py-5 text-lg font-medium bg-white shadow text-gray-800">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Contact</a>
      </nav>

      <section className="flex flex-col items-center justify-center text-center bg-blue-700 text-white py-32 px-5">
        <h2 className="text-6xl font-extrabold max-w-5xl leading-tight">
          Find Your Perfect Business Leads Faster
        </h2>

        <p className="mt-8 text-2xl max-w-4xl">
          Targeted business lists, email marketing lists, and sales leads for
          your business growth.
        </p>

        <div className="flex gap-5 mt-10 flex-wrap justify-center">
          <button className="bg-red-600 px-8 py-4 rounded text-xl font-semibold hover:bg-red-700">
            Business Lists
          </button>
          <button className="bg-red-600 px-8 py-4 rounded text-xl font-semibold hover:bg-red-700">
            Residential Lists
          </button>
          <button className="bg-red-600 px-8 py-4 rounded text-xl font-semibold hover:bg-red-700">
            Business Email Lists
          </button>
        </div>
      </section>

      <section className="p-10 bg-white">
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-900">
          Search Business Leads
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <input
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border p-3 rounded text-gray-900"
          />

          <input
            type="text"
            placeholder="Enter State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="border p-3 rounded text-gray-900"
          />

          <input
            type="text"
            placeholder="Enter Industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="border p-3 rounded text-gray-900"
          />

          <div className="flex gap-2">
            <button
              onClick={searchLeads}
              className="bg-blue-700 text-white px-6 py-3 rounded hover:bg-blue-800"
            >
              Search
            </button>

            <button
              onClick={clearSearch}
              className="bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700"
            >
              Clear
            </button>
          </div>
        </div>
      </section>

      <section className="p-10 bg-gray-100">
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-900">
          Available Leads
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border bg-white text-gray-900">
            <thead className="bg-blue-700 text-white">
              <tr>
                <th className="p-3">Company</th>
                <th className="p-3">City</th>
                <th className="p-3">State</th>
                <th className="p-3">Industry</th>
                <th className="p-3">Employees</th>
              </tr>
            </thead>

            <tbody>
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-5 text-center text-red-600">
                    No leads found
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="border-b text-center hover:bg-gray-100">
                    <td className="p-3 text-gray-800">{lead.company_name}</td>
                    <td className="p-3 text-gray-800">{lead.city}</td>
                    <td className="p-3 text-gray-800">{lead.state}</td>
                    <td className="p-3 text-gray-800">{lead.industry}</td>
                    <td className="p-3 text-gray-800">{lead.employee_size}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}