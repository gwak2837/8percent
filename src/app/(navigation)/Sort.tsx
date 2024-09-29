import Link from 'next/link'

import { searchParamsToString } from '../util/searchParams'
import { sorts } from '../util/sort'

type Props = {
  searchParams?: Record<string, string | string[]>
}

export default function Sort({ searchParams }: Props) {
  const searchParamsString = searchParamsToString(searchParams ?? {})

  return (
    <ul className="flex gap-2 overflow-auto whitespace-nowrap pb-5">
      {sorts.map((sort) => (
        <li key={sort}>
          <Link
            aria-disabled={sort === searchParams?.sort}
            aria-selected={sort === searchParams?.sort}
            className="cursor-pointer rounded-md bg-gray-100 px-2 py-1 text-sm transition hover:bg-gray-300 aria-disabled:pointer-events-none aria-selected:bg-violet-600 aria-selected:text-white dark:bg-gray-600 dark:hover:bg-gray-800 dark:aria-selected:bg-violet-800"
            href={`?${searchParamsString ? `${searchParamsString}&` : ''}sort=${sort.replaceAll(' ', '+')}`}
            scroll={false}
          >
            {sort}
          </Link>
        </li>
      ))}
    </ul>
  )
}
