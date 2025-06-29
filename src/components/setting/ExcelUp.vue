<template>
    <CardItem title="实验情况">
        <p>（移除文件后选择文件进行上传，会在后台数据基础上增加；删除已上传数据为清空后台数据，后台有数据才能删除已上传数据）</p>
        <div class="card-content">
            <input type="file" ref="fileInput1" accept=".xlsx,.xls"
                @change="handleSingleExcelUpload($event, 'experiment1')" />
            <div v-if="experiment1File.name">
                <p>{{ experiment1File.name }}</p>
                <div class="btn-group">
                    <a :href="experiment1File.url" :download="experiment1File.name" target="_blank">
                        <el-button type="success" size="small">下载文件</el-button>
                    </a>
                    <el-button type="warning" size="small" @click="clearExperiment1RawFile">移除文件</el-button>
                </div>
            </div>
            <div class="btn-row">
                <el-button type="danger" size="small" @click="deleteExperiment1File">删除已上传文件</el-button>
                <el-button type="primary" size="small" @click="uploadExperiment1">上传实验情况</el-button>
            </div>
        </div>
    </CardItem>

    <CardItem title="骨干课程实验开出情况">
        <p>（移除文件后选择文件进行上传，会在后台数据基础上增加；删除已上传数据为清空后台数据，后台有数据才能删除已上传数据）</p>
        <div class="card-content">
            <input type="file" ref="fileInput2" accept=".xlsx,.xls"
                @change="handleSingleExcelUpload($event, 'experiment2')" />
            <div v-if="experiment2File.name">
                <p>{{ experiment2File.name }}</p>
                <div class="btn-group">
                    <a :href="experiment2File.url" :download="experiment2File.name" target="_blank">
                        <el-button type="success" size="small">下载文件</el-button>
                    </a>
                    <el-button type="warning" size="small" @click="clearExperiment2RawFile">移除文件</el-button>
                </div>
            </div>
            <div class="btn-row">
                <el-button type="danger" size="small" @click="deleteExperiment2File">删除已上传文件</el-button>
                <el-button type="primary" size="small" @click="uploadExperiment2">上传开出情况</el-button>
            </div>
        </div>
    </CardItem>

    <CardItem title="实验室使用人员">
        <p>（移除文件后选择文件进行上传，会在后台数据基础上增加；删除已上传数据为清空后台数据，后台有数据才能删除已上传数据）</p>
        <div class="card-content">
            <input type="file" ref="fileInput3" accept=".xlsx,.xls"
                @change="handleSingleExcelUpload($event, 'experiment3')" />
            <div v-if="experiment3File.name">
                <p>{{ experiment3File.name }}</p>
                <div class="btn-group">
                    <a :href="experiment3File.url" :download="experiment3File.name" target="_blank">
                        <el-button type="success" size="small">下载文件</el-button>
                    </a>
                    <el-button type="warning" size="small" @click="clearExperiment3RawFile">移除文件</el-button>
                </div>
            </div>
            <div class="btn-row">
                <el-button type="danger" size="small" @click="deleteExperiment3File">删除已上传文件</el-button>
                <el-button type="primary" size="small" @click="uploadExperiment3">上传使用情况</el-button>
            </div>
        </div>
    </CardItem>

    <CardItem title="人员信息上传">
        <p>（移除文件后选择文件进行上传，会在后台数据基础上增加；删除已上传数据为清空后台数据，后台有数据才能删除已上传数据）</p>
        <div class="card-content">
            <input type="file" ref="fileInput4" accept=".xlsx,.xls"
                @change="handleSingleExcelUpload($event, 'experiment4')" />
            <div v-if="experiment4File.name">
                <p>{{ experiment4File.name }}</p>
                <div class="btn-group">
                    <a :href="experiment4File.url" :download="experiment4File.name" target="_blank">
                        <el-button type="success" size="small">下载文件</el-button>
                    </a>
                    <el-button type="warning" size="small" @click="clearExperiment4RawFile">移除文件</el-button>
                </div>
            </div>
            <div class="btn-row">
                <el-button type="danger" size="small" @click="deleteExperiment4File">删除已上传文件</el-button>
                <el-button type="primary" size="small" @click="uploadExperiment4">上传人员信息</el-button>
            </div>
        </div>
    </CardItem>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import CardItem from '../CardItem.vue'
import { uploadStuaApi, deleteStuaApi, exportExpeStuaData } from '../../utils/expSituation'
import { uploadExpTimeApi, deleteExpTimeApi, exportExpTimeData } from '../../utils/expTime'
import { uploadStu, deleteStu } from '../../utils/Stu'
import { uploadExpStu, deleteExpStu, exportExpStuData } from '../../utils/expStu'
//3.实验情况表格
const fileInput1 = ref(null)
const fileInput2 = ref(null)
const fileInput3 = ref(null)
const fileInput4 = ref(null)

const experiment1RawFile = ref(null)
const experiment1File = ref({ name: "", url: "" })

const uploadExperiment1 = async () => {
    if (!experiment1RawFile.value) {
        ElMessage.warning('请先选择Excel文件或Excel文件未发生改变')
        return
    }

    try {
        const formData = new FormData()
        formData.append('file', experiment1RawFile.value)
        await uploadStuaApi(formData)
        ElMessage.success('实验情况上传成功')
        fetchExperiment1Data()
    } catch (error) {
        console.error('上传失败:', error)
        ElMessage.error('实验情况上传失败')
    }
}

const fetchExperiment1Data = async () => {
    try {
        const formData = new FormData()
        formData.append('fileName', "实验情况")
        const response = await exportExpeStuaData(formData)
        const blob = new Blob([response], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        })
        const fileUrl = window.URL.createObjectURL(blob)

        experiment1File.value = {
            name: '实验情况数据.xlsx',
            url: fileUrl
        }
    } catch (error) {
        console.error('获取实验情况数据失败:', error)
        ElMessage.error('获取实验情况数据失败')
    }
}

const deleteExperiment1File = async () => {
    try {
        await deleteStuaApi()
        ElMessage.success('删除实验情况成功')
    } catch (error) {
        if (error.response && error.response.status === 404) {
            ElMessage.success('已上传的数据为空，请选择EXCEL文件上传')
        } else {
            console.error('删除实验情况失败:', error)
            ElMessage.error('删除实验情况失败')
            return
        }
    }
    experiment1File.value = { name: "", url: "" }
    experiment1RawFile.value = null
    fileInput1.value.value = ''
}

const clearExperiment1RawFile = () => {
    experiment1RawFile.value = null
    fileInput1.value.value = ''
    experiment1File.value = { name: "", url: "" }
}
//4.骨干课程开出情况柱状图
const experiment2RawFile = ref(null)
const experiment2File = ref({ name: "", url: "" })

const uploadExperiment2 = async () => {
    if (!experiment2RawFile.value) {
        ElMessage.warning('请先选择Excel文件或Excel文件未发生改变')
        return
    }

    try {
        const formData = new FormData()
        formData.append('file', experiment2RawFile.value)
        await uploadExpTimeApi(formData)
        ElMessage.success('骨干课程实验开出情况上传成功')
        fetchExperiment2Data()
    } catch (error) {
        console.error('上传失败:', error)
        ElMessage.error('上传失败')
    }
}

const fetchExperiment2Data = async () => {
    try {
        const formData = new FormData()
        formData.append('fileName', "骨干课程开出情况")
        const response = await exportExpTimeData(formData)
        const blob = new Blob([response], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        })
        const fileUrl = window.URL.createObjectURL(blob)

        experiment2File.value = {
            name: '骨干课程开出情况.xlsx',
            url: fileUrl
        }
    } catch (error) {
        console.error('获取骨干课程实验开出情况失败:', error)
        ElMessage.error('获取骨干课程实验开出情况失败')
    }
}

const deleteExperiment2File = async () => {
    try {
        await deleteExpTimeApi()
        ElMessage.success('删除骨干课程实验开出情况成功')
    } catch (error) {
        if (error.response && error.response.status === 400) {
            ElMessage.success('已上传的数据为空，请选择EXCEL文件上传')
        } else {
            console.error('删除骨干课程实验开出情况失败:', error)
            ElMessage.error('删除骨干课程实验开出情况失败')
            return
        }
    }
    experiment2File.value = { name: "", url: "" }
    experiment2RawFile.value = null
    fileInput2.value.value = ''
}

const clearExperiment2RawFile = () => {
    experiment2RawFile.value = null
    fileInput2.value.value = ''
    experiment2File.value = { name: "", url: "" }
}
// 5.实验室使用人员表格
const experiment3RawFile = ref(null)
const experiment3File = ref({ name: "", url: "" })

const uploadExperiment3 = async () => {
    if (!experiment3RawFile.value) {
        ElMessage.warning('请先选择Excel文件或Excel文件未发生改变')
        return
    }

    try {
        const formData = new FormData()
        formData.append('file', experiment3RawFile.value)
        await uploadExpStu(formData)
        ElMessage.success('实验室使用人员上传成功')
        fetchExperiment3Data()
    } catch (error) {
        console.error('上传失败:', error)
        ElMessage.error('实验室使用人员上传失败: ' + error.message)
    }
}

const fetchExperiment3Data = async () => {
    try {
        const formData = new FormData()
        formData.append('fileName', "实验室使用人员")
        const response = await exportExpStuData(formData)
        const blob = new Blob([response], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        })
        const fileUrl = window.URL.createObjectURL(blob)

        experiment3File.value = {
            name: '实验室使用人员.xlsx',
            url: fileUrl
        }
    } catch (error) {
        console.error('获取实验室使用人员失败:', error)
        ElMessage.error('获取实验室使用人员失败')
    }
}

const deleteExperiment3File = async () => {
    try {
        await deleteExpStu()
        ElMessage.success('删除实验室使用人员成功')
    } catch (error) {
        if (error.response && error.response.status === 404) {
            ElMessage.success('已上传的数据为空，请选择EXCEL文件上传')
        } else {
            console.error('删除实验室使用人员失败:', error)
            ElMessage.error('删除实验室使用人员失败')
            return
        }
    }
    experiment3File.value = { name: "", url: "" }
    experiment3RawFile.value = null
    fileInput3.value.value = ''
}

const clearExperiment3RawFile = () => {
    experiment3RawFile.value = null
    fileInput3.value.value = ''
    experiment3File.value = { name: "", url: "" }
}

// 6 人员信息上传表格
const experiment4RawFile = ref(null)
const experiment4File = ref({ name: "", url: "" })

const uploadExperiment4 = async () => {
    if (!experiment4RawFile.value) {
        ElMessage.warning('请先选择Excel文件或Excel文件未发生改变')
        return
    }

    try {
        const formData = new FormData()
        formData.append('file', experiment4RawFile.value)
        await uploadStu(formData)
        ElMessage.success('人员信息上传成功')
        // fetchExperiment4Data()
    } catch (error) {
        console.error('上传失败:', error)
        ElMessage.error('人员信息上传失败: ' + error.message)
    }
}

const deleteExperiment4File = async () => {
    try {
        await deleteStu()
        ElMessage.success('删除人员信息成功')
    } catch (error) {
        if (error.response && error.response.status === 404) {
            ElMessage.success('已上传的数据为空，请选择EXCEL文件上传')
        } else {
            console.error('删除人员信息失败:', error)
            ElMessage.error('删除人员信息失败')
            return
        }
    }
    experiment4File.value = { name: "", url: "" }
    experiment4RawFile.value = null
    fileInput4.value.value = ''
}

const clearExperiment4RawFile = () => {
    experiment4RawFile.value = null
    fileInput4.value.value = ''
    experiment4File.value = { name: "", url: "" }
}

// 处理单文件 Excel 上传限制
function handleSingleExcelUpload(e, type) {
    const file = e.target.files[0]
    if (!file) return

    const targetMap = {
        experiment1: {
            rawFile: experiment1RawFile,
            displayFile: experiment1File
        },
        experiment2: {
            rawFile: experiment2RawFile,
            displayFile: experiment2File
        },
        experiment3: {
            rawFile: experiment3RawFile,
            displayFile: experiment3File
        },
        experiment4: {
            rawFile: experiment4RawFile,
            displayFile: experiment4File
        }
    }

    const { rawFile, displayFile } = targetMap[type]
    rawFile.value = file
    const fileUrl = URL.createObjectURL(file)
    displayFile.value = {
        name: file.name,
        url: fileUrl
    }
}

onMounted(() => {
    fetchExperiment1Data()
    fetchExperiment2Data()
    fetchExperiment3Data()
})
</script>

<style scoped>
.card-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
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
</style>