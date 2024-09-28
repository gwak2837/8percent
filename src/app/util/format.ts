export function formatCurrency(value: number) {
  return new Intl.NumberFormat('ko-KR').format(value)
}

export function format투자금액(value: number) {
  if (value < 100000000) return `${formatCurrency(value / 10000)}만원`

  const unit = Math.floor(value / 100000000)
  const rest = value % 100000000

  if (!rest) return `${formatCurrency(unit)}억원`

  return `${formatCurrency(unit)}억 ${formatCurrency(rest / 10000)}만원`
}

export function format투자기간(value: number) {
  if (value <= 12) return `${value} 개월`

  const years = Math.floor(value / 12)
  const months = value % 12

  if (!months) return `${formatCurrency(years)}년`

  return `${years}년 ${months}개월`
}
