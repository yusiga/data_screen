<template>
    <div class="big-screen-setting">
        <h2 class="page-title">大屏数据设置</h2>
        <Info></Info>
        <ExcelUp></ExcelUp>
        <ImageVideo></ImageVideo>
        <el-button type="primary" class="save-btn" @click="tiaozhuan">进入大屏页面</el-button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import CardItem from '../components/CardItem.vue'
import { useRouter } from 'vue-router'
import Info from '../components/setting/Info.vue'
import ExcelUp from '../components/setting/ExcelUp.vue'
import ImageVideo from '../components/setting/ImageVideo.vue'
const router = useRouter()
const tiaozhuan = () => router.push('/Screen')
</script>

<style scoped>
.big-screen-setting {
    padding: 24px;
    background: #f5f5f5;
    min-height: 100vh;
}

.page-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 24px;
}

.full-width-textarea {
    width: 100%;
    margin-bottom: 10px;
}

.card-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.preview {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    margin: 10px 0;
}

.preview img {
    max-width: 200px;
    border: 1px solid #eee;
    border-radius: 4px;
}

.delete-btn-container {
    width: 100%;
    display: flex;
    justify-content: flex-start;
}

.number-inputs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
}

.input-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.input-group label {
    font-size: 14px;
    color: #606266;
}

.btn-row {
    display: flex;
    justify-content: flex-end;
}

.btn-group {
    display: flex;
    gap: 10px;
    /* 按钮间距 */
    margin-top: 8px;
    align-items: center;
    flex-wrap: wrap;
}

.save-btn {
    margin-top: 24px;
}

.video-section {
    margin-bottom: 20px;
}

.video-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
}

.video-card {
    width: 300px;
    border-radius: 8px;
    overflow: hidden;
    padding: 10px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
    background: #f9f9f9;
    text-align: center;
}

.video-card video {
    width: 100%;
    border-radius: 4px;
}

.video-card.uploaded {
    border: 2px solid #67c23a;
}

.video-card.pending {
    border: 2px dashed #e6a23c;
    background-color: #fff8e1;
}

.personnel-inputs {
    display: flex;
    gap: 20px;
    /* Adjust the gap between inputs as needed */
    margin-bottom: 15px;
}

.input-row {
    display: flex;
    align-items: center;
    gap: 8px;
}

.number-input {
    width: 120px;
    /* Adjust width as needed */
}
</style>
