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
.settings-button {
  display: none;
}

.dashboard {
    width: 100%;
    height: 100vh;
    color: #fff;
    padding: 2vw;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5vh;
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
    flex-direction:row;
    align-items: flex-start;
    font-size: 1.8vw;
    font-weight: bold;
    margin-bottom: 0.5vh;
    flex-shrink: 0;
}
.introduction {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1vw;
    padding: 0.5vw 0.5vw 0.5vw 3vw;
    flex-grow: 1;
    width: 100%;
}
.intro-left {
    width: 2.5vh;
    height: 12vh;
    opacity: 0.8;
    background: linear-gradient(to bottom, #2C5B8E, #1F4A73, #15395C);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    box-sizing: border-box;
    flex-shrink: 0;
}
.intro-bar {
    width: 40%;
    height: 0.2vh;
    background-color: #03EBF6;
    margin-bottom: 1vh;
    margin-top: 0.7vh;
}
.intro-text {
    color: #fff;
    font-size: 1vw;
    margin-top: 1vh;
}
.intro-center {
    flex: 1;
    text-align: center;
    font-size: 1.1vw;
    color: #fff;
}
.intro-right img {
    height: 8vh;
    border-radius: 0.5vw;
}
.main {
    display: flex;
    flex: 1;
    width: 100%;
    min-height: 0;
    gap: 2vw;
    height: 60vh;
}
.left {
    width: 24vw;
    display: flex;
    flex-direction: column;
    gap: 3vh;
}
.left-chart {
    flex: 1;
    min-height: 25vh;
}
.center {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 0;
}
.right {
    width: 24vw;
    display: flex;
    flex-direction: column;
    gap: 2vh;
}
.footer {
    display: flex;
    width: 100%;
    margin-top: 1vh;
    height: 24vh;
    flex-shrink: 0;
    gap: 2vw;
}
.footer-spacer {
    width: 24vw;
    flex-shrink: 0;
}
.footer-video {
    flex: 1;
    display: flex;
    align-items: flex-start;
}
.footer-bar {
    width: 22vw;
    display: flex;
    align-items: flex-start;
}
</style>