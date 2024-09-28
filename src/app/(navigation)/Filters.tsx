'use client'

import { useState } from 'react'

type Props = {
  products: string[][]
}

export default function Filters({ products }: Props) {
  const [filters, setFilters] = useState({
    type: '',
    unit: '',
    city: '',
    district: '',
    neighborhood: '',
    apartment: '',
  })

  // 필터 변경 핸들러
  const handleFilterChange = (e, filterType) => {
    setFilters({
      ...filters,
      [filterType]: e.target.value,
    })
  }

  return (
    <>
      <div className="mb-8 grid gap-8 whitespace-nowrap">
        <div>
          <h2 className="mb-4 text-2xl font-semibold">유형</h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2">
            {[...new Set(products.map((item) => item[0]))].map((type, index) => (
              <label className="flex cursor-pointer items-center space-x-2" key={index}>
                <input
                  className="form-checkbox h-5 w-5 rounded text-blue-600 transition duration-200 ease-in-out focus:ring-0"
                  onChange={(e) => handleFilterChange(e, 'type')}
                  type="checkbox"
                  value={type}
                />
                <span className="text-lg">{type}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-2xl font-semibold">시</h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(75px,1fr))] gap-2">
            {[...new Set(products.map((item) => item[2]))].map((city, index) => (
              <label className="flex cursor-pointer items-center space-x-2" key={index}>
                <input
                  className="form-checkbox h-5 w-5 rounded text-blue-600 transition duration-200 ease-in-out focus:ring-0"
                  onChange={(e) => handleFilterChange(e, 'city')}
                  type="checkbox"
                  value={city}
                />
                <span className="text-lg">{city}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-2xl font-semibold">구/동/읍</h2>
          <div className="grid max-h-[30vh] grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-2 overflow-y-auto sm:max-h-[10vh]">
            {[...new Set(products.map((item) => item[3]))].map((city, index) => (
              <label className="flex cursor-pointer items-center space-x-2" key={index}>
                <input
                  className="form-checkbox h-5 w-5 rounded text-blue-600 transition duration-200 ease-in-out focus:ring-0"
                  onChange={(e) => handleFilterChange(e, 'city')}
                  type="checkbox"
                  value={city}
                />
                <span className="text-lg">{city}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
