import service from '../utils/request'

// 上传 Excel 文件
export function uploadStuaApi(data) {
    return service.post('/expSituation/upload', data)
}

// 删除记录 by ID
export function deleteStuaApi() {
    return service.post('/expSituation/delete')
}

// 查询所有记录
export function queryAllStua() {
    return service.get('/expSituation/queryAll')
}

// 导出数据为 Excel
export function exportExpeStuaData(fileName) {
    return service.post('/expSituation/exportData', fileName,{responseType: 'blob'})
}

export function countArriveNum() {
    return service.get('/expSituation/countArriveNum')
}