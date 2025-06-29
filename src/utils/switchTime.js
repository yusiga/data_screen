import service from '../utils/request'

// 上传时间
export function updateSwitchTime(data) {
    return service.post('/switchTime/upload', data)
}

export const getSwitchTime = () => {
  return service.get('/switchTime/get')
}