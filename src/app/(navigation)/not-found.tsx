import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold">404</h1>
        <p className="mb-8 text-2xl">검색 결과가 없습니다</p>
        <Link
          className="rounded bg-violet-500 px-4 py-2 text-white transition duration-300 ease-in-out hover:bg-violet-600"
          href="/"
        >
          처음으로 돌아가기
        </Link>
      </div>
    </div>
  )
}
