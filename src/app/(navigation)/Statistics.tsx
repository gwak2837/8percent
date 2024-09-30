'use client'

import StackedVerticalBarChart from './StackedVerticalBarChart'

type Props = {
  titles: string[][]
}

export default function Statistics({ titles }: Props) {
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

  return (
    <>
      <StackedVerticalBarChart
        category="유형"
        className="h-36"
        legendStatistics={legendStatisticsOfType}
      />
      <StackedVerticalBarChart
        category="시"
        className="mb-5 h-56"
        legendStatistics={legendStatisticsOfCity}
      />
    </>
  )
}
