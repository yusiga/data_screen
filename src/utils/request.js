import axios from 'axios'
import { ElMessage } from "element-plus";
// 创建 axios 实例
const service = axios.create({
  baseURL: '/api', // 基础 URL，会自动与 Vite 代理配置匹配
  timeout: 5000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // 例如：添加 token
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(response => {
    // 对响应数据做点什么
    if (response.status === 200)
        return response.data
    else
        ElMessage({
            message: '参数错误',
            grouping: true,
            type: 'error',
        })
}, error => {
    // 处理响应错误
    ElMessage({
        message: '后端连接失败',
        grouping: true,
        type: 'error',
    })
    return Promise.reject(error);
});

export default service