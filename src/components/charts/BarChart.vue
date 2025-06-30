<template>
  <CardView title="车辆信息与车流趋势">
    <div ref="chartRef" class="chart-container"></div>
  </CardView>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import CardView from '../CardView.vue'
import { vehicle } from '../../utils/mockData'

const chartRef = ref(null)
let chartInstance = null

function initChart() {
  const option = {
    animationDuration: 1000,
    animationEasing: 'elasticOut',
    legend: {
      data: ['车流量'],
      top: '0%',
      right: '0%',
      textStyle: { color: '#fff', fontSize: '0.7vw' },
      itemWidth: 18,
      itemHeight: 8,
      itemGap: 15
    },
    grid: { left: '5%', right: '5%', top: '24%', bottom: '12%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['6天前','5天前','4天前','3天前','2天前','昨天','今天'],
      axisLine: { lineStyle: { color: '#6fc3df' } },
      axisLabel: { color: '#fff', fontSize: '0.7vw', lineHeight: 10, interval: 0 }
    },
    yAxis: {
      type: 'value',
      min: 0,
      axisLine: { lineStyle: { color: '#6fc3df' } },
      axisLabel: { color: '#fff', fontSize: '0.7vw' },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }
    },
    series: [
      {
        name: '车流量',
        type: 'bar',
        barWidth: '30%',
        data: vehicle.flow,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#00eaff' },
              { offset: 1, color: '#005bea' }
            ]
          },
          borderRadius: [2, 2, 0, 0]
        },
        z: 2
      }
    ],
    tooltip: {
      trigger: 'axis',
      formatter: params => {
        let str = '';
        params.forEach(p => {
          str += `${p.seriesName}: ${p.data}<br/>`;
        });
        return str;
      }
    }
  }
  if (!chartInstance) {
    chartInstance = echarts.init(chartRef.value)
  }
  chartInstance.setOption(option, { notMerge: true })
}

onMounted(() => {
  initChart()
})
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 18vh;
}
</style>