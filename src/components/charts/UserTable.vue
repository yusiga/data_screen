<template>
    <CardView title="安防监控与门禁访客">
        <div class="scroll-container">
            <div class="inner-wrap">
                <dv-scroll-board :config="config" style="width: 100%; height: 100%;" />
            </div>
        </div>
    </CardView>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import CardView from '../CardView.vue'
import { security } from '../../utils/mockData'

const config = reactive({
    header: ['类型', '时间', '内容'],
    data: [],
    index: false,
    columnWidth: [60, 80, 180],
    align: ['center', 'center', 'left'],
    rowNum: 4,
    headerBGC: 'transparent',
    oddRowBGC: '#122B53',
    evenRowBGC: 'transparent',
    headerHeight: 4,
    rowHeight: 4,
    waitTime: 2000,
})

let timer = null
let allData = []
let currentIndex = 0

onMounted(() => {
    allData = [
        ...security.access.map(item => ['门禁', item.time, `${item.type}：${item.person}`]),
        ...security.visitors.map(item => ['访客', item.time, `${item.name}（${item.reason}）`]),
        ...security.warnings.map(item => ['预警', item.time, item.event + '（' + item.level + '）'])
    ]
    config.data = []
    timer = setInterval(() => {
        if (currentIndex >= allData.length) currentIndex = 0
        config.data.push(allData[currentIndex])
        if (config.data.length > 10) config.data.shift() // 最多显示10条
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

/* 表头和内容外层容器，使用flex确保居中 */
::v-deep(.dv-scroll-board .header .header-item),
::v-deep(.dv-scroll-board .rows .row-item) {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  text-align: center !important;
  height: 4vh !important;
  line-height: 4vh !important;
  font-size: 1.3vh;
  padding: 0 !important;
  margin: 0 !important;
}

/* 表头和内容内部div也要居中，否则内容会错位 */
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