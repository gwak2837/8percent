import ProductCards from '@/app/ProductCards'
import { filterProducts } from '@/app/util/filter'
import { notFound } from 'next/navigation'

import Filters from '../Filters'
import { type Product } from '../page'

async function getProducts() {
  const res = await fetch('https://temp-test.d2sqh8spejkbjc.amplifyapp.com/api/test')
  return (await res.json()) as Product[]
}

type Props = {
  params: { query: string }
  searchParams: Record<string, string | string[]>
}

export default async function Search({ params: { query }, searchParams }: Props) {
  const products = await getProducts()
  const decodedQuery = decodeURIComponent(query)
  const searchedProducts = products.filter((product) => product.title.includes(decodedQuery))

  if (searchedProducts.length === 0) {
    notFound()
  }

  const titles = products.map((product) => product.title.split(' '))
  const filteredProducts = filterProducts(searchedProducts, searchParams)

  return (
    <>
      <Filters titles={titles} />
      <ProductCards products={filteredProducts} />
    </>
  )
}
