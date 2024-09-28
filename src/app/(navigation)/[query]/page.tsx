import ProductCards from '@/app/ProductCards'
import { notFound } from 'next/navigation'

import type { Product } from '../page'

async function getProducts() {
  const res = await fetch('https://temp-test.d2sqh8spejkbjc.amplifyapp.com/api/test')
  return (await res.json()) as Product[]
}

type Props = {
  params: { query: string }
}

export default async function Search({ params: { query } }: Props) {
  const products = await getProducts()
  const decodedQuery = decodeURIComponent(query)
  const filteredProducts = products.filter((product) => product.title.includes(decodedQuery))

  if (filteredProducts.length === 0) {
    notFound()
  }

  return <ProductCards products={filteredProducts} />
}
