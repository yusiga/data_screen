<template>
    <CardItem v-for="section in sections" :key="section.title" :title="section.title">
        <div class="card-content">
            <!-- 上传按钮 -->
            <input type="file" accept="image/*,video/*" multiple @change="(e) => handleUpload(e, section.key)" />

            <!-- 已上传展示 -->
            <div class="video-section">
                <h4>已上传内容</h4>
                <div class="video-grid">
                    <div v-for="item in uploadedMap[section.key]" :key="item.id" class="video-card uploaded">
                        <component :is="item.type === 'image' ? 'img' : 'video'" :src="item.url" controls v-bind="item.type === 'image' ? { style: 'width: 100%; border-radius: 4px;' } : {}" />
                        <el-button type="danger" size="small" @click="deleteItem(section.key, item.id)">
                            删除
                        </el-button>
                    </div>
                </div>
            </div>

            <!-- 待上传展示 -->
            <div class="video-section">
                <h4>待上传内容</h4>
                <div class="video-grid">
                    <div v-for="(item, index) in tempPreviewMap[section.key]" :key="index" class="video-card pending">
                        <component :is="item.type === 'image' ? 'img' : 'video'" :src="item.url" controls v-bind="item.type === 'image' ? { style: 'width: 100%; border-radius: 4px;' } : {}" />
                        <el-button type="warning" size="small" @click="removeTempItem(section.key, index)">
                            移除
                        </el-button>
                    </div>
                </div>
            </div>

            <!-- 上传按钮 -->
            <div class="btn-row">
                <el-button type="primary" size="small" :disabled="tempFilesMap[section.key].length === 0"
                    @click="uploadSection(section.key)">
                    上传待选内容
                </el-button>
            </div>
        </div>
    </CardItem>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import CardItem from '../CardItem.vue'
import {
    uploadStudentStyleApi, queryStudentStyleApi,
    uploadAchievementApi, queryAchievementApi,
    uploadExchangeApi, queryExchangeApi,
    uploadLeaderCareApi, queryLeaderCareApi,
    deleteOtherApi
} from '../../utils/other'

// 模块定义
const sections = [
    { key: 'student', title: '学员风采展示' },
    { key: 'achievement', title: '优秀成果展示' },
    { key: 'exchange', title: '对外交流合作' },
    { key: 'leader', title: '首长关怀' }
]

// 每个模块的状态管理
const uploadedMap = ref({ student: [], achievement: [], exchange: [], leader: [] })
const tempFilesMap = ref({ student: [], achievement: [], exchange: [], leader: [] })
const tempPreviewMap = ref({ student: [], achievement: [], exchange: [], leader: [] })

// 上传接口映射
const uploadApiMap = {
    student: uploadStudentStyleApi,
    achievement: uploadAchievementApi,
    exchange: uploadExchangeApi,
    leader: uploadLeaderCareApi
}

// 查询接口映射
const queryApiMap = {
    student: queryStudentStyleApi,
    achievement: queryAchievementApi,
    exchange: queryExchangeApi,
    leader: queryLeaderCareApi
}

// 处理文件选择
const handleUpload = (e, sectionKey) => {
    const files = Array.from(e.target.files)
    files.forEach(file => {
        const isImage = file.type.startsWith('image/')
        const isVideo = file.type.startsWith('video/')
        if (!isImage && !isVideo) return

        const reader = new FileReader()
        reader.onload = () => {
            tempPreviewMap.value[sectionKey].push({
                url: reader.result,
                name: file.name,
                type: isImage ? 'image' : 'video'
            })
        }
        reader.readAsDataURL(file)
        tempFilesMap.value[sectionKey].push({ file, type: isImage ? 'image' : 'video' })
    })
}

// 上传文件
const uploadSection = async (sectionKey) => {
    const formData = new FormData()
    const files = tempFilesMap.value[sectionKey].map(({ file }) => file)
    
    for (const file of files) {
        formData.append('files', file) // 或者 'file' 如果你希望每个文件单独处理
    }
    try {
        await uploadApiMap[sectionKey](formData)
        ElMessage.success('上传成功')
        tempFilesMap.value[sectionKey] = []
        tempPreviewMap.value[sectionKey] = []
        await fetchSection(sectionKey)
    } catch (err) {
        console.error('上传失败', err)
        ElMessage.error('上传失败')
    }
}

// 获取上传内容
const fetchSection = async (sectionKey) => {
    try {
        const res = await queryApiMap[sectionKey]()
        uploadedMap.value[sectionKey] = (res || []).map(item => ({
            id: item.id,
            url: item.url,
            name: item.name,
            type: /\.(mp4|webm|ogg)$/i.test(item.url) ? 'video' : 'image'
        }))
    } catch (err) {
        console.error('获取数据失败', err)
        ElMessage.error('获取数据失败')
    }
}

// 删除上传内容
const deleteItem = async (sectionKey, id) => {
    try {
        const formData = new FormData()
        formData.append('id', id)
        await deleteOtherApi(formData)
        uploadedMap.value[sectionKey] = uploadedMap.value[sectionKey].filter(item => item.id !== id)
        ElMessage.success('删除成功')
    } catch (err) {
        console.error('删除失败', err)
        ElMessage.error('删除失败')
    }
}

// 移除待上传项
const removeTempItem = (sectionKey, index) => {
    tempFilesMap.value[sectionKey].splice(index, 1)
    tempPreviewMap.value[sectionKey].splice(index, 1)
}

// 页面初始化
onMounted(() => {
    sections.forEach(s => fetchSection(s.key))
})
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
