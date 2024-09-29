import { ProductCardSkeleton } from '../ProductCard'
import { FiltersSkeleton } from './Filters'
import Sort from './Sort'

export default function Loading() {
  return (
    <>
      <FiltersSkeleton />
      <div className="flex min-w-0 flex-col gap-1">
        <Sort />
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
          {Array(12)
            .fill(0)
            .map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
        </ul>
      </div>
    </>
  )
}
