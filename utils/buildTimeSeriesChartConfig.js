import dayjs from 'dayjs'

const baseConfig = {
  yAxis: {
    type: 'value',
  },
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  }
}

export default function buildTimeSeriesChartConfig (timeSeries) {
  return {
    ...baseConfig,
    xAxis: {
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    series: [
      {
        data: timeSeries.values,
        type: 'bar'
      }
    ]
  }
}