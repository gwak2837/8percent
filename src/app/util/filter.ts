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
    const loanRange = getLoanRange(product.amount)
    const cvgrRange = getCVGRRange(product.earningRate)
    return (
      (!typeFilter || typeFilter.includes(title[0])) &&
      (!cityFilter || cityFilter.includes(title[2])) &&
      (!cvgrFilter ||
        (Array.isArray(cvgrFilter) ? cvgrFilter.includes(cvgrRange) : cvgrFilter === cvgrRange)) &&
      (!loanFilter ||
        (Array.isArray(loanFilter) ? loanFilter.includes(loanRange) : loanFilter === loanRange))
    )
  })
}

export const FILTER_KEYS = ['type', 'city', 'cvgr', 'loan'] as const

export const CVGR_VALUES = ['8% 미만', '8% 대', '9% 대', '10% 대', '11% 대', '12% 이상'] as const

function getCVGRRange(cvgr: number): (typeof CVGR_VALUES)[number] {
  if (cvgr < 8) return '8% 미만'
  if (cvgr < 9) return '8% 대'
  if (cvgr < 10) return '9% 대'
  if (cvgr < 11) return '10% 대'
  if (cvgr < 12) return '11% 대'
  return '12% 이상'
}

export const LOAN_VALUES = [
  '1억원 미만',
  '1억원 대',
  '2억원 대',
  '3억원 대',
  '4억원 대',
  '5억원 이상',
] as const

function getLoanRange(loan: number): (typeof LOAN_VALUES)[number] {
  if (loan < 100_000_000) return '1억원 미만'
  if (loan < 200_000_000) return '1억원 대'
  if (loan < 300_000_000) return '2억원 대'
  if (loan < 400_000_000) return '3억원 대'
  if (loan < 500_000_000) return '4억원 대'
  return '5억원 이상'
}
