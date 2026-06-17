"use client"

import { FormEvent, useEffect, useState } from "react"

export default function Home() {
  const [leads, setLeads] = useState<any[]>([])
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [industry, setIndustry] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })

  useEffect(() => {
    getAllLeads()
  }, [])

  function getAllLeads() {
    fetch("https://leadfinder-d7e2.onrender.com/leads")
      .then((response) => response.json())
      .then((data) => setLeads(data))
      .catch((error) => console.log(error))
  }

  function searchLeads() {
    fetch("https://leadfinder-d7e2.onrender.com/filter-leads", {
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

  function handleContactSubmit(e: FormEvent) {
    e.preventDefault()
    setContactForm({ name: "", email: "", company: "", message: "" })
  }

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <main className="min-h-screen bg-white">
      <header className="flex items-center justify-between px-4 sm:px-10 py-5 bg-gray-100">
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold text-blue-700">LeadFinder</h1>
          <p className="text-sm text-gray-700">Marketing Solutions</p>
        </div>

        <div className="text-right">
          <p className="text-base sm:text-2xl text-blue-700">Call Us Today!</p>
          <p className="text-xl sm:text-3xl font-bold text-red-600">9876543210</p>
        </div>
      </header>

      <nav className="sticky top-0 z-50 bg-white shadow">
        <div className="flex items-center justify-between px-4 sm:px-10 py-4">
          <span className="text-lg font-bold text-blue-700 sm:hidden">LeadFinder</span>

          <button
            type="button"
            className="sm:hidden p-2 text-gray-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <div className="hidden sm:flex justify-center gap-10 text-lg font-medium text-gray-800 w-full">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-blue-700 transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="sm:hidden flex flex-col gap-4 px-4 pb-4 text-lg font-medium text-gray-800 border-t">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-blue-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      <section
        id="home"
        className="flex flex-col items-center justify-center text-center bg-blue-700 text-white py-20 sm:py-32 px-5"
      >
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold max-w-5xl leading-tight">
          Find Your Perfect Business Leads Faster
        </h2>

        <p className="mt-6 sm:mt-8 text-lg sm:text-2xl max-w-4xl">
          Targeted business lists, email marketing lists, and sales leads for your business growth.
        </p>

        <div className="flex gap-4 sm:gap-5 mt-8 sm:mt-10 flex-wrap justify-center">
          <button className="bg-red-600 px-6 sm:px-8 py-3 sm:py-4 rounded text-base sm:text-xl font-semibold hover:bg-red-700 transition-colors">
            Business Lists
          </button>
          <button className="bg-red-600 px-6 sm:px-8 py-3 sm:py-4 rounded text-base sm:text-xl font-semibold hover:bg-red-700 transition-colors">
            Residential Lists
          </button>
          <button className="bg-red-600 px-6 sm:px-8 py-3 sm:py-4 rounded text-base sm:text-xl font-semibold hover:bg-red-700 transition-colors">
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

      <section id="about" className="py-16 sm:py-20 px-4 sm:px-10 bg-white">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-blue-700 mb-6">
          About LeadFinder
        </h2>

        <p className="max-w-3xl mx-auto text-center text-gray-700 text-base sm:text-lg leading-relaxed mb-12">
          LeadFinder is a lead generation platform designed to help businesses find targeted prospects
          across different industries and locations. Our goal is to simplify business development by
          providing accurate lead data, smart search capabilities, and AI-powered lead insights.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              title: "Quality Leads",
              description: "Access verified, accurate business data to fuel your outreach campaigns.",
              icon: "✓",
            },
            {
              title: "Fast Search",
              description: "Filter leads by location, industry, and company size in seconds.",
              icon: "⚡",
            },
            {
              title: "AI-Powered Insights",
              description: "Leverage machine learning to prioritize your highest-value prospects.",
              icon: "🤖",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-blue-700 text-white rounded-full flex items-center justify-center text-xl">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-blue-700 mb-2">{card.title}</h3>
              <p className="text-gray-600">{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="py-16 sm:py-20 px-4 sm:px-10 bg-gray-100">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-blue-700 mb-12">
          Our Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            {
              title: "Business Leads",
              description: "Find targeted companies based on location and industry.",
            },
            {
              title: "Email Marketing Lists",
              description: "Access verified business email databases.",
            },
            {
              title: "Industry Targeting",
              description: "Filter leads by industry and business category.",
            },
            {
              title: "Lead Scoring",
              description: "Use Machine Learning lead scoring to prioritize prospects.",
            },
          ].map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border-t-4 border-red-600"
            >
              <h3 className="text-xl font-bold text-blue-700 mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="py-16 sm:py-20 px-4 sm:px-10 bg-white">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-blue-700 mb-10">
          Contact Us
        </h2>

        <form
          onSubmit={handleContactSubmit}
          className="max-w-xl mx-auto space-y-5"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={contactForm.name}
              onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
              className="w-full border border-gray-300 p-3 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={contactForm.email}
              onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
              className="w-full border border-gray-300 p-3 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input
              id="company"
              type="text"
              required
              value={contactForm.company}
              onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
              className="w-full border border-gray-300 p-3 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={contactForm.message}
              onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
              className="w-full border border-gray-300 p-3 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-700 resize-y"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded font-semibold text-lg hover:bg-red-700 transition-colors"
          >
            Submit
          </button>
        </form>
      </section>

      <footer className="bg-blue-700 text-white text-center py-6 px-4">
        <p>© 2026 LeadFinder. All Rights Reserved.</p>
      </footer>
    </main>
  )
}
