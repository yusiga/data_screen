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

  // 计算当前高亮项（无高亮则为第一个）
  let currentIndex = 0;
  pieChart && pieChart.on && pieChart.on('highlight', function(params) {
    currentIndex = params.batch ? params.batch[0].dataIndex : params.dataIndex;
  });

  // 年龄分布环形图（扁平大屏风格）
  const pieOption = {
    title: {
      text: '年龄分布',
      left: 'center',
      top: 0,
      textStyle: { color: '#fff', fontSize: 10 }
    },
    tooltip: { trigger: 'item' },
    legend: { show: false },
    series: [
      {
        name: '年龄分布',
        type: 'pie',
        radius: ['65%', '80%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        data: population.age,
        label: {
          show: true,
          position: 'center',
          formatter: function(params) {
            // 只有高亮项才显示高亮项，否则显示第一个
            if (params.name && params.percent > 0) {
              return `{a|${params.name}}\n{b|${params.value}}`;
            } else {
              const first = population.age[0];
              return `{a|${first.name}}\n{b|${first.value}}`;
            }
          },
          rich: {
            a: { fontSize: 12, color: '#00eaff', fontWeight: 'bold', padding: [0,0,2,0] },
            b: { fontSize: 16, color: '#fff', fontWeight: 'bold' }
          }
        },
        labelLine: {
          show: false
        },
        itemStyle: {
          borderRadius: 0,
          borderColor: '#233a5b',
          borderWidth: 6,
          color: function(params) {
            // 扁平蓝色系
            const colorList = [
              '#00eaff', '#007bff', '#1ad1ff', '#005bea'
            ];
            return colorList[params.dataIndex % colorList.length];
          }
        },
        emphasis: {
          scale: true
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
      textStyle: { color: '#fff', fontSize: 10 }
    },
    grid: { left: '10%', right: '10%', top: '20%', bottom: '15%' },
    xAxis: {
      type: 'category',
      data: population.household.map(i => i.name),
      axisLine: { lineStyle: { color: '#fff' } },
      axisLabel: { color: '#fff', fontSize: 10 }
    },
    yAxis: {
      type: 'value',
      min: 0,
      axisLine: { lineStyle: { color: '#fff' } },
      axisLabel: { color: '#fff', fontSize: 10 },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } }
    },
    series: [
      {
      name: '人数',
      type: 'bar',
        data: population.household.map(i => i.value),
          itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#03EBF6' },
              { offset: 1, color: '#005bea' }
            ]
          },
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
