<template>
  <div class="dashboard" :style="{ backgroundImage: `url(${defaultBg})` }">
    <!-- 顶部 LOGO + 标题 -->
    <div class="header">
      <div class="title">
        <img class="logo" :src="logoUrl" alt="社区LOGO" />
        <div class="title">高新智慧社区</div>
      </div>
      <div class="introduction">
        <div class="intro-left">
          <div class="intro-bar"></div>
          <div class="intro-text">社区简介</div>
        </div>
        <div class="intro-center">
          高新智慧社区融合大数据、物联网、人工智能等前沿技术，全面打造智能安防、便民服务、绿色生态、智慧治理于一体的现代化社区，推动城市管理数字化转型。
          社区实现人口、车辆、安防、环境等多维度的智能化管理，提升治理效能，优化居民生活体验，助力社区实现高效、精准、智能的服务模式。
          以智慧赋能社区治理，推动服务创新，营造安全、和谐、宜居、可持续发展的幸福家园，让每一位居民都能享受科技带来的美好生活。
        </div>
        <div class="intro-right">
          <img :src="logoUrl" alt="展示图" />
        </div>
      </div>
    </div>

    <!-- 主体区域：左中右 -->
    <div class="main">
      <div class="left">
        <div class="left-chart"><LineChart /></div>
        <div class="left-chart"><PieChart /></div>
        <div class="left-chart"><BarChart /></div>
      </div>

      <div class="center">
        <CenterView />
      </div>

      <div class="right">
        <div class="right-chart"><ExperimentTable /></div>
        <div class="right-chart"><UserTable /></div>
        <div class="right-chart"><HorizontalBarChart /></div>
      </div>
    </div>

    <!-- 地图下方的重点区域实时画面 -->
    <div class="center-footer">
      <VideoCard />
    </div>
  </div>
</template>

<script setup>
import LineChart from "../components/charts/LineChart.vue";
import PieChart from "../components/charts/PieChart.vue";
import BarChart from "../components/charts/BarChart.vue";
import ExperimentTable from "../components/charts/ExperimentTable.vue";
import UserTable from "../components/charts/UserTable.vue";
import VideoCard from "../components/charts/VideoCard.vue";
import CenterView from "../components/charts/CenterView.vue";
import HorizontalBarChart from "../components/charts/HorizontalBarChart.vue";
import { ref } from "vue";
import logoImage from "../assets/logo.jpeg";

const logoUrl = ref(logoImage);
const defaultBg = new URL("../assets/bg.png", import.meta.url).href;
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
  font-family: "Microsoft YaHei", sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2vw;
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
  flex-shrink: 0;
  max-width: none;
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
  background: linear-gradient(to bottom, #2c5b8e, #1f4a73, #15395c);
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
  background-color: #03ebf6;
  margin-bottom: 1vh;
  margin-top: 0.7vh;
}

.intro-text {
  color: #03ebf6;
  font-size: 1.5vh;
  font-weight: 600;
  margin-left: 0.25vw;
}

.intro-center {
  flex: 1;
  text-align: center;
  font-size: 1.05vw;
  color: #f0f0f0;
  margin-left: 2vw;
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
.right-chart {
  flex: 1;
}

/* 地图下方的重点区域实时画面 */
.center-footer {
  height: 25vh;
  margin-top: 2vh;
  padding: 1vh;

  /* 对齐 center 区域 */
  width: calc(100% - 24vw - 24vw - 4vw); /* 总宽 - 左 - 右 - 两侧 margin */
  margin-left: calc(24vw + 2vw); /* 左边距 + center 左 margin */
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;
}
.center-footer > * {
  width: 100%;
  height: 100%;
  border-radius: 0.5vw;
}
</style>