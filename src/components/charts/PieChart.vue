<template>
  <CardView title="人员信息展示">
    <div class="personnel-container">
      <!-- 左侧饼图容器，包含旋转背景图和饼图本体 -->
      <div class="pie-wrapper">
        <div class="pie-bg"></div>
        <div ref="pieChartRef" class="pie-chart"></div>
      </div>

      <!-- 右侧柱状图 -->
      <div ref="barChartRef" class="bar-chart"></div>
    </div>
  </CardView>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import * as echarts from 'echarts';
import CardView from '../CardView.vue';
import { countArriveNum } from '../../utils/expSituation';

const pieChartRef = ref(null);
const barChartRef = ref(null);
let pieChart = null;
let barChart = null;

const personnelInfo = ref(null); // null 表示暂无数据

const fetchPersonnelInfo = async () => {
  try {
    const response = await countArriveNum();
    const arrive = response.arrive ?? null;
    const notArrive = response.notArrive ?? null;

    if (arrive === null || notArrive === null) {
      personnelInfo.value = null;
    } else {
      personnelInfo.value = {
        reach: arrive,
        unreach: notArrive,
        total: arrive + notArrive
      };
    }
  } catch (error) {
    console.error('Error fetching personnel info:', error);
    personnelInfo.value = null;
  }
};

const initCharts = () => {
  if (!pieChartRef.value || !barChartRef.value) return;

  if (pieChart) pieChart.dispose();
  if (barChart) barChart.dispose();

  pieChart = echarts.init(pieChartRef.value);
  barChart = echarts.init(barChartRef.value);

  if (!personnelInfo.value) {
    pieChart.setOption({
      title: {
        text: '暂无数据',
        left: 'center',
        top: 'center',
        textStyle: {
          color: '#ccc',
          fontSize: 14
        }
      }
    });

    barChart.setOption({
      title: {
        text: '暂无数据',
        left: 'center',
        top: 'center',
        textStyle: {
          color: '#ccc',
          fontSize: 14
        }
      },
      xAxis: { show: false },
      yAxis: { show: false },
      series: []
    });

    return;
  }

  const pieOption = {
    series: [{
      name: '人员分布',
      type: 'pie',
      radius: ['60%', '80%'],
      startAngle: 90,
      data: [
        { value: personnelInfo.value.reach, name: '实到人数', itemStyle: { color: '#03EBF6' } },
        { value: personnelInfo.value.unreach, name: '迟到人数', itemStyle: { color: '#0159C0' } },
      ],
      label: { show: false },
      labelLine: { show: false },
      animationType: 'expansion',
      animationDuration: 4000,
      animationEasing: 'cubicOut'
    }]
  };
  pieChart.setOption(pieOption);

  const barOption = {
    grid: {
      left: '5%',
      right: '15%',
      top: '15%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      max: personnelInfo.value.total,
      show: false
    },
    yAxis: {
      type: 'category',
      inverse: true,
      data: ['实到人数', '迟到人数'],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#fff',
        fontSize: '0.9vw',
        margin: 8
      }
    },
    series: [{
      name: '人数',
      type: 'bar',
      barWidth: '30%',
      data: [
        {
          value: personnelInfo.value.reach,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
              { offset: 0, color: '#2379A3' },
              { offset: 1, color: '#113F62' }
            ]),
            borderRadius: [3, 3, 3, 3]
          },
          label: {
            show: true,
            position: 'right',
            formatter: '{c}',
            color: '#fff',
            fontSize: '0.9vw'
          }
        },
        {
          value: personnelInfo.value.unreach,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
              { offset: 0, color: '#2E88C9' },
              { offset: 1, color: '#022B5C' }
            ]),
            borderRadius: [3, 3, 3, 3]
          },
          label: {
            show: true,
            position: 'right',
            formatter: '{c}',
            color: '#fff',
            fontSize: '0.9vw'
          }
        }
      ],
      animationDuration: 4000,
      animationEasing: 'cubicOut'
    }]
  };
  barChart.setOption(barOption);

  window.addEventListener('resize', () => {
    pieChart.resize();
    barChart.resize();
  });
};

onMounted(() => {
  fetchPersonnelInfo();
});

watch(personnelInfo, () => {
  initCharts();
});
</script>

<style scoped>
.personnel-container {
  display: flex;
  height: 100%;
}

.pie-wrapper {
  width: 40%;
  height: 20vh;
  position: relative;
}

.pie-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('../../assets/piebg.png') no-repeat center center;
  background-size: contain;
  animation: rotate360 10s linear infinite;
  z-index: 0;
}

.pie-chart {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.bar-chart {
  width: 60%;
  height: 20vh;
  margin-left: 10%;
}

@keyframes rotate360 {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
