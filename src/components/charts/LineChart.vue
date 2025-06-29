<template>
    <CardView title="承训量">
        <div class="chart-header">
            <div class="time-switcher">
                <span v-for="item in timeTypes" :key="item.value" :class="{ active: currentTimeType === item.value }"
                    @click="switchTimeType(item.value)">
                    {{ item.label }}
                </span>
            </div>
        </div>
        <div ref="chartRef" class="chart-container"></div>
    </CardView>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';
import CardView from '../CardView.vue';
import { getTrainInformation } from '../../utils/expStu';

const chartRef = ref(null);
let chartInstance = null;
const currentTimeType = ref('year');
const rawData = ref({
  dayTrain: [],
  monthTrain: [],
  yearTrain: [],
  sevenDaysAgo: "",
  sevenMonthsAgo: "",
  sevenYearsAgo: ""
});

let refreshInterval = null; // Store the interval reference

const timeTypes = [
  { label: '年', value: 'year' },
  { label: '月', value: 'month' },
  { label: '日', value: 'day' }
];

const formatChartData = (type) => {
  const data = rawData.value;

  const limit = 7; // 最多显示 7 条

  const getRecentYears = () => {
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let i = limit - 1; i >= 0; i--) {
      years.push((currentYear - i).toString());
    }
    return years;
  };

  const getRecentMonths = () => {
    const months = [];
    const currentDate = new Date();
    for (let i = limit - 1; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setMonth(date.getMonth() - i);
      months.push(`${date.getFullYear()}-${date.getMonth() + 1}`);
    }
    return months;
  };

  const getRecentDays = () => {
    const days = [];
    const currentDate = new Date();
    for (let i = limit - 1; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - i);
      days.push(`${date.getMonth() + 1}-${date.getDate()}`);
    }
    return days;
  };

  switch (type) {
    case 'year':
      if (!data.yearTrain || data.yearTrain.length === 0) {
        return { xAxis: ['暂无数据'], series: [0] };
      }
      return {
        xAxis: data.yearTrain.map(i => i.curTime).slice(0, limit),
        series: data.yearTrain.map(i => i.num).slice(0, limit)
      };
    case 'month':
      if (!data.monthTrain || data.monthTrain.length === 0) {
        return { xAxis: ['暂无数据'], series: [0] };
      }
      return {
        xAxis: data.monthTrain.map(i => i.curTime).slice(0, limit),
        series: data.monthTrain.map(i => i.num).slice(0, limit)
      };
    case 'day':
      if (!data.dayTrain || data.dayTrain.length === 0) {
        return { xAxis: ['暂无数据'], series: [0] };
      }
      return {
        xAxis: data.dayTrain.map(i => i.curTime).slice(0, limit),
        series: data.dayTrain.map(i => i.num).slice(0, limit)
      };
    default:
      return { xAxis: ['暂无数据'], series: [0] };
  }
};

function getCurrentData() {
  return formatChartData(currentTimeType.value);
}

function initChart() {
  const currentData = getCurrentData();

  const option = {
    animationDuration: 2000,
    animationEasing: 'elasticOut',
    legend: {
      data: ['承训量'],
      right: '5%',
      icon: 'line',
      textStyle: {
        color: '#fff',
        fontSize: '0.8vw'
      }
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '5%',
      top: '20%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: currentData.xAxis,
      axisLine: { lineStyle: { color: '#ccc' } },
      axisLabel: {
        color: '#fff',
        interval: 0,
        fontSize: '0.8vw'
      }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: () => {
        const maxValue = Math.max(...currentData.series);
        return maxValue > 0 ? Math.ceil(maxValue * 1.2) : 50;
      },
      axisLine: { lineStyle: { color: '#ccc' } },
      axisLabel: { color: '#fff', formatter: '{value}', fontSize: '0.8vw' },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } }
    },
    series: [{
      name: '承训量',
      data: currentData.series,
      type: 'line',
      smooth: false,
      lineStyle: {
        width: 2,
        color: '#03EBF6'
      },
      areaStyle: null,
      symbol: 'circle',
      symbolSize: 4,
      itemStyle: {
        color: '#03EBF6',
        borderColor: '#fff',
        borderWidth: 1
      },
      animationDelay: function (idx) {
        return idx * 100;
      }
    }],
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        if (params[0].axisValue === '暂无数据') {
          return '暂无数据';
        }
        const timeType = currentTimeType.value === 'year' ? '年' :
                         currentTimeType.value === 'month' ? '月' : '日';
        return `${params[0].axisValue}${timeType}: ${params[0].data}`;
      }
    }
  };

  if (chartInstance) {
    chartInstance.setOption(option, { notMerge: true });
  }
}

function switchTimeType(type) {
  currentTimeType.value = type;
  initChart();
}

const fetchLineData = async () => {
  try {
    const data = await getTrainInformation();
    rawData.value = data;
    initChart();
  } catch (error) {
    console.error('获取训练数据失败:', error);
  }
};

const setupAutoRefresh = () => {
  // Clear existing interval if any
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }
  
  // Set up new interval (1 hour = 3600000 milliseconds)
  refreshInterval = setInterval(fetchLineData, 3600000);
};

onMounted(() => {
  chartInstance = echarts.init(chartRef.value);
  initChart();
  window.addEventListener('resize', resizeChart);
  fetchLineData();
  setupAutoRefresh(); // Start the auto-refresh
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart);
  chartInstance?.dispose();
  
  // Clear the interval when component is unmounted
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }
});

function resizeChart() {
  chartInstance?.resize();
}
</script>


<style scoped>
.chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1vw;
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
    color: #03EBF6;
    font-weight: bold;
}

.chart-container {
    width: 100%;
    height: 20vh;
    /* min-height: 200px; */
}
</style>