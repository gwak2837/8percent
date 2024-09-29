export default function Sort() {
  return (
    <ul className="flex gap-2 overflow-auto whitespace-nowrap">
      {['최신순', '수익률 높은 순', '수익률 낮은 순', '투자기간 짧은 순', '투자기간 긴 순'].map(
        (sort) => (
          <li key={sort}>
            <button className="cursor-pointer rounded-md bg-gray-100 px-2 py-1 text-sm hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-700">
              {sort}
            </button>
          </li>
        ),
      )}
    </ul>
  )
}
