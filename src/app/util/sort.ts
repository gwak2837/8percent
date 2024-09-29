import type { Product } from '../(navigation)/page'

export function sortProducts(products: Product[], sort?: TSort) {
  if (!sort) return products

  return products.sort((a, b) => {
    if (sort === '최신순') {
      return b.index - a.index
    } else if (sort === '수익률 높은 순') {
      return b.earningRate - a.earningRate
    } else if (sort === '수익률 낮은 순') {
      return a.earningRate - b.earningRate
    } else if (sort === '투자기간 짧은 순') {
      return a.length - b.length
    } else if (sort === '투자기간 긴 순') {
      return b.length - a.length
    } else if (sort === '모집금액 높은 순') {
      return b.amount - a.amount
    } else if (sort === '모집금액 낮은 순') {
      return a.amount - b.amount
    } else {
      return b.index - a.index
    }
  })
}

export const sorts = [
  '최신순',
  '수익률 높은 순',
  '수익률 낮은 순',
  '모집금액 높은 순',
  '모집금액 낮은 순',
  '투자기간 짧은 순',
  '투자기간 긴 순',
] as const

export type TSort = (typeof sorts)[number]
