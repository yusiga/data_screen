import service from '../utils/request'

// 上传 Excel 文件
export function uploadStu(data) {
    return service.post('/stu/upload', data)
}

// 删除记录
export function deleteStu() {
    return service.post('/stu/delete')
}
