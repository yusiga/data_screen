<template>
  <CardView title="小区满意度">
    <div ref="chartRef" class="horizontal-bar-chart"></div>
  </CardView>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import CardView from '../CardView.vue'
import { buildings } from '../../utils/mockData'

// 假设每项满意度数据
const satisfaction = [
  { name: '环境卫生', value: 92 },
  { name: '安保服务', value: 88 },
  { name: '设施维护', value: 85 },
  { name: '停车管理', value: 80 },
  { name: '物业响应', value: 78 },
  { name: '社区活动', value: 75 },
  { name: '绿化景观', value: 90 },
  { name: '邻里关系', value: 83 }
]

const chartRef = ref(null)
let chartInstance = null

function initChart() {
  const option = {
    grid: { left: '18%', right: '10%', top: '10%', bottom: '10%' },
    xAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#fff' } },
      axisLabel: { color: '#fff', fontSize: 10 },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } }
    },
    yAxis: {
      type: 'category',
      data: satisfaction.map(i => i.name),
      axisLine: { lineStyle: { color: '#fff' } },
      axisLabel: { color: '#fff', fontSize: 10 }
    },
    series: [
      {
        name: '满意度',
        type: 'bar',
        data: satisfaction.map(i => ({ value: i.value })),
        barWidth: 12,
        itemStyle: {
          color: '#03EBF6',
          borderRadius: 0
        },
        label: {
          show: true,
          position: 'outside',
          color: '#fff',
          fontSize: 12,
          fontWeight: 'bold',
          align: 'right',
          padding: [0, 12, 0, 0],
          formatter: '{c}%'
        }
      }
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: '#222',
      borderColor: '#03EBF6',
      textStyle: { color: '#fff' },
      formatter: params => {
        const p = params[0]
        return `${p.name}：${p.value}%`
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
  height: 18vh;
}
</style> 