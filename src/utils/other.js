import service from '../utils/request'

// 上传混合文件
export function uploadIntroApi(data) {
    return service.post('/others/uploadIntro', data)
}

//删除
export function deleteOtherApi(id) {
    return service.post('/others/delete', id)
}

//查询intro
export function queryIntroApi() {
    return service.get('/others/queryIntro')
}

//上传背景图
export function uploadBackgroundApi(data) {
    return service.post('/others/uploadBackground', data)
}

//查询背景图
export function queryBackgroundApi() {
    return service.get('/others/queryBackground')
}

// 学员风采
export function uploadStudentStyleApi(data) {
    return service.post('/others/uploadStudentStyle', data)
}

export function queryStudentStyleApi() {
    return service.get('/others/queryStudentStyle')
}

// 成果展示
export function uploadAchievementApi(data) {
    return service.post('/others/uploadAchievement', data)
}

export function queryAchievementApi() {
    return service.get('/others/queryAchievement')
}

// 对外交流合作
export function uploadExchangeApi(data) {
    return service.post('/others/uploadExchange', data)
}

export function queryExchangeApi() {
    return service.get('/others/queryExchange')
}

// 首长关怀
export function uploadLeaderCareApi(data) {
    return service.post('/others/uploadLeaderCare', data)
}

export function queryLeaderCareApi() {
    return service.get('/others/queryLeaderCare')
}