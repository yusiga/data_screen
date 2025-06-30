<template>
    <div class="dashboard" :style="{ backgroundImage: `url(${defaultBg})` }">
        <!-- 顶部 LOGO + 标题 -->
        <div class="header">
            <div class="title">
                <img class="logo" :src="logoUrl" alt="社区LOGO" />
                <div class="title">高新智慧社区物业端</div>
            </div>
            <div class="introduction">
                <div class="intro-left">
                    <div class="intro-bar"></div>
                    <div class="intro-text">社区简介</div>
                </div>
                <div class="intro-center">
                    欢迎来到高新智慧社区管理端数据大屏，实时掌握社区人口、车辆、安防、问题上报等核心数据，助力社区智能化管理。
                </div>
                <div class="intro-right">
                    <img :src="logoUrl" alt="展示图" />
                </div>
            </div>
        </div>

        <!-- 主体区域：左侧3图表+中部地图+右侧2表格 -->
        <div class="main">
            <!-- 左侧模块：3图表竖直均分 -->
            <div class="left">
                <div class="left-chart"><LineChart /></div>
                <div class="left-chart"><PieChart /></div>
                <div class="left-chart"><BarChart /></div>
            </div>
            <!-- 中间地图 -->
            <div class="center">
                <CenterView />
            </div>
            <!-- 右侧模块：2表格竖直排列 -->
            <div class="right">
                <ExperimentTable />
                <UserTable />
            </div>
        </div>

        <!-- 地图下方横跨中部和右侧的底部区域：重点区域实时画面+横向柱状图 -->
        <div class="footer">
            <div class="footer-spacer"></div>
            <div class="footer-video"><VideoCard /></div>
            <div class="footer-bar"><HorizontalBarChart /></div>
        </div>
    </div>
</template>

<script setup>
import LineChart from '../components/charts/LineChart.vue'
import PieChart from '../components/charts/PieChart.vue'
import BarChart from '../components/charts/BarChart.vue'
import ExperimentTable from '../components/charts/ExperimentTable.vue'
import UserTable from '../components/charts/UserTable.vue'
import VideoCard from '../components/charts/VideoCard.vue'
import CenterView from '../components/charts/CenterView.vue'
import HorizontalBarChart from '../components/charts/HorizontalBarChart.vue'
import { ref } from 'vue'
import logoImage from '../assets/logo.jpeg'

const logoUrl = ref(logoImage)
const defaultBg = new URL('../assets/bg.png', import.meta.url).href
</script>

<style scoped>
.dashboard {
  width: 100%;
  height: 100vh;
  color: #fff;
  padding: 2vh 2vw;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  font-family: 'Microsoft YaHei', sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1vh;
  flex-shrink: 0;
  max-height: 14vh;
}

.logo {
  height: 5vh;
  width: auto;
  object-fit: contain;
  margin-right: 1vw;
}

.title {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.8vw;
  font-weight: bold;
  color: #00f7ff;
}

.introduction {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1vw;
  padding: 0.5vw 1vw;
  flex-grow: 1;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 0.5vw;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.2);
}

.intro-left {
  width: 2.5vh;
  height: 12vh;
  background: linear-gradient(to bottom, #2C5B8E, #1F4A73, #15395C);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  box-sizing: border-box;
  flex-shrink: 0;
  border-radius: 0.3vw;
}

.intro-bar {
  width: 40%;
  height: 0.2vh;
  background-color: #03EBF6;
  margin-bottom: 1vh;
  margin-top: 0.7vh;
}

.intro-text {
  color: #03EBF6;
  font-size: 1vw;
  font-weight: 600;
  margin-top: 1vh;
}

.intro-center {
  flex: 1;
  text-align: center;
  font-size: 1.05vw;
  color: #f0f0f0;
}

.intro-right img {
  height: 8vh;
  border-radius: 0.5vw;
}

/* 主体三栏 */
.main {
  display: flex;
  flex: 1;
  width: 100%;
  min-height: 0;
  gap: 1vw;
  margin-top: 1vh;
}

/* 左栏 */
.left {
  width: 24vw;
  display: flex;
  flex-direction: column;
  gap: 2vh;
}
.left-chart {
  flex: 1;
}

/* 中栏地图 */
.center {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  margin: 0 1vw;
  margin-left: 2vw;
}

/* 右栏 */
.right {
  width: 24vw;
  display: flex;
  flex-direction: column;
  margin-right: 2vw;
  gap: 2vh;
}
.right > * {
  flex: 1;
  padding: 1vh;
}

/* 底部区域 */
.footer {
  display: flex;
  width: 100%;
  margin-top: 4vh;
  height: 26vh;
  flex-shrink: 0;
  gap: 1vw;
}

.footer-spacer {
  width: 24vw;
  flex-shrink: 0;
}

.footer-video,
.footer-bar {
  display: flex;
  padding: 1vh;
  height: 100%;
}

.footer-video {
  flex: 1;
  margin-left: 2vw;
  margin-right: 1vw;
}

.footer-bar {
  width: 24vw;
}
</style>