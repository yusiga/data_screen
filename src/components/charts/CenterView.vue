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
  // 设置一个社区中心点（可自定义）
  const center = [116.397428, 39.90923] // 北京天安门
  const map = new window.AMap.Map('amap-container', {
    center,
    zoom: 17,
    viewMode: '3D'
  })
  // 楼栋 marker
  buildings.forEach(b => {
    const marker = new window.AMap.Marker({
      position: [center[0] + 0.001 * b.id, center[1] + 0.001 * b.id],
      title: b.name,
      icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
      offset: new window.AMap.Pixel(-13, -30)
    })
    marker.on('click', () => showInfo('building', b, marker.getPosition()))
    map.add(marker)
  })
  // 车位 marker
  parkings.forEach(p => {
    const marker = new window.AMap.Marker({
      position: [center[0] - 0.001 * p.id, center[1] - 0.001 * p.id],
      title: p.name,
      icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_p.png',
      offset: new window.AMap.Pixel(-13, -30)
    })
    marker.on('click', () => showInfo('parking', p, marker.getPosition()))
    map.add(marker)
  })
  // 摄像头 marker
  cameras.forEach(c => {
    const marker = new window.AMap.Marker({
      position: [center[0] + 0.001 * c.id, center[1] - 0.001 * c.id],
      title: c.name,
      icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png',
      offset: new window.AMap.Pixel(-13, -30)
    })
    marker.on('click', () => showInfo('camera', c, marker.getPosition()))
    map.add(marker)
  })
  // 出入口 marker
  entrances.forEach(e => {
    const marker = new window.AMap.Marker({
      position: [center[0] - 0.001 * e.id, center[1] + 0.001 * e.id],
      title: e.name,
      icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_g.png',
      offset: new window.AMap.Pixel(-13, -30)
    })
    marker.on('click', () => showInfo('entrance', e, marker.getPosition()))
    map.add(marker)
  })
}
</script>

<style scoped>
.community-map {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 400px;
  background: #f0f4fa;
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
