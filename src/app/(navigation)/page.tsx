import type { TSort } from '../util/sort'

import ProductCards from '../ProductCards'
import { filterProducts } from '../util/filter'
import { sortProducts } from '../util/sort'
import Filters from './Filters'
import Sort from './Sort'
import Statistics from './Statistics'

export type Product = {
  index: number
  title: string
  /** 투자금액 (원) */
  amount: number
  /** 투자기간 (개월) */
  length: number
  /** 연 수익률 */
  earningRate: number
  thumbnail: string
}

async function getProducts() {
  const res = await fetch('https://temp-test.d2sqh8spejkbjc.amplifyapp.com/api/test')
  return (await res.json()) as Product[]
}

type Props = {
  searchParams: Record<string, string | string[]>
}

export default async function Home({ searchParams }: Props) {
  const products = await getProducts()
  const titles = products.map((product) => product.title.split(' '))
  const filteredProducts = filterProducts(products, searchParams)
  const sortedProducts = sortProducts(filteredProducts, searchParams.sort as TSort)

  return (
    <>
      <Filters titles={titles} />
      <div className="flex min-w-0 flex-col gap-1">
        <Sort searchParams={searchParams} />
        <Statistics titles={titles} />
        <ProductCards products={sortedProducts} />
      </div>
    </>
  )
}
