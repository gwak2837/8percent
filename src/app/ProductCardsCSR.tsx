'use client'

import { useState } from 'react'

import type { Product } from './(navigation)/page'

import ProductCard from './ProductCard'

type Props = {
  products: Product[]
  limit: number
}

export default function ProductCardsCSR({ products, limit }: Props) {
  const [count, setCount] = useState(0)

  return (
    <>
      <ul className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
        {products.slice(limit, limit + count).map((product) => (
          <ProductCard key={product.index} product={product} />
        ))}
      </ul>
      {products.length > limit + count && (
        <button
          className="my-10 w-full cursor-pointer border p-4 text-center text-lg"
          onClick={() => setCount((prev) => prev + limit)}
        >
          지난 투자상품 더 보기
        </button>
      )}
    </>
  )
}
