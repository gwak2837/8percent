export function searchParamsToString(searchParams: Record<string, string | string[]>): string {
  return Object.entries(searchParams)
    .reduce((acc, [key, value]) => {
      if (key === 'sort') return acc

      if (Array.isArray(value)) {
        value.forEach((v) => acc.append(key, v))
      } else {
        acc.append(key, value)
      }

      return acc
    }, new URLSearchParams())
    .toString()
}
