import ProductCards from '../ProductCards'
import Filters from './Filters'

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

export default async function Home() {
  const products = await getProducts()

  return (
    <>
      <Filters products={products.map((product) => product.title.split(' '))} />
      <ProductCards products={products} />
    </>
  )
}
