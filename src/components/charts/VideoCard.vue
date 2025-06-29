<template>
  <CardWrapper :tabs="tabs" v-model="activeTab">
    <template #default="{ activeIndex }">
      <div class="media-grid">
        <div
          v-for="(item, idx) in visibleItems"
          :key="item.id || idx"
          class="media-item"
          @click="openPreview(getRealIndex(idx))"
        >
          <!-- 图片显示 -->
          <img v-if="item.type === 'image'" :src="item.url" alt="图片" />

          <!-- 视频显示（轮播区域不显示播放按钮） -->
          <div v-else-if="item.type === 'video'" class="video-wrapper">
            <video
              ref="videoRefs"
              :data-index="getRealIndex(idx)"
              :src="item.url"
              preload="metadata"
              muted
              autoplay
              loop
              playsinline
            ></video>
            <!-- 播放按钮已全部隐藏 -->
            <div class="video-cover" v-show="false"></div>
          </div>
        </div>
      </div>

      <!-- 弹窗预览 -->
      <el-dialog
        v-model="previewVisible"
        width="80%"
        top="10vh"
        class="media-dialog"
        append-to-body
        @close="handleDialogClose"
      >
        <div class="media-carousel-item">
          <img
            v-if="currentMedia?.type === 'image'"
            :src="currentMedia.url"
            class="preview-media"
            alt="预览图"
          />
          <video
            v-else-if="currentMedia?.type === 'video'"
            ref="dialogVideo"
            :src="currentMedia.url"
            class="preview-media"
            controls
            autoplay
            loop
          ></video>
        </div>
      </el-dialog>
    </template>
  </CardWrapper>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import CardWrapper from '../CardWrapper.vue'
import { ElDialog } from 'element-plus'
import 'element-plus/es/components/dialog/style/css'
import {
  queryStudentStyleApi,
  queryAchievementApi,
  queryExchangeApi,
  queryLeaderCareApi
} from '../../utils/other'

const tabs = ['学员风采', '成果展示', '对外交流合作', '首长关怀']

const studentMedia = ref([])
const achievementMedia = ref([])
const exchangeMedia = ref([])
const leaderMedia = ref([])
const mediaLoaded = ref([false, false, false, false])

const loadMediaData = async (index) => {
  if (mediaLoaded.value[index]) return Promise.resolve()

  try {
    let data = []
    switch (index) {
      case 0:
        data = await queryStudentStyleApi() || []
        studentMedia.value = formatMedia(data)
        break
      case 1:
        data = await queryAchievementApi() || []
        achievementMedia.value = formatMedia(data)
        break
      case 2:
        data = await queryExchangeApi() || []
        exchangeMedia.value = formatMedia(data)
        break
      case 3:
        data = await queryLeaderCareApi() || []
        leaderMedia.value = formatMedia(data)
        break
    }
    mediaLoaded.value[index] = true
  } catch (err) {
    console.error('加载媒体数据失败:', err)
  }
}

const formatMedia = (list) =>
  list.map(item => ({
    id: item.id,
    url: item.url,
    introduction: item.introduction,
    type: item.url.endsWith('.mp4') ? 'video' : 'image',
    playing: false,
  }))

const previewVisible = ref(false)
const currentIndex = ref(0)
const activeTab = ref(0)
const carouselInterval = ref(null)
const carouselIndex = ref(0)

const currentMediaList = computed(() => {
  switch (activeTab.value) {
    case 0: return studentMedia.value
    case 1: return achievementMedia.value
    case 2: return exchangeMedia.value
    case 3: return leaderMedia.value
    default: return []
  }
})

// 轮播区域显示的4条，顺序固定
const visibleItems = computed(() => {
  const list = currentMediaList.value
  const len = list.length
  if (len <= 4) return list
  return [
    list[carouselIndex.value % len],
    list[(carouselIndex.value + 1) % len],
    list[(carouselIndex.value + 2) % len],
    list[(carouselIndex.value + 3) % len],
  ]
})

// 映射 visibleItems 索引到真实索引
function getRealIndex(visibleIdx) {
  const len = currentMediaList.value.length
  return (carouselIndex.value + visibleIdx) % len
}

// 判断索引是否在轮播区（用于视频播放控制）
const isInCarousel = (index) => {
  const len = currentMediaList.value.length
  if (len <= 4) return true
  const visibleIndices = [
    carouselIndex.value % len,
    (carouselIndex.value + 1) % len,
    (carouselIndex.value + 2) % len,
    (carouselIndex.value + 3) % len,
  ]
  return visibleIndices.includes(index)
}

// 启动轮播
const startCarousel = () => {
  if (currentMediaList.value.length > 4) {
    clearInterval(carouselInterval.value)
    carouselInterval.value = setInterval(() => {
      carouselIndex.value = (carouselIndex.value + 1) % currentMediaList.value.length
      updateVideosPlayback()
    }, 3000)
  }
}

// 视频元素refs
const videoRefs = ref([])

function updateVideosPlayback() {
  // 视频在轮播区的保持播放状态，非轮播区视频暂停并重置
  const len = currentMediaList.value.length
  const vids = videoRefs.value || []
  vids.forEach((videoEl) => {
    if (!videoEl) return
    const idx = Number(videoEl.dataset.index)
    if (isInCarousel(idx)) {
      if (videoEl.paused) {
        videoEl.play().catch(() => {})
      }
    } else {
      videoEl.pause()
      videoEl.currentTime = 0
    }
  })
}

function openPreview(idx) {
  currentIndex.value = idx
  currentMedia.value = currentMediaList.value[idx]
  previewVisible.value = true
  nextTick(() => {
    if (dialogVideo.value) {
      dialogVideo.value.play()
    }
  })
}

function handleDialogClose() {
  if (dialogVideo.value) {
    dialogVideo.value.pause()
    dialogVideo.value.currentTime = 0
  }
}

const currentMedia = ref(null)
const dialogVideo = ref(null)

onMounted(async () => {
  await loadMediaData(activeTab.value)
  startCarousel()
})

watch(activeTab, async (newIndex) => {
  await loadMediaData(newIndex)
  carouselIndex.value = 0
  startCarousel()
})

watch(carouselIndex, () => {
  nextTick(() => {
    updateVideosPlayback()
  })
})

onBeforeUnmount(() => {
  clearInterval(carouselInterval.value)
})
</script>

<style scoped>
.media-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1vw;
  padding: 1vh 2vw;
}

.media-item {
  width: 100%;
  height: 16vh;
  background: #000;
  cursor: pointer;
  overflow: hidden;
  border-radius: 0.5vw;
  transition: transform 0.3s;
  position: relative;
}

.media-item:hover {
  transform: scale(1.02);
  box-shadow: 0 0 1vw rgba(3, 235, 246, 0.3);
}

.media-item img,
.media-item video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 视频播放按钮样式 - 全部隐藏 */
.video-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.video-cover {
  display: none !important;
}

/* 弹窗样式保持不变 */
.media-dialog :deep(.el-dialog__body) {
  padding: 0;
}

.media-carousel-item {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
}

.preview-media {
  max-width: 100%;
  max-height: 60vh;
  object-fit: contain;
}
</style>
