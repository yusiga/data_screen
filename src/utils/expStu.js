import service from '../utils/request'

// 上传 Excel 文件
export function uploadExpStu(data) {
    return service.post('/expStu/upload', data)
}

// 删除记录 by ID
export function deleteExpStu() {
    return service.post('/expStu/delete' )
}

// 查询所有记录
export function queryAllExpStu() {
    return service.get('/expStu/queryAll')
}

export function getTrainInformation() {
    return service.get('/expStu/getInformation')
}

// 导出数据为 Excel
export function exportExpStuData(fileName) {
    return service.post('/expStu/exportData', fileName,{responseType: 'blob'})
}

export function deletePersonnelInfo() {
    return service.post('/stu/delete' )
}
export function uploadPersonnelInfo(data) {
    return service.post('/stu/upload', data)
}