'use client'

import IconArrow from '@/svg/IconArrow'

import type { Product } from './page'

import { formatLoan } from '../util/format'
import StackedVerticalBarChart from './StackedVerticalBarChart'

type Props = {
  products: Product[]
}

export default function Statistics({ products }: Props) {
  const titles = products.map((product) => product.title.split(' '))

  const legendStatisticsOfType = titles.reduce(
    (acc, cur) => {
      const legend = cur[0]
      acc[legend] = (acc[legend] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const legendStatisticsOfCity = titles.reduce(
    (acc, cur) => {
      const legend = cur[2]
      acc[legend] = (acc[legend] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const legendStatisticsOfCVGR = products.reduce(
    (acc, cur) => {
      const legend = `${cur.earningRate}%`
      acc[legend] = (acc[legend] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const legendStatisticsOfLoan = products.reduce(
    (acc, cur) => {
      const legend = formatLoan(cur.amount)
      acc[legend] = (acc[legend] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <div className="mb-4 grid gap-2">
      <label className="peer flex cursor-pointer items-center gap-2">
        <h3 className="text-xl font-semibold">통계</h3>
        <input className="peer hidden" type="checkbox" />
        <IconArrow className="w-6 peer-checked:rotate-180" />
      </label>
      <div className="min-w-0 rounded-xl bg-gray-100 px-4 peer-has-[:checked]:hidden dark:bg-gray-800">
        <StackedVerticalBarChart
          category="유형"
          className="h-28"
          legendStatistics={legendStatisticsOfType}
        />
        <StackedVerticalBarChart
          category="지역"
          className="h-28"
          legendStatistics={legendStatisticsOfCity}
        />
        <StackedVerticalBarChart
          category="수익"
          className="h-28"
          legendStatistics={legendStatisticsOfCVGR}
        />
        <StackedVerticalBarChart
          category="금액"
          className="h-28"
          legendStatistics={legendStatisticsOfLoan}
        />
      </div>
    </div>
  )
}
