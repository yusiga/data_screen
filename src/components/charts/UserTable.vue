<template>
    <CardView title="实验室使用人员">
        <div class="scroll-container">
            <div class="inner-wrap">
                <dv-scroll-board :config="config" style="width: 100%; height: 100%;" />
            </div>
        </div>
    </CardView>
</template>

<script setup>
import { reactive, onMounted, watch, ref, onUnmounted } from 'vue'
import { queryAllExpStu } from '../../utils/expStu'
import CardView from '../CardView.vue'

// 使用ref存储原始数据以便监听
const rawData = ref([])
let refreshTimer = null // 定时器引用

// 格式化时间为 "YYYY-MM-DD HH:mm:ss"
const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

// 转换数据为表格格式
const transformData = (data) => {
    return data.map(item => [
        item.stuId || '--',
        item.name,
        item.major,
        item.level,
        formatTime(item.time)
    ])
}

// 获取学生数据
const fetchStu = async () => {
    try {
        const res = await queryAllExpStu()
        rawData.value = res 
        config.data = transformData(res)
        console.log('数据刷新成功', new Date().toLocaleTimeString())
    } catch (error) {
        console.error('获取学生数据失败:', error)
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
    refreshTimer = setInterval(fetchStu, 3600000)
    // 立即执行一次
    fetchStu()
}

// 监听原始数据变化
watch(rawData, (newVal) => {
    console.log('数据已更新:', newVal)
    config.data = transformData(newVal)
})

// 表格配置
const config = reactive({
    header: ['学号', '姓名', '专业', '层次', '使用时间'],
    data: [], // 初始为空
    index: false,
    columnWidth: [50, 80, 140, 80, 160],
    align: ['center', 'center', 'center', 'center', 'center'],
    rowNum: 4,
    headerBGC: 'transparent',
    oddRowBGC: '#122B53',
    evenRowBGC: 'transparent',
    headerHeight: 4,
    rowHeight: 4,
    waitTime: 2000,
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