'use client'

import { Bullet, Label, Legend, Root, Tooltip, p50, percent } from '@amcharts/amcharts5'
import {
  AxisRendererX,
  AxisRendererY,
  CategoryAxis,
  ColumnSeries,
  ValueAxis,
} from '@amcharts/amcharts5/xy'
import { useEffect } from 'react'

import { createVerticalChart, setAnimatedAndDarkThemes } from '../util/amChart5'

type Props = {
  category: string
  className?: string
  legendStatistics: Record<string, number>
}

export default function StackedVerticalBarChart({ category, className, legendStatistics }: Props) {
  const id = `StackedVerticalBarChart-${category}`

  useEffect(() => {
    const root = Root.new(id)
    const chart = createVerticalChart(root)
    setAnimatedAndDarkThemes(root)

    const data = [{ category, ...legendStatistics }]

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    const yRenderer = AxisRendererY.new(root, {})
    const yAxis = chart.yAxes.push(
      CategoryAxis.new(root, {
        categoryField: 'category',
        renderer: yRenderer,
        tooltip: Tooltip.new(root, {}),
      }),
    )

    yRenderer.grid.template.setAll({
      location: 1,
    })

    yAxis.data.setAll(data)

    const xAxis = chart.xAxes.push(
      ValueAxis.new(root, {
        min: 0,
        max: 100,
        numberFormat: "#'%'",
        strictMinMax: true,
        calculateTotals: true,
        renderer: AxisRendererX.new(root, {
          minGridDistance: 40,
          strokeOpacity: 0.1,
        }),
      }),
    )

    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    const legend = chart.children.push(
      Legend.new(root, {
        centerX: p50,
        x: p50,
      }),
    )

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    function makeSeries(name: string, fieldName: string) {
      const series = chart.series.push(
        ColumnSeries.new(root, {
          name: name,
          stacked: true,
          xAxis: xAxis,
          yAxis: yAxis,
          baseAxis: yAxis,
          valueXField: fieldName,
          valueXShow: 'valueXTotalPercent',
          categoryYField: 'category',
        }),
      )

      series.columns.template.setAll({
        tooltipText: "{name}: {valueXTotalPercent.formatNumber('#.0')}%",
        tooltipY: percent(10),
      })

      series.data.setAll(data)

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear()

      series.bullets.push(() => {
        return Bullet.new(root, {
          sprite: Label.new(root, {
            text: "{valueXTotalPercent.formatNumber('#.#')}%", // 레이블 표시
            fill: root.interfaceColors.get('alternativeText'),
            centerY: p50,
            centerX: p50,
            populateText: true,
          }),
        })
      })

      legend.data.push(series)
    }

    Object.entries(legendStatistics)
      .sort((a, b) => b[1] - a[1])
      .forEach(([key]) => makeSeries(key, key))

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000)

    return () => {
      root.dispose()
    }
  }, [])

  return <div className={className} id={id} />
}
