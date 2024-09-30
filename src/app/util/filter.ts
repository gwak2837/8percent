import type { Product } from '../(navigation)/page'

export function filterProducts(
  products: Product[],
  searchParams: Record<string, string | string[]>,
) {
  const typeFilter = searchParams.type
  const cityFilter = searchParams.city
  const cvgrFilter = searchParams.cvgr
  const loanFilter = searchParams.loan

  if (!typeFilter && !cityFilter && !cvgrFilter && !loanFilter) return products

  return products.filter((product) => {
    const title = product.title.split(' ')
    return (
      (!typeFilter || typeFilter.includes(title[0])) &&
      (!cityFilter || cityFilter.includes(title[2]))
    )
  })
}

export const FILTER_KEYS = ['type', 'city', 'cvgr', 'loan'] as const
