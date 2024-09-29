import Link from 'next/link'

import { sorts } from '../util/sort'

type Props = {
  searchParams: string
}

export default function Sort({ searchParams }: Props) {
  return (
    <ul className="flex gap-2 overflow-auto whitespace-nowrap pb-5">
      {sorts.map((sort) => (
        <li key={sort}>
          <Link
            className="cursor-pointer rounded-md bg-gray-100 px-2 py-1 text-sm hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-700"
            href={`?${[searchParams, `sort=${sort}`].join('&')}`}
            scroll={false}
          >
            {sort}
          </Link>
        </li>
      ))}
    </ul>
  )
}
