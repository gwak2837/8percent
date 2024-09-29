import type { Product } from './(navigation)/page'

import ProductCard from './ProductCard'
import ProductCardsCSR from './ProductCardsCSR'

const LIMIT = 12

type Props = {
  products: Product[]
}

export default function ProductCards({ products }: Props) {
  if (products.length === 0) {
    return (
      <div className="h-[50vh] content-center text-center text-2xl font-bold">
        검색 결과가 없습니다.
      </div>
    )
  }

  return (
    <>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
        {products.slice(0, LIMIT).map((product) => (
          <ProductCard key={product.index} product={product} />
        ))}
        {products.length > LIMIT && <ProductCardsCSR limit={LIMIT} products={products} />}
      </ul>
    </>
  )
}
