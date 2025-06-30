<template>
  <CardView title="人口结构统计">
    <div class="personnel-container">
        <div ref="pieChartRef" class="pie-chart"></div>
      <div ref="barChartRef" class="bar-chart"></div>
    </div>
  </CardView>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import CardView from '../CardView.vue';
import { population } from '../../utils/mockData';

const pieChartRef = ref(null);
const barChartRef = ref(null);
let pieChart = null;
let barChart = null;

function initCharts() {
  if (!pieChartRef.value || !barChartRef.value) return;
  if (pieChart) pieChart.dispose();
  if (barChart) barChart.dispose();
  pieChart = echarts.init(pieChartRef.value);
  barChart = echarts.init(barChartRef.value);

  // 年龄分布饼图
  const pieOption = {
      title: {
      text: '年龄分布',
      left: 'center',
      top: 0,
      textStyle: { color: '#fff', fontSize: 14 }
    },
    tooltip: { trigger: 'item' },
    legend: {
      bottom: 0,
        left: 'center',
      textStyle: { color: '#fff', fontSize: 12 }
    },
    series: [
      {
        name: '年龄分布',
      type: 'pie',
        radius: ['50%', '75%'],
        data: population.age,
        label: { color: '#fff', fontSize: 12 },
        labelLine: { show: true },
        itemStyle: {
          borderRadius: 6,
          borderColor: '#222',
          borderWidth: 2
        }
      }
    ]
  };
  pieChart.setOption(pieOption);

  // 户籍分布柱状图
  const barOption = {
    title: {
      text: '户籍分布',
      left: 'center',
      top: 0,
      textStyle: { color: '#fff', fontSize: 14 }
    },
    grid: { left: '10%', right: '10%', top: '20%', bottom: '15%' },
    xAxis: {
      type: 'category',
      data: population.household.map(i => i.name),
      axisLine: { lineStyle: { color: '#fff' } },
      axisLabel: { color: '#fff', fontSize: 12 }
    },
    yAxis: {
      type: 'value',
      min: 0,
      axisLine: { lineStyle: { color: '#fff' } },
      axisLabel: { color: '#fff', fontSize: 12 },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } }
    },
    series: [
      {
      name: '人数',
      type: 'bar',
        data: population.household.map(i => i.value),
          itemStyle: {
          color: '#03EBF6',
          borderRadius: [6, 6, 0, 0]
          },
        barWidth: '40%'
          }
    ]
  };
  barChart.setOption(barOption);

  window.addEventListener('resize', () => {
    pieChart.resize();
    barChart.resize();
  });
}

onMounted(() => {
  initCharts();
});
</script>

<style scoped>
.personnel-container {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
}
.pie-chart {
  width: 14vw;
  height: 16vh;
}
.bar-chart {
  width: 8vw;
  height: 16vh;
}
</style>
