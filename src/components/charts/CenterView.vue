<template>
  <div class="circle-indicator">
    <div
      v-for="(item, index) in 8"
      :key="index"
      class="indicator"
      :class="{ active: currentIndex === index }"
      :style="positions[index]"
    >
      <img :src="getImage(index)" />
    </div>

    <div class="center-image">
      <img :src="getCenterImage(currentIndex)" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import {getSwitchTime} from '../../utils/switchTime'
const currentIndex = ref(0)
let timer = null
const isPaused = ref(false)
const switchTime =ref(3000)
const fetchSwitchTime = async () => {
    try {
        const response = await getSwitchTime()
        switchTime.value = response.time*1000
        console.log('获取间隔时间成功:', switchTime.value)
    } catch (error) {
        console.error('获取间隔时间失败:', error)
        ElMessage.error('获取间隔时间设置失败')
    }
}

const keyMap = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7
}

const getImage = (index) => {
  return new URL(`../../assets/center/int${index + 1}.png`, import.meta.url).href
}

const getCenterImage = (index) => {
  return new URL(`../../assets/centerimg/img${index + 1}.png`, import.meta.url).href
}

const positions = [
  { top: '20%', left: '10%' },
  { top: '40%', left: '6%' },
  { top: '60%', left: '6%' },
  { top: '80%', left: '10%' },
  { top: '80%', left: '90%' },
  { top: '60%', left: '94%' },
  { top: '40%', left: '94%' },
  { top: '20%', left: '90%' },
]

const startAutoSwitch = () => {
  timer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % 8
  }, switchTime.value)
  isPaused.value = false
}

const stopAutoSwitch = () => {
  clearInterval(timer)
  timer = null
  isPaused.value = true
}

const handleKeyDown = (e) => {
  const key = e.key.toLowerCase()
  if (key === ' ') {
    // 空格键：恢复自动播放
    if (!timer) startAutoSwitch()
  } else if (keyMap[key] !== undefined) {
    // a-h 键：切换对应图片并暂停
    currentIndex.value = keyMap[key]
    stopAutoSwitch()
  }
}

onMounted(async () => {
  await fetchSwitchTime() // 等待时间获取完成
  startAutoSwitch()
  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  clearInterval(timer)
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
.circle-indicator {
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 40vw;
  max-height: 50vh;
  margin: 0 auto;
}

.indicator {
  position: absolute;
  width: 4vw;
  height: 4vw;
  transform: translate(-50%, -50%);
  opacity: 0.4;
  transition: all 0.3s ease;
}

.indicator img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.indicator.active {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1.2);
  filter: drop-shadow(0 0 0.5vw #00f6ff);
}

.center-image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 75%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.center-image img {
  width: 100%;
  height: 100%;
  object-fit: fill;
  border-radius: 5% / 5%;
}
</style>
