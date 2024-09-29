import ProductCards from '@/app/ProductCards'
import { filterProducts } from '@/app/util/filter'
import { searchParamsToString } from '@/app/util/searchParams'
import { notFound } from 'next/navigation'

import Filters from '../Filters'
import Sort from '../Sort'
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
  const searchParamsString = searchParamsToString(searchParams)

  return (
    <>
      <Filters titles={titles} />
      <div className="grid gap-4">
        <Sort searchParams={searchParamsString} />
        <ProductCards products={filteredProducts} />
      </div>
    </>
  )
}
