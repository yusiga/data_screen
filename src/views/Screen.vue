<template>
    <div class="dashboard" :style="{ backgroundImage: bg ? `url(${bg})` : '' }">
        <!-- 顶部 LOGO + 标题 -->
        <div class="header">
            <div class="title">
                <img class="logo" :src="logoUrl" alt="中心LOGO" />
                <div class="title">无人机运用与指挥实验中心</div>
            </div>
            <div class="introduction">
                <div class="intro-left">
                    <div class="intro-bar"></div>
                    <div class="intro-text">中心介绍</div>
                </div>
                <div class="intro-center">
                    {{ intro.text }}
                </div>
                <div class="intro-right">
                    <img :src="intro.image" alt="展示图" />
                </div>
            </div>
        </div>

        <!-- 中部主内容区 -->
        <div class="main">
            <!-- 左侧模块 -->
            <div class="left">
                <!-- 折线图：承训量 -->
                <LineChart />
                <!-- 饼图：人员信息 -->
                <PieChart />
            </div>

            <!-- 中间信息描述 -->
            <div class="center">
                <CenterView />
            </div>

            <!-- 右侧模块 -->
            <div class="right">
                <!-- 表格：实验情况 -->
                <ExperimentTable />
                <!-- 柱状图：课程实验情况 -->
                <BarChart />
            </div>
        </div>

        <!-- 底部视频区域 -->
        <div class="footer">
            <div class="footer-left">
                <!-- 表格：实验室使用人员 -->
                <UserTable />
            </div>
            <div class="footer-right">
                <VideoCard />
            </div>
        </div>
    </div>
    <el-button class="settings-button" type="primary" @click="goToSetting">
        设置
    </el-button>
</template>

<script setup>
import LineChart from '../components/charts/LineChart.vue'
import PieChart from '../components/charts/PieChart.vue'
import BarChart from '../components/charts/BarChart.vue'
import ExperimentTable from '../components/charts/ExperimentTable.vue'
import UserTable from '../components/charts/UserTable.vue'
import VideoCard from '../components/charts/VideoCard.vue'
import CenterView from '../components/charts/CenterView.vue'
import { onMounted, ref } from 'vue'
import { queryIntroApi, queryBackgroundApi } from '../utils/other'
import { useRouter } from 'vue-router'
const router = useRouter()
import logoImage from '../assets/logo.jpeg'

const logoUrl = ref(logoImage)
const goToSetting = () => {
  router.push('/')
}

const intro = ref({ text: '', image: '' })

const fetchIntro = async () => {
    try {
        const response = await queryIntroApi()
        intro.value.text = response[0].introduction
        intro.value.image = response[0].url
    } catch (error) {
        console.error('Error fetching intro:', error)
    }
}

const bg = ref(null)

const defaultBg = new URL('../assets/bg.png', import.meta.url).href

const fetchBackground = async () => {
    try {
        const response = await queryBackgroundApi()
        bg.value = response[0].url
    } catch (error) {
        console.error('Error fetching intro:', error)
    }
}
onMounted(() => {
    fetchIntro()
    fetchBackground()
})
</script>

<style scoped>
.settings-button {
  position: absolute;
  top: 1vh;
  right: 1vw;
  z-index: 9999;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: auto;
}

/* 鼠标移到按钮上才显示 */
.settings-button:hover {
  opacity: 1;
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
    height: 5vh; /* Adjust as needed */
    width: auto; /* Maintain aspect ratio */
    object-fit: contain; /* Ensure the image fits properly */
    margin-right: 1vw;
}
.title {
    display: flex;
    flex-direction:row;
    align-items: flex-start;
    font-size: 1.8vw;
    /* 原 36px */
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
    writing-mode: vertical-rl;
    text-orientation: upright;
    color: #fff;
    font-size: 1.5vh;
    letter-spacing: 0.3em;
    font-weight: bold;
}

.intro-center {
    flex: 1;
    font-size: 0.8vw;
    line-height: 1.5;
    padding: 0.3vw;
}

.intro-right {
    width: 10vw;
    height: 10vh;
    position: relative;
    overflow: hidden;
    clip-path: polygon(0 0, 80% 0, 100% 20%, 100% 100%, 20% 100%, 0 80%);
    flex-shrink: 0;
}

.intro-right img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.main {
    display: flex;
    justify-content: space-between;
    flex: 1;
    min-height: 0;
    gap: 1vw;
}

.left,
.right {
    width: 25vw;
    display: flex;
    flex-direction: column;
    gap: 1vw;
    overflow: auto;
}

.center {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0.5vw;
    overflow: auto;
}

/* 修改底部区域 */
.footer {
    display: flex;
    gap: 1vw;
    height: 25vh;
    flex-shrink: 0;
}

.footer-left {
    width: 25vw;
    overflow: hidden;
}

.footer-right {
    display: flex;
    flex: 1;
    flex-direction: column;
}

/* 响应式调整 */
@media (max-width: 1600px) {
    .footer {
        height: 28vh;
    }

    .right {
        width: 28vw;
    }
}
</style>