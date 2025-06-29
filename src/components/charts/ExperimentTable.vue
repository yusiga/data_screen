<template>
    <CardView title="实验情况">
        <div class="scroll-container">
            <div class="inner-wrap">
                <dv-scroll-board :config="config" style="width: 100%; height: 100%;" />
            </div>
        </div>
    </CardView>
</template>

<script setup>
import { ref, reactive, onMounted, watch, onUnmounted } from 'vue'
import CardView from '../CardView.vue'
import { queryAllStua } from '../../utils/expSituation'

// 响应式数据
const data = ref([])
let refreshTimer = null // 定时器引用

// 表格配置
const config = reactive({
    header: ['房间号', '时间', '实验内容', '设备名称', '教员'],
    data: [],
    index: false,
    columnWidth: [50, 140, 160, 100, 80],
    align: ['center', 'center', 'center', 'center', 'center'],
    rowNum: 4,
    headerBGC: 'transparent',
    oddRowBGC: '#122B53',
    evenRowBGC: 'transparent',
    headerHeight: 4,
    rowHeight: 4,
    waitTime: 2000,
})

// 格式化时间为 "MM月DD日 HH:mm"
const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${month}月${day}日 ${hours}:${minutes}`
}

// 获取实验情况数据
const fetchSitutation = async () => {
    try {
        const res = await queryAllStua()
        const tableData = res.map(item => [
            item.roomId.toString(),
            // formatTime(item.time),
            item.time,
            item.expContent,
            item.deviceName,
            item.expTeacher
        ])
        data.value = res
        config.data = tableData
        console.log('实验情况数据刷新成功', new Date().toLocaleTimeString())
    } catch (error) {
        console.error('获取实验情况失败:', error)
        config.data = [
            ['--', '--', '数据加载失败', '--', '--']
        ]
    }
}

// 设置定时刷新
const setupRefresh = () => {
    // 先清除已有定时器
    if (refreshTimer) {
        clearInterval(refreshTimer)
    }
    // 每小时刷新一次 (3600000毫秒 = 1小时)
    refreshTimer = setInterval(fetchSitutation, 3600000)
    // 立即执行一次
    fetchSitutation()
}

// 监听数据变化（如果需要）
watch(data, (newVal) => {
    console.log('数据已更新:', newVal)
})

onMounted(() => {
    setupRefresh()
})

// 组件卸载时清除定时器
onUnmounted(() => {
    if (refreshTimer) {
        clearInterval(refreshTimer)
    }
})
</script>

<style scoped>
.scroll-container {
    height: 20vh;
    width: 100%;
}

.inner-wrap {
    height: 100%;
    width: 100%;
    padding: 0 1vw 0 1vw;
    box-sizing: border-box;
}

/* 自定义内部样式，确保每行高度不被默认样式影响 */
::v-deep(.dv-scroll-board .rows .row-item) {
    height: 4vh !important;
    line-height: 4vh !important;
    font-size: 1vh;
    padding: 0 !important;
}

::v-deep(.dv-scroll-board .header .header-item) {
    height: 4vh !important;
    line-height: 4vh !important;
    font-size: 1.2vh;
    padding: 0 !important;
}
</style>