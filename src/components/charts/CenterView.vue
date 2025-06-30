<template>
  <div class="community-map">
    <!-- 高德地图容器 -->
    <div id="amap-container" class="map-bg"></div>
    <!-- 楼栋热点 marker 由地图 API 添加 -->
    <!-- 信息弹窗 -->
    <div v-if="info.visible" class="info-popup" :style="{ left: info.left, top: info.top }">
      <div class="close-btn" @click="info.visible = false">×</div>
      <div v-if="info.type === 'building'">
        <strong>{{ info.data.name }}</strong><br />
        {{ info.data.info }}
      </div>
      <div v-else-if="info.type === 'parking'">
        <strong>{{ info.data.name }}</strong><br />
        状态：{{ info.data.status }}
      </div>
      <div v-else-if="info.type === 'camera'">
        <strong>{{ info.data.name }}</strong><br />
        状态：{{ info.data.status }}
      </div>
      <div v-else-if="info.type === 'entrance'">
        <strong>{{ info.data.name }}</strong><br />
        状态：{{ info.data.status }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { buildings, parkings, cameras, entrances } from '../../utils/mockData'

const info = ref({ visible: false, type: '', data: {}, left: '0%', top: '0%' })

function showInfo(type, data, lnglat) {
  info.value = {
    visible: true,
    type,
    data,
    left: '50%',
    top: '20%'
  }
}

onMounted(() => {
  // 加载高德地图JS API
  if (!window.AMap) {
    const script = document.createElement('script')
    script.src = 'https://webapi.amap.com/maps?v=2.0&key=29d5701538ddfe99a412891c1c73b7ec'
    script.onload = initMap
    document.body.appendChild(script)
  } else {
    initMap()
  }
})

function initMap() {
  // 设置一个社区中心点（合肥高新）
  const center = [117.302627, 31.740745]
  const map = new window.AMap.Map('amap-container', {
    center,
    zoom: 17,
    viewMode: '3D',
    mapStyle: 'amap://styles/grey',
    pitch: 45,
    showBuildingBlock: true,
    buildingAnimation: true,
    labels: false
  })
  // 不添加任何marker、发光圈等，仅保留纯净地图和3D楼块
  // 添加3D楼块高亮图层
  const buildingsLayer = new window.AMap.Buildings({
    zIndex: 10,
    heightFactor: 1,
    visible: true,
    color1: '#00eaff', // 顶部颜色
    color2: '#233a5b', // 立面颜色
    color3: '#233a5b'  // 侧面颜色
  });
  map.add(buildingsLayer);
  // 显示3D楼块
  if (map.showBuildings3D) {
    map.showBuildings3D(true);
  }
  // 每隔1秒地图平滑向右平移20像素
  setInterval(() => {
    map.panBy(20, 0);
  }, 1000);
}
</script>

<style scoped>
.community-map {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 400px;
  background: #101c2a;
  border-radius: 12px;
  overflow: hidden;
}
.map-bg {
  width: 100%;
  height: 100%;
  min-height: 400px;
}
.info-popup {
  position: absolute;
  min-width: 120px;
  background: #fff;
  color: #222;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.15);
  padding: 12px 16px 8px 16px;
  z-index: 10;
  left: 50%;
  top: 20%;
  transform: translate(-50%, -110%);
  font-size: 1vw;
}
.close-btn {
  position: absolute;
  right: 8px;
  top: 4px;
  cursor: pointer;
  font-size: 1.2vw;
  color: #888;
}
</style>
