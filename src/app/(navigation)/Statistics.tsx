'use client'

import type { IComponentDataItem } from '@amcharts/amcharts5/.internal/core/render/Component'
import type { DataItem, Slice, Theme } from '@amcharts/amcharts5/index'
import type { IPieSeriesDataItem } from '@amcharts/amcharts5/percent'

import {
  Bullet,
  Container,
  Label,
  Legend,
  Root,
  Scrollbar,
  Tooltip,
  array,
  p50,
  p100,
  percent,
} from '@amcharts/amcharts5/index'
import { PieChart, PieSeries } from '@amcharts/amcharts5/percent'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import am5themes_Dark from '@amcharts/amcharts5/themes/Dark'
import am5xy, {
  AxisRendererX,
  AxisRendererY,
  CategoryAxis,
  ColumnSeries,
  ValueAxis,
  XYChart,
} from '@amcharts/amcharts5/xy'
import { useEffect } from 'react'

import type { Product } from './page'

type Props = {
  titles: string[][]
}

export default function Statistics({ titles }: Props) {
  console.log('👀 ~ titles:', titles)

  useEffect(() => {
    const root = Root.new('Statistics')
    const rootContainer = root.container
    setThemes(root)

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    const chart = rootContainer.children.push(
      XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: 'panX',
        wheelY: 'zoomX',
        paddingLeft: 0,
        layout: root.horizontalLayout,
      }),
    )

    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set(
      'scrollbarY',
      Scrollbar.new(root, {
        orientation: 'vertical',
      }),
    )

    const data = [
      {
        year: '2021',
        europe: 2.5,
        namerica: 2.5,
        asia: 2.1,
        lamerica: 1,
        meast: 0.8,
        africa: 0.4,
      },
      {
        year: '2022',
        europe: 2.6,
        namerica: 2.7,
        asia: 2.2,
        lamerica: 0.5,
        meast: 0.4,
        africa: 0.3,
      },
      {
        year: '2023',
        europe: 2.8,
        namerica: 2.9,
        asia: 2.4,
        lamerica: 0.3,
        meast: 0.9,
        africa: 0.5,
      },
    ]

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    const yRenderer = AxisRendererY.new(root, {
      minorGridEnabled: true,
    })

    const yAxis = chart.yAxes.push(
      CategoryAxis.new(root, {
        categoryField: 'year',
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
          valueXField: fieldName,
          valueXShow: 'valueXTotalPercent',
          categoryYField: 'year',
        }),
      )

      series.columns.template.setAll({
        tooltipText: "{name}, {categoryY}:{valueXTotalPercent.formatNumber('#.#')}%",
        tooltipX: percent(10),
      })
      series.data.setAll(data)

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear()

      series.bullets.push(function () {
        return Bullet.new(root, {
          sprite: Label.new(root, {
            text: "{valueXTotalPercent.formatNumber('#.#')}%",
            fill: root.interfaceColors.get('alternativeText'),
            centerY: p50,
            centerX: p50,
            populateText: true,
          }),
        })
      })

      legend.data.push(series)
    }

    makeSeries('Europe', 'europe')
    makeSeries('North America', 'namerica')
    makeSeries('Asia', 'asia')
    makeSeries('Latin America', 'lamerica')
    makeSeries('Middle East', 'meast')
    makeSeries('Africa', 'africa')

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100)

    //

    // // Create container to hold charts
    // const chartContainer = rootContainer.children.push(
    //   Container.new(root, {
    //     layout: root.horizontalLayout,
    //     width: p100,
    //     height: p100,
    //   }),
    // )

    // // Create the 1st chart
    // // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
    // const chart = chartContainer.children.push(
    //   PieChart.new(root, {
    //     endAngle: 270,
    //     innerRadius: percent(60),
    //   }),
    // )

    // const series = chart.series.push(
    //   PieSeries.new(root, {
    //     valueField: 'value',
    //     categoryField: 'category',
    //     endAngle: 270,
    //     alignLabels: false,
    //   }),
    // )

    // series.children.push(
    //   Label.new(root, {
    //     centerX: percent(50),
    //     centerY: percent(50),
    //     text: 'First: {valueSum}',
    //     populateText: true,
    //     fontSize: '1.5em',
    //   }),
    // )

    // series.slices.template.setAll({
    //   cornerRadius: 8,
    // })

    // series.states.create('hidden', {
    //   endAngle: -90,
    // })

    // series.labels.template.setAll({
    //   text: "{category}: {valuePercentTotal.formatNumber('#.')}%",
    //   textType: 'circular',
    // })

    // // Create the 2nd chart
    // // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
    // const chart2 = chartContainer.children.push(
    //   PieChart.new(root, {
    //     endAngle: 270,
    //     innerRadius: percent(60),
    //   }),
    // )

    // const series2 = chart2.series.push(
    //   PieSeries.new(root, {
    //     valueField: 'value',
    //     categoryField: 'category',
    //     endAngle: 270,
    //     alignLabels: false,
    //     tooltip: Tooltip.new(root, {}), // a separate tooltip needed for this series
    //   }),
    // )

    // series2.children.push(
    //   Label.new(root, {
    //     centerX: percent(50),
    //     centerY: percent(50),
    //     text: 'Second: {valueSum}',
    //     populateText: true,
    //     fontSize: '1.5em',
    //   }),
    // )

    // series2.slices.template.setAll({
    //   cornerRadius: 8,
    // })

    // series2.states.create('hidden', {
    //   endAngle: -90,
    // })

    // series2.labels.template.setAll({
    //   textType: 'circular',
    // })

    // // Duplicate interaction
    // // Must be added before setting data
    // series.slices.template.events.on('pointerover', function (event) {
    //   const slice = event.target
    //   const dataItem = slice.dataItem
    //   const otherSlice = getSlice(dataItem, series2)

    //   if (otherSlice) {
    //     otherSlice.hover()
    //   }
    // })

    // series.slices.template.events.on('pointerout', function (event) {
    //   const slice = event.target
    //   const dataItem = slice.dataItem
    //   const otherSlice = getSlice(dataItem, series2)

    //   if (otherSlice) {
    //     otherSlice.unhover()
    //   }
    // })

    // series.slices.template.on('active', function (active, target) {
    //   const slice = target
    //   const dataItem = slice?.dataItem
    //   const otherSlice = getSlice(dataItem, series2)

    //   if (otherSlice) {
    //     otherSlice.set('active', active)
    //   }
    // })

    // // Same for the 2nd series
    // series2.slices.template.events.on('pointerover', function (ev) {
    //   const slice = ev.target
    //   const dataItem = slice.dataItem
    //   const otherSlice = getSlice(dataItem, series)

    //   if (otherSlice) {
    //     otherSlice.hover()
    //   }
    // })

    // series2.slices.template.events.on('pointerout', function (ev) {
    //   const slice = ev.target
    //   const dataItem = slice.dataItem
    //   const otherSlice = getSlice(dataItem, series)

    //   if (otherSlice) {
    //     otherSlice.unhover()
    //   }
    // })

    // series2.slices.template.on('active', function (active, target) {
    //   const slice = target
    //   const dataItem = slice?.dataItem
    //   const otherSlice = getSlice(dataItem, series)

    //   if (otherSlice) {
    //     otherSlice.set('active', active)
    //   }
    // })

    // // Set data
    // // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
    // series.data.setAll([
    //   {
    //     category: 'Lithuania',
    //     value: 501,
    //   },
    //   {
    //     category: 'Czechia',
    //     value: 301,
    //   },
    //   {
    //     category: 'Ireland',
    //     value: 201,
    //   },
    //   {
    //     category: 'Germany',
    //     value: 165,
    //   },
    // ])

    // // Set data
    // // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
    // series2.data.setAll([
    //   {
    //     category: 'Lithuania',
    //     value: 201,
    //   },
    //   {
    //     category: 'Czechia',
    //     value: 101,
    //   },
    //   {
    //     category: 'Ireland',
    //     value: 51,
    //   },
    //   {
    //     category: 'Germany',
    //     value: 15,
    //   },
    // ])

    // function getSlice(dataItem: DataItem<IComponentDataItem> | undefined, series: PieSeries) {
    //   let otherSlice: Slice | undefined

    //   array.each(series.dataItems, function (di) {
    //     if (di.get('category') === dataItem?.get('category' as any)) {
    //       otherSlice = di.get('slice')
    //     }
    //   })

    //   return otherSlice
    // }

    // // Create legend
    // const legend = rootContainer.children.push(
    //   Legend.new(root, {
    //     x: percent(50),
    //     centerX: percent(50),
    //   }),
    // )

    // // Trigger all the same for the 2nd series
    // legend.itemContainers.template.events.on('pointerover', function (event) {
    //   const dataItem = event.target.dataItem?.dataContext as DataItem<IComponentDataItem>
    //   const slice = getSlice(dataItem, series2)
    //   slice?.hover()
    // })

    // legend.itemContainers.template.events.on('pointerout', function (event) {
    //   const dataItem = event.target.dataItem?.dataContext as DataItem<IComponentDataItem>
    //   const slice = getSlice(dataItem, series2)
    //   slice?.unhover()
    // })

    // legend.itemContainers.template.on('disabled', function (disabled, target) {
    //   const targetDataItem = target?.dataItem?.dataContext as
    //     | DataItem<IComponentDataItem>
    //     | undefined
    //   const slice = getSlice(targetDataItem, series2)

    //   const seriesDataItem = slice?.dataItem as DataItem<IPieSeriesDataItem> | undefined
    //   if (!seriesDataItem) return

    //   if (disabled) {
    //     series2.hideDataItem(seriesDataItem)
    //   } else {
    //     series2.showDataItem(seriesDataItem)
    //   }
    // })

    // legend.data.setAll(series.dataItems)

    // series.appear(1000)

    return () => {
      root.dispose()
    }
  }, [])

  return <div className="mb-5 h-96" id="Statistics" />
}

function setThemes(root: Root) {
  // Set themes
  // https://www.amcharts.com/docs/v5/concepts/themes/
  const themes: Theme[] = [am5themes_Animated.new(root)]

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    themes.push(am5themes_Dark.new(root))
  }

  root.setThemes(themes)
}

function createChart() {}
