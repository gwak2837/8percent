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

    router.push(`?${newSearchParams}`, { scroll: false })
  }

  return (
    <div className="flex max-h-full flex-col gap-8 whitespace-nowrap rounded-xl bg-gray-100 p-4 dark:bg-gray-800">
      <button
        className="rounded-lg bg-red-500 p-2 font-semibold text-white opacity-80 sm:text-lg"
        onClick={() => router.push(`?`)}
      >
        전체 초기화
      </button>
      {[
        { key: 'type', title: '유형', index: 0 },
        { key: 'city', title: '시', index: 2 },
        { key: 'district', title: '구/동/읍', index: 3 },
      ].map((filter) => (
        <div className="grid gap-4" key={filter.key}>
          <label className="peer flex items-center gap-2">
            <h4 className="text-xl font-semibold">{filter.title}</h4>
            <input className="peer hidden" type="checkbox" />
            <svg
              className="peer-checked:rotate-180"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </label>
          <div className="grid max-h-[20vh] grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-2 overflow-y-auto rounded-xl bg-white p-3 px-4 peer-has-[:checked]:hidden sm:max-h-[10vh] md:max-h-screen dark:bg-gray-700">
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
      <div className="rounded-lg bg-gray-300 p-2 sm:p-3 sm:text-lg dark:bg-gray-700" />
      {[{ title: '유형' }, { title: '시' }, { title: '구/동/읍' }].map((filter) => (
        <div key={filter.title}>
          <h4 className="mb-4 bg-gray-300 p-2 text-xl font-semibold dark:bg-gray-700" />
          <div className="grid max-h-[30vh] grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-2 overflow-y-auto rounded-xl bg-gray-300 p-3 px-4 sm:max-h-[10vh] dark:bg-gray-700" />
        </div>
      ))}
    </div>
  )
}
