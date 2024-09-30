'use client'

import IconX from '@/svg/IconX'
import { useParams, useRouter } from 'next/navigation'
import { type FormEvent, useRef } from 'react'

export default function SearchForm() {
  const router = useRouter()
  const params = useParams()
  const query = (params.query ?? '') as string
  const decodedQuery = decodeURIComponent(query)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const query = (e.target as HTMLFormElement).query.value
    router.push(`/${query}`)
  }

  function handleReset() {
    if (!inputRef.current) return
    inputRef.current.value = ''
    inputRef.current.focus()
  }

  return (
    <form className="my-4 grid w-full gap-4 sm:grid-cols-[1fr_auto]" onSubmit={handleSubmit}>
      <div className="relative">
        <input
          className="w-full rounded-lg border px-4 py-2"
          defaultValue={decodedQuery}
          name="query"
          onKeyDown={(e) => e.key === 'Escape' && handleReset()}
          ref={inputRef}
        />
        <button
          className="text-stroke-3 absolute right-0 top-1/2 -translate-y-1/2 px-4 py-2"
          onClick={handleReset}
          type="button"
        >
          <IconX className="w-6 text-gray-400 dark:text-gray-500" />
        </button>
      </div>
      <button className="rounded-lg bg-violet-500 px-4 py-2 text-white transition hover:bg-violet-600 dark:bg-violet-600 dark:hover:bg-violet-700">
        검색
      </button>
    </form>
  )
}
