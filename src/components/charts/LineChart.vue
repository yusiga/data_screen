<template>
    <CardView title="年度入住与报警趋势">
        <div ref="chartRef" class="chart-container"></div>
    </CardView>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import CardView from '../CardView.vue';
import { population } from '../../utils/mockData';

const chartRef = ref(null);
let chartInstance = null;

function initChart() {
  const option = {
    animationDuration: 2000,
    animationEasing: 'elasticOut',
    legend: {
      data: ['年度入住', '报警事件'],
      right: '5%',
      icon: 'line',
      textStyle: {
        color: '#fff',
        fontSize: '0.7vw'
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
      data: ['2018','2019','2020','2021','2022','2023','2024'],
      axisLine: { lineStyle: { color: '#ccc' } },
      axisLabel: {
        color: '#fff',
        interval: 0,
        fontSize: '0.7vw'
      }
    },
    yAxis: {
      type: 'value',
      min: 0,
      axisLine: { lineStyle: { color: '#ccc' } },
      axisLabel: { color: '#fff', formatter: '{value}', fontSize: '0.7vw' },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } }
    },
    series: [
      {
        name: '年度入住',
        data: population.annualMoveIn,
        type: 'line',
        smooth: true,
        lineStyle: { width: 2, color: '#03EBF6' },
        symbol: 'circle',
        symbolSize: 4,
        itemStyle: { color: '#03EBF6', borderColor: '#fff', borderWidth: 1 },
        animationDelay: idx => idx * 100,
        areaStyle: {
          color: 'rgba(3,235,246,0.18)'
        }
      },
      {
        name: '报警事件',
        data: population.alarmEvents,
        type: 'line',
        smooth: true,
        lineStyle: { width: 2, color: '#FF6B6B' },
        symbol: 'circle',
        symbolSize: 4,
        itemStyle: { color: '#FF6B6B', borderColor: '#fff', borderWidth: 1 },
        animationDelay: idx => idx * 100,
        areaStyle: {
          color: 'rgba(255,107,107,0.18)'
        }
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
  };
  if (!chartInstance) {
    chartInstance = echarts.init(chartRef.value);
  }
  chartInstance.setOption(option, { notMerge: true });
}

onMounted(() => {
  initChart();
});
</script>

<style scoped>
.chart-container {
    width: 100%;
    height: 18vh;
}
</style>