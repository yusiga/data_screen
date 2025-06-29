import service from './request'

// 上传 Excel 文件
export function uploadExpTimeApi(data) {
    return service.post('/expTime/upload', data)
}

// 删除记录 by ID
export function deleteExpTimeApi() {
    return service.post('/expTime/delete')
}

export function getInformation() {
    return service.get('/expTime/getInformation')
}
// 查询所有记录
export function queryAllExpTime() {
    return service.get('/expTime/queryAll')
}

// 导出数据为 Excel
export function exportExpTimeData(fileName) {
    return service.post('/expTime/exportData', fileName,{responseType: 'blob'})
}