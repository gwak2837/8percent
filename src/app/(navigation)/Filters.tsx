'use client'

import IconArrow from '@/svg/IconArrow'
import { useRouter, useSearchParams } from 'next/navigation'
import { type ChangeEvent } from 'react'

import { CVGR_VALUES, FILTER_KEYS, LOAN_VALUES } from '../util/filter'

type Props = {
  titles: string[][]
}

export default function Filters({ titles }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function handleFilterClear() {
    const newSearchParams = new URLSearchParams(Array.from(searchParams.entries()))
    FILTER_KEYS.forEach((key) => newSearchParams.delete(key))
    router.push(`?${newSearchParams}`, { scroll: false })
  }

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
    <div className="flex flex-col gap-6 whitespace-nowrap rounded-xl bg-gray-100 p-4 dark:bg-gray-800">
      <button
        className="rounded-lg bg-red-500 p-2 font-semibold text-white opacity-80 transition hover:bg-red-600 sm:text-lg"
        onClick={handleFilterClear}
      >
        전체 초기화
      </button>
      {[
        {
          key: FILTER_KEYS[0],
          title: '유형',
          checks: [...new Set(titles.map((title) => title[0]))],
        },
        {
          key: FILTER_KEYS[1],
          title: '지역',
          checks: [...new Set(titles.map((title) => title[2]))],
        },
        {
          key: FILTER_KEYS[2],
          title: '수익률',
          checks: CVGR_VALUES,
        },
        {
          key: FILTER_KEYS[3],
          title: '모집 금액',
          checks: LOAN_VALUES,
        },
      ].map((filter) => (
        <div className="grid gap-4" key={filter.key}>
          <label className="peer flex cursor-pointer items-center gap-2">
            <h4 className="text-xl font-semibold">{filter.title}</h4>
            <input className="peer hidden" type="checkbox" />
            <IconArrow className="w-6 peer-checked:rotate-180" />
          </label>
          <div className="grid max-h-[20vh] grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-3 gap-y-2 overflow-y-auto rounded-xl bg-white p-3 px-4 peer-has-[:checked]:hidden md:max-h-[50vh] dark:bg-gray-700">
            {filter.checks.map((type, index) => (
              <label className="flex cursor-pointer items-center gap-2" key={index}>
                <input
                  checked={searchParams.getAll(filter.key).some((value) => value === type)}
                  className="peer h-5 w-5 cursor-pointer rounded text-violet-600 transition duration-200 ease-in-out focus:ring-0"
                  onChange={(e) => handleFilterChange(e, filter.key)}
                  type="checkbox"
                  value={type}
                />
                <span className="text-lg peer-checked:font-bold peer-checked:text-violet-600 peer-checked:dark:text-violet-300">
                  {type}
                </span>
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
      {FILTER_KEYS.map((filter) => (
        <div key={filter}>
          <h4 className="mb-4 bg-gray-300 p-2 text-xl font-semibold dark:bg-gray-700" />
          <div className="grid max-h-[30vh] grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-2 overflow-y-auto rounded-xl bg-gray-300 p-3 px-4 sm:max-h-[10vh] dark:bg-gray-700" />
        </div>
      ))}
    </div>
  )
}
