<template>
  <CardView title="问题上报与工单列表">
    <div class="scroll-container">
      <div class="inner-wrap">
        <dv-scroll-board :config="config" style="width: 100%; height: 100%" />
      </div>
    </div>
  </CardView>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import CardView from '../CardView.vue'
import { issues } from '../../utils/mockData'

// 表格配置
const config = reactive({
  header: ['编号', '类型', '描述', '状态'],
  data: [],
  index: false,
  align: ['center', 'center', 'center', 'center'],
  rowNum: 4,
  headerBGC: 'transparent',
  oddRowBGC: '#122B53',
  evenRowBGC: 'transparent',
  headerHeight: 4.5,  // ★ 增高一点防止表头不垂直居中
  rowHeight: 4,
  waitTime: 2000,
})

let timer = null
let currentIndex = 0

onMounted(() => {
  config.data = []
  timer = setInterval(() => {
    if (currentIndex >= issues.list.length) currentIndex = 0
    config.data.push([
      54 + currentIndex,
      issues.list[currentIndex].type,
      issues.list[currentIndex].desc,
      issues.list[currentIndex].status
    ])
    if (config.data.length > 10) config.data.shift()
    currentIndex++
  }, 1000)
})
</script>

<style scoped>
.scroll-container {
  height: 20vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.inner-wrap {
  height: 100%;
  width: 100%;
  padding: 0 1vw;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 表头与行内容统一居中：外层容器 */
::v-deep(.dv-scroll-board .header .header-item),
::v-deep(.dv-scroll-board .rows .row-item) {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  text-align: center !important;
  height: 4vh !important;
  line-height: 4vh !important;
  font-size: 1.2vh;
  padding: 0 !important;
  margin: 0 !important;
}

/* 表头与行内容统一居中：内层div */
::v-deep(.dv-scroll-board .header .header-item div),
::v-deep(.dv-scroll-board .rows .row-item div) {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  width: 100% !important;
  height: 100% !important;
  text-align: center !important;
  padding: 0 !important;
  margin: 0 !important;
}
</style>