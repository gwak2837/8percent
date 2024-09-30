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
  const chartElementId = `StackedVerticalBarChart-${category}`
  const legendElementId = `${chartElementId}-legend`

  useEffect(() => {
    const root = Root.new(chartElementId)
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

    // Create chartRoot and chart
    // https://www.amcharts.com/docs/v5/concepts/legend/#Sizing_external_legend_container
    const legendRoot = Root.new(legendElementId)
    setAnimatedAndDarkThemes(legendRoot)

    legendRoot.container.setAll({
      // width: p100,
      // height: p100,
    })

    const legend = legendRoot.container.children.push(
      Legend.new(legendRoot, {
        centerY: percent(50),
        y: percent(50),
        layout: legendRoot.horizontalLayout,
      }),
    )

    // Resize legend to actual height of its content
    legend.events.on('boundschanged', () => {
      const legendElement = document.getElementById(legendElementId)
      if (!legendElement) return

      const legendStyle = legendElement.style
      const legendHeight = legend.height()

      legendElement.parentElement!.style.height = legendHeight + 16 + 'px'
      legendStyle.height = legendHeight + 'px'
      legendStyle.width = legend.width() + 'px'
    })

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
        tooltipText: "{name}: {valueXTotalPercent.formatNumber('#.0')}% ({valueX}개)",
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

      series.columns.template.onPrivate('width', (width, target) => {
        target?.dataItem?.bullets?.forEach((bullet) => {
          if ((width ?? 0) > bullet.get('sprite').width() + 1) {
            bullet.get('sprite').show()
          } else {
            bullet.get('sprite').hide()
          }
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
      legendRoot.dispose()
    }
  }, [legendStatistics])

  return (
    <>
      <div className={className} id={chartElementId} />
      <div className="h-11 justify-center overflow-x-scroll">
        <div className="mx-auto h-7 w-full" id={legendElementId} />
      </div>
    </>
  )
}
