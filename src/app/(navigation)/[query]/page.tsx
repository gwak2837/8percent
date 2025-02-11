import type { TSort } from '@/app/util/sort'

import ProductCards from '@/app/ProductCards'
import { filterProducts } from '@/app/util/filter'
import { sortProducts } from '@/app/util/sort'
import { mockedProducts } from '@/mock/data'
import { notFound } from 'next/navigation'

import Filters from '../Filters'
import Sort from '../Sort'
import Statistics from '../Statistics'
import { type Product } from '../page'

async function getProducts() {
  try {
    const res = await fetch('https://temp-test.d2sqh8spejkbjc.amplifyapp.com/api/test')
    return (await res.json()) as Product[]
  } catch (error) {
    console.error('👀 ~ ', error)
    return mockedProducts
  }
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
  const sortedProducts = sortProducts(filteredProducts, searchParams.sort as TSort)

  return (
    <>
      <Filters titles={titles} />
      <div className="flex min-w-0 flex-col gap-1">
        <Sort searchParams={searchParams} />
        {filteredProducts.length > 0 && <Statistics products={filteredProducts} />}
        <ProductCards products={sortedProducts} />
      </div>
    </>
  )
}
