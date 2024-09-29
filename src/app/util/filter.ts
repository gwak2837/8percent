import type { Product } from '../(navigation)/page'

export function filterProducts(
  products: Product[],
  searchParams: Record<string, string | string[]>,
) {
  const typeFilter = searchParams.type
  const cityFilter = searchParams.city
  const districtFilter = searchParams.district

  return products.filter((product) => {
    const title = product.title.split(' ')
    return (
      (!typeFilter || typeFilter.includes(title[0])) &&
      (!cityFilter || cityFilter.includes(title[2])) &&
      (!districtFilter || districtFilter.includes(title[3]))
    )
  })
}
