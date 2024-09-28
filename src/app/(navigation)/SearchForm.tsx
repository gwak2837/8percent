'use client'

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
    <form className="grid w-full grid-cols-[1fr_auto] gap-4 py-4" onSubmit={handleSubmit}>
      <div className="relative">
        <input
          className="w-full rounded border px-4 py-2"
          defaultValue={decodedQuery}
          name="query"
          ref={inputRef}
        />
        <button className="absolute right-0 px-4 py-2" onClick={handleReset} type="button">
          x
        </button>
      </div>
      <button className="rounded bg-violet-500 px-4 py-2 text-white">검색</button>
    </form>
  )
}
