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
      (!cityFilter || cityFilter.includes(title[2])) &&
      (!cvgrFilter || true) &&
      (!loanFilter || true)
    )
  })
}

export const FILTER_KEYS = ['type', 'city', 'cvgr', 'loan'] as const

export const CVGR_VALUES = ['8% 미만', '8% 대', '9% 대', '10% 대', '11% 대', '12% 이상']

export const LOAN_VALUES = [
  '1억원 미만',
  '1억원 대',
  '2억원 대',
  '3억원 대',
  '4억원 대',
  '5억원 이상',
]
