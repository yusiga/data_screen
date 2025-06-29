<template>
    <CardItem title="背景图设置">
        <div class="card-content">
            <input type="file" accept="image/*" @change="handleBackgroundUpload" />
            <div v-if="background.image" class="preview">
                <img :src="background.image" />
                <div class="delete-btn-container">
                    <el-button type="warning" size="small" @click="removeBackgroundImage">移除图片</el-button>
                </div>
            </div>
            <div class="btn-row">
                <el-button type="danger" size="small" @click="deleteBackground">清空背景图</el-button>
                <el-button type="primary" size="small" @click="uploadBackground">上传背景图</el-button>
            </div>
        </div>
    </CardItem>

    <CardItem title="中心介绍">
        <div class="card-content">
            <textarea v-model="intro.text" rows="4" class="full-width-textarea" />
            <input type="file" accept="image/*" @change="handleFileUpload" />
            <div v-if="intro.image" class="preview">
                <img :src="intro.image" />
                <div class="delete-btn-container">
                    <el-button type="warning" size="small" @click="removeIntroImage">移除图片</el-button>
                </div>
            </div>
            <div class="btn-row">
                <el-button type="danger" size="small" @click="deleteIntro">清空中心介绍</el-button>
                <el-button type="primary" size="small" @click="uploadIntro">上传中心介绍</el-button>
            </div>
        </div>
    </CardItem>

    <CardItem title="色块亮起间隔时间">
        <div class="card-content">
            <div class="personnel-inputs">
                <div class="input-row">
                    <label>时间(秒):</label>
                    <el-input-number v-model="switchTime.interval" :min="0" controls-position="right" />
                </div>
            </div>
            <div class="btn-row">
                <el-button type="primary" size="small" @click="saveSwitchTime">保存时间</el-button>
            </div>
        </div>
    </CardItem>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import CardItem from '../CardItem.vue'
import { updateInfo, queryInfo } from '../../utils/userInfo'
import {
    uploadIntroApi, deleteOtherApi, queryIntroApi, uploadBackgroundApi, queryBackgroundApi
} from '../../utils/other'
import { getSwitchTime, updateSwitchTime } from '../../utils/switchTime'

const loading = ref(false)
const switchTime = ref({
    id: null,
    interval: null
})

//0.背景图
const backgroundId = ref(0)
const background = ref({ image: '', rawFile: '' })

const handleBackgroundUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
        background.value.image = reader.result
        background.value.rawFile = file
    }
    reader.readAsDataURL(file)
}

const uploadBackground = async () => {
    try {
        if (!background.value.rawFile) {
            ElMessage.error('请上传背景图或背景图没有发生变化')
            return
        }
        const formdata = new FormData()
        if (backgroundId.value != 0) {
            formdata.append('id', backgroundId.value)
        }
        formdata.append('file', background.value.rawFile)

        const response = await uploadBackgroundApi(formdata)
        if (response) {
            ElMessage.success('上传背景图成功')
        }
        fetchBackground()
    } catch (error) {
        console.error('上传背景图失败:', error)
        ElMessage.error('上传背景图失败')
    }
}

const fetchBackground = async () => {
    try {
        const response = await queryBackgroundApi()
        if (Array.isArray(response) && response.length > 0 && response[0]) {
            const { url = '', id = '' } = response[0]
            background.value = {
                image: url,
                rawFile: ''
            }
            backgroundId.value = id
        } else {
            console.warn('背景图返回数据为空或格式不正确:', response)
        }
    } catch (error) {
        console.error('获取背景图失败:', error)
    }
}

const deleteBackground = async () => {
    try {
        if (backgroundId.value === 0) {
            ElMessage.error('没有上传过的背景图可以删除')
            return
        }
        const formData = new FormData()
        formData.append('id', backgroundId.value)
        await deleteOtherApi(formData)
        background.value = {
            image: '',
            rawFile: ''
        }
        backgroundId.value = 0
        ElMessage.success('删除背景图成功')
    } catch (error) {
        console.error('删除背景图失败:', error)
        ElMessage.error('删除背景图失败')
    }
}

const removeBackgroundImage = () => {
    background.value.image = ''
    background.value.rawFile = ''
}

//1.实验室简介
const introId = ref(0)
const intro = ref({ text: '', image: '', rawFile: '' })
const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
        intro.value.image = reader.result // 用于预览
        intro.value.rawFile = file        // 用于上传
    }
    reader.readAsDataURL(file)
}
const uploadIntro = async () => {
    try {
        const formdata = new FormData()

        if (!intro.value.text) {
            ElMessage.error('请输入实验室简介')
            return
        }

        if (!intro.value.rawFile) {
            ElMessage.error('请重新上传实验室简介图片')
            return
        }

        if (introId.value != 0) {
            formdata.append('id', introId.value)
        }
        formdata.append('introduction', intro.value.text)
        formdata.append('file', intro.value.rawFile)

        const response = await uploadIntroApi(formdata)
        if (response) {
            ElMessage.success('上传实验室简介成功')
        }
    } catch (error) {
        console.error('上传实验室简介失败:', error)
        ElMessage.error('上传实验室简介失败')
    }
}

const fetchIntroApi = async () => {
    try {
        const response = await queryIntroApi()
        if (Array.isArray(response) && response.length > 0 && response[0]) {
            const { introduction = '', url = '', id = '' } = response[0]
            intro.value = {
                text: introduction,
                image: url,
                rawFile: ''
            }
            introId.value = id
        } else {
            console.warn('返回数据为空或格式不正确:', response)
        }
    } catch (error) {
        console.error('获取实验室简介失败:', error)
    }
}

const deleteIntro = async () => {
    try {
        if (introId.value === 0) {
            ElMessage.error('没有实验室简介可以删除')
            return
        }
        const formData = new FormData()
        formData.append('id', introId.value)
        await deleteOtherApi(formData)
        intro.value = {
            text: '',
            image: '',
            rawFile: ''
        }
        introId.value = 0
        ElMessage.success('删除实验室简介成功')
    } catch (error) {
        console.error('删除实验室简介失败:', error)
        ElMessage.error('删除实验室简介失败')
    }
}

const removeIntroImage = () => {
    intro.value.image = ''
    intro.value.rawFile = ''
}

//2.间隔时间
const fetchSwitchTime = async () => {
    try {
        const response = await getSwitchTime()
        switchTime.value = {
            id: response.id,
            interval: response.time
        }
    } catch (error) {
        console.error('获取间隔时间失败:', error)
        ElMessage.error('获取间隔时间设置失败')
    }
}
// 保存时间设置
const saveSwitchTime = async () => {
    if (!switchTime.value.interval || switchTime.value.interval < 1) {
        ElMessage.warning('请输入有效的间隔时间')
        return
    }

    loading.value = true
    try {
        const formData = new FormData()
        if (switchTime.value.id) {
            formData.append('id', switchTime.value.id)
        }
        formData.append('time', switchTime.value.interval)

        await updateSwitchTime(formData)
        ElMessage.success('间隔时间设置已保存')
    } catch (error) {
        console.error('保存失败:', error)
        ElMessage.error('保存间隔时间设置失败')
    } finally {
        loading.value = false
    }
}
onMounted(() => {
    fetchBackground()
    fetchIntroApi()
    fetchSwitchTime()
})
</script>

<style scoped>
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
</style>