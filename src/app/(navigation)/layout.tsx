import type { ReactNode } from 'react'

import SearchForm from './SearchForm'

type Props = {
  children: ReactNode
  params: { query: string }
}

export default function HomeLayout({ children }: Props) {
  return (
    <main className="mx-auto max-w-screen-xl p-5">
      <h3 className="text-2xl font-bold">지난 투자 상품</h3>
      <ul className="mb-7 mt-6 flex gap-4">
        <li>전체</li>
        <li>부동산</li>
        <li>스페셜 딜</li>
      </ul>
      <SearchForm />
      <div className="grid gap-5 md:grid-cols-[300px_1fr]">{children}</div>
    </main>
  )
}
