import service from '../utils/request'

export function updateInfo(info) {
    return service.post('/info/update', info)
}
export function queryInfo() {
    return service.get('/info/query')
}  