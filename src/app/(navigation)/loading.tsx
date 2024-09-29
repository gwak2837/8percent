import { ProductCardSkeleton } from '../ProductCard'
import { FiltersSkeleton } from './Filters'

export default function Loading() {
  return (
    <>
      <FiltersSkeleton />
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
        {Array(12)
          .fill(0)
          .map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
      </ul>
    </>
  )
}
