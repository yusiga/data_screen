<template>
    <CardView title="问题上报与工单列表">
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
import { issues } from '../../utils/mockData'

const config = reactive({
    header: ['编号', '类型', '描述', '状态'],
    data: [],
    index: false,
    columnWidth: [40, 60, 180, 60],
    align: ['center', 'center', 'left', 'center'],
    rowNum: 4,
    headerBGC: 'transparent',
    oddRowBGC: '#122B53',
    evenRowBGC: 'transparent',
    headerHeight: 4,
    rowHeight: 4,
    waitTime: 2000,
})

onMounted(() => {
    config.data = issues.list.map(item => [item.id, item.type, item.desc, item.status])
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