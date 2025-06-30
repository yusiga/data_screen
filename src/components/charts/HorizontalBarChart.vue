<template>
  <CardView title="各楼栋人口数对比">
    <div ref="chartRef" class="horizontal-bar-chart"></div>
  </CardView>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import CardView from '../CardView.vue'
import { buildings } from '../../utils/mockData'

// 假设每栋楼人口数随机生成或写死
const buildingPop = [
  { name: '1号楼', value: 420 },
  { name: '2号楼', value: 350 },
  { name: '3号楼', value: 230 }
]

const chartRef = ref(null)
let chartInstance = null

function initChart() {
  const option = {
    grid: { left: '10%', right: '10%', top: '10%', bottom: '10%' },
    xAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#6fc3df' } },
      axisLabel: { color: '#fff', fontSize: 12 },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } }
    },
    yAxis: {
      type: 'category',
      data: buildingPop.map(i => i.name),
      axisLine: { lineStyle: { color: '#6fc3df' } },
      axisLabel: { color: '#fff', fontSize: 14 }
    },
    series: [
      {
        name: '人口数',
        type: 'bar',
        data: buildingPop.map(i => i.value),
        barWidth: 18,
        itemStyle: {
          color: '#03EBF6',
          borderRadius: [0, 8, 8, 0]
        },
        label: {
          show: true,
          position: 'right',
          color: '#fff',
          fontSize: 14
        }
      }
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: params => {
        const p = params[0]
        return `${p.name}：${p.value}人`
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
.horizontal-bar-chart {
  width: 100%;
  height: 16vh;
}
</style> 