'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'

type Property = {
  id: string
  title: string
  description: string
  address: string
  price: number
  bedrooms: number
  bathrooms: number
  amenities: string[]
  images: string[]
}

export default function Properties() {
  const router = useRouter()
  const { data: session } = useSession()
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    amenities: [] as string[]
  })

  // Mock data - replace with API call
  const properties: Property[] = [
    {
      id: '1',
      title: 'Modern Downtown Apartment',
      description: 'Beautiful modern apartment in the heart of downtown',
      address: '123 Main St, Downtown',
      price: 2500,
      bedrooms: 2,
      bathrooms: 2,
      amenities: ['Parking', 'Gym', 'Pool'],
      images: ['/placeholder.jpg']
    },
    {
      id: '2',
      title: 'Cozy Studio in West End',
      description: 'Perfect studio apartment for young professionals',
      address: '456 West St, West End',
      price: 1800,
      bedrooms: 1,
      bathrooms: 1,
      amenities: ['Parking', 'Laundry'],
      images: ['/placeholder.jpg']
    }
  ]

  const toggleSaved = async (propertyId: string) => {
    if (!session) {
      router.push('/auth/signin')
      return
    }

    // Implement save/unsave logic
    console.log('Toggle saved:', propertyId)
  }

  const applyFilters = (property: Property) => {
    const meetsMinPrice = !filters.minPrice || property.price >= Number(filters.minPrice)
    const meetsMaxPrice = !filters.maxPrice || property.price <= Number(filters.maxPrice)
    const meetsBedrooms = !filters.bedrooms || property.bedrooms >= Number(filters.bedrooms)
    const meetsBathrooms = !filters.bathrooms || property.bathrooms >= Number(filters.bathrooms)
    const meetsAmenities = filters.amenities.length === 0 || 
      filters.amenities.every(amenity => property.amenities.includes(amenity))

    return meetsMinPrice && meetsMaxPrice && meetsBedrooms && meetsBathrooms && meetsAmenities
  }

  const filteredProperties = properties.filter(applyFilters)

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">
                Min Price
              </label>
              <input
                type="number"
                id="minPrice"
                value={filters.minPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
                Max Price
              </label>
              <input
                type="number"
                id="maxPrice"
                value={filters.maxPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">
                Min Bedrooms
              </label>
              <input
                type="number"
                id="bedrooms"
                value={filters.bedrooms}
                onChange={(e) => setFilters(prev => ({ ...prev, bedrooms: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">
                Min Bathrooms
              </label>
              <input
                type="number"
                id="bathrooms"
                value={filters.bathrooms}
                onChange={(e) => setFilters(prev => ({ ...prev, bathrooms: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amenities
            </label>
            <div className="flex flex-wrap gap-2">
              {['Parking', 'Gym', 'Pool', 'Laundry'].map((amenity) => (
                <button
                  key={amenity}
                  onClick={() => setFilters(prev => ({
                    ...prev,
                    amenities: prev.amenities.includes(amenity)
                      ? prev.amenities.filter(a => a !== amenity)
                      : [...prev.amenities, amenity]
                  }))}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.amenities.includes(amenity)
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {amenity}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProperties.map((property) => (
            <div key={property.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="relative h-48">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => toggleSaved(property.id)}
                  className="absolute top-2 right-2 p-2 rounded-full bg-white shadow"
                >
                  <HeartOutline className="h-6 w-6 text-gray-400" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
                <p className="mt-1 text-gray-500">{property.address}</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">${property.price}/mo</p>
                <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                  <span>{property.bedrooms} bed</span>
                  <span>{property.bathrooms} bath</span>
                </div>
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => router.push(`/properties/${property.id}`)}
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No properties match your filters.</p>
          </div>
        )}
      </div>
    </div>
  )
} 