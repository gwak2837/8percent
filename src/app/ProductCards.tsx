import type { Product } from './(navigation)/page'

import ProductCard from './ProductCard'
import ProductCardsCSR from './ProductCardsCSR'

const LIMIT = 12

type Props = {
  products: Product[]
}

export default function ProductCards({ products }: Props) {
  return (
    <>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
        {products.slice(0, LIMIT).map((product) => (
          <ProductCard key={product.index} product={product} />
        ))}
      </ul>
      {products.length > LIMIT && <ProductCardsCSR limit={LIMIT} products={products} />}
    </>
  )
}
