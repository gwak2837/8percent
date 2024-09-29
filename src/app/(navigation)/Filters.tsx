'use client'

import type { ChangeEvent } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

type Props = {
  titles: string[][]
}

export default function Filters({ titles }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function handleFilterChange(e: ChangeEvent<HTMLInputElement>, key: string) {
    const newSearchParams = new URLSearchParams(Array.from(searchParams.entries()))

    if (e.target.checked) {
      newSearchParams.append(key, e.target.value)
    } else {
      newSearchParams.delete(key, e.target.value)
    }

    router.push(`?${newSearchParams}`)
  }

  return (
    <div className="flex flex-col gap-8 whitespace-nowrap rounded-xl bg-gray-100 p-4 dark:bg-gray-800">
      <button
        className="rounded-lg bg-red-500 p-2 font-semibold text-white opacity-80 sm:text-lg"
        onClick={() => router.push(`?`)}
      >
        초기화
      </button>
      {[
        { key: 'type', title: '유형', index: 0 },
        { key: 'city', title: '시', index: 2 },
        { key: 'district', title: '구/동/읍', index: 3 },
      ].map((filter) => (
        <div key={filter.key}>
          <h4 className="mb-4 text-xl font-semibold">{filter.title}</h4>
          <div className="grid max-h-[30vh] grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-2 overflow-y-auto rounded-xl bg-white p-3 px-4 sm:max-h-[10vh] dark:bg-gray-700">
            {[...new Set(titles.map((title) => title[filter.index]))].map((type, index) => (
              <label className="flex cursor-pointer items-center gap-2" key={index}>
                <input
                  checked={searchParams.getAll(filter.key).some((value) => value === type)}
                  className="h-5 w-5 rounded text-blue-600 transition duration-200 ease-in-out focus:ring-0"
                  onChange={(e) => handleFilterChange(e, filter.key)}
                  type="checkbox"
                  value={type}
                />
                <span className="text-lg">{type}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export function FiltersSkeleton() {
  return (
    <div className="flex flex-col gap-8 whitespace-nowrap rounded-xl bg-gray-200 p-4 dark:bg-gray-800">
      <div className="rounded-lg bg-gray-300 p-2 sm:p-3 sm:text-lg" />
      {[{ title: '유형' }, { title: '시' }, { title: '구/동/읍' }].map((filter) => (
        <div key={filter.title}>
          <h4 className="mb-4 bg-gray-300 p-2 text-xl font-semibold" />
          <div className="grid max-h-[30vh] grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-2 overflow-y-auto rounded-xl bg-gray-300 p-3 px-4 sm:max-h-[10vh]" />
        </div>
      ))}
    </div>
  )
}
