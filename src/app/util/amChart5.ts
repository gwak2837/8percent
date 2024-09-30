import type { Root, Theme } from '@amcharts/amcharts5'

import { Scrollbar } from '@amcharts/amcharts5'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import am5themes_Dark from '@amcharts/amcharts5/themes/Dark'
import { XYChart } from '@amcharts/amcharts5/xy'

export function setAnimatedAndDarkThemes(root: Root) {
  // Set themes
  // https://www.amcharts.com/docs/v5/concepts/themes/
  const themes: Theme[] = [am5themes_Animated.new(root)]

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    themes.push(am5themes_Dark.new(root))
  }

  root.setThemes(themes)
}

export function createVerticalChart(root: Root) {
  // Create chart
  // https://www.amcharts.com/docs/v5/charts/xy-chart/
  return root.container.children.push(
    XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: 'panY',
      wheelY: 'zoomY',
      paddingLeft: 0,
      layout: root.verticalLayout,
    }),
  )
}

export function addScrollBarY(root: Root, chart: XYChart) {
  // Add scrollbar
  // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
  chart.set('scrollbarY', Scrollbar.new(root, { orientation: 'vertical' }))
}
