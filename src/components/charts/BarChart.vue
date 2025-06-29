<template>
  <CardView title="骨干课程实验开出情况">
    <div class="chart-header">
      <div class="time-switcher">
        <span
          v-for="item in timeTypes"
          :key="item.value"
          :class="{ active: currentTimeType === item.value }"
          @click="switchTimeType(item.value)"
        >
          {{ item.label }}
        </span>
      </div>
    </div>
    <div ref="chartRef" class="chart-container"></div>
  </CardView>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import * as echarts from 'echarts'
import CardView from '../CardView.vue'
import { getInformation } from '../../utils/expTime'

const chartRef = ref(null)
let chartInstance = null
const currentTimeType = ref('year')
const rawData = ref({ yearCour: [], monthCour: [], dayCour: [] })

const timeTypes = [
  { label: '年', value: 'year' },
  { label: '月', value: 'month' },
  { label: '日', value: 'day' }
]

let renderIndex = ref(0)
let intervalId = null
let refreshTimer = null

const rotateData = () => {
  const dataList = getFullData()
  if (dataList.length <= 4) {
    renderIndex.value = 0
  } else {
    renderIndex.value = (renderIndex.value + 1) % Math.ceil(dataList.length / 4)
  }
  initChart()
}

const getFullData = () => {
  switch (currentTimeType.value) {
    case 'month':
      return rawData.value.monthCour || []
    case 'day':
      return rawData.value.dayCour || []
    default:
      return rawData.value.yearCour || []
  }
}

const transformData = (data) => {
  const fullList = data || []
  const start = renderIndex.value * 4
  const sliced = fullList.slice(start, start + 4)

  if (sliced.length === 0) {
    return {
      xAxis: ['暂无数据'],
      practice: [0],
      total: [0]
    }
  }

  return {
    xAxis: sliced.map(item => {
      const label = item.courName
      return label.length > 6 ? label.slice(0, 6) + '\n' + label.slice(6) : label
    }),
    practice: sliced.map(item => item.praTime),
    total: sliced.map(item => item.totalTime)
  }
}

const initChart = () => {
  if (!chartInstance) return

  const fullData = getFullData()
  const data = transformData(fullData)

  const option = {
    animationDuration: 1000,
    animationEasing: 'elasticOut',
    grid: {
      left: '5%',
      right: '5%',
      top: '24%',
      bottom: '12%',
      containLabel: true
    },
    legend: {
      data: ['实践学时', '总学时'],
      top: '0%',
      right: '0%',
      textStyle: {
        color: '#fff',
        fontSize: '1.2vh'
      },
      itemWidth: 18,
      itemHeight: 8,
      itemGap: 15
    },
    xAxis: {
      type: 'category',
      data: data.xAxis,
      axisLine: { lineStyle: { color: '#6fc3df' } },
      axisLabel: {
        color: '#fff',
        fontSize: '8px',
        lineHeight: 10,
        interval: 0
      }
    },
    yAxis: {
      type: 'value',
      min: 0,
      axisLine: { lineStyle: { color: '#6fc3df' } },
      axisLabel: { color: '#fff', fontSize: '0.9vw' },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }
    },
    series: [
      {
        name: '总学时',
        type: 'bar',
        barWidth: '30%',
        data: data.total,
        itemStyle: {
          color: '#00eaff',
          borderRadius: [2, 2, 0, 0]
        },
        barGap: '-100%',
        z: 1
      },
      {
        name: '实践学时',
        type: 'bar',
        barWidth: '30%',
        data: data.practice,
        itemStyle: {
          color: '#034b96',
          borderRadius: [2, 2, 0, 0]
        },
        z: 2
      }
    ]
  }

  chartInstance.setOption(option, { notMerge: true })
}

const switchTimeType = (type) => {
  currentTimeType.value = type
  renderIndex.value = 0
  initChart()
}

const fetchBarChartData = async () => {
  try {
    const data = await getInformation()
    rawData.value = data
    renderIndex.value = 0
    initChart()
  } catch (error) {
    console.error('获取数据失败:', error)
  }
}

const handleResize = () => chartInstance?.resize()

onMounted(() => {
  chartInstance = echarts.init(chartRef.value)
  fetchBarChartData()

  intervalId = setInterval(rotateData, 6000)
  refreshTimer = setInterval(fetchBarChartData, 3600000)
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
  clearInterval(refreshTimer)
  window.removeEventListener('resize', handleResize)
  chartInstance?.dispose()
})
</script>

<style scoped>
.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.time-switcher {
  display: flex;
  margin-left: auto;
  gap: 1vw;
  margin-top: -3vw;
}

.time-switcher span {
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  font-size: 0.9vw;
  transition: all 0.3s;
}

.time-switcher span.active {
  color: #03ebf6;
  font-weight: bold;
}

.chart-container {
  width: 100%;
  height: 20vh;
}
</style>