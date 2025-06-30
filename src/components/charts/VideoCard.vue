<template>
  <CardView title="重点区域实时画面">
    <div class="video-list">
      <div v-for="video in videos" :key="video.id" class="video-item">
        <div class="video-title">{{ video.name }}</div>
        <video :src="video.url" controls autoplay loop muted class="video-player"></video>
      </div>
        </div>
  </CardView>
</template>

<script setup>
import CardView from '../CardView.vue'
import { videos } from '../../utils/mockData'
</script>

<style scoped>
.video-list {
  display: flex;
  gap: 1vw;
  align-items: flex-start;
  justify-content: flex-start;
}
.video-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 18vw;
}
.video-title {
  color: #fff;
  font-size: 1vw;
  margin-bottom: 0.5vh;
}
.video-player {
  width: 100%;
  height: 18vh;
  border-radius: 0.5vw;
  background: #000;
}
</style>
