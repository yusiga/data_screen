// 社区楼栋布局及热点数据
export const buildings = [
  { id: 1, name: '1号楼', left: '20%', top: '30%', info: '1号楼，12层，48户' },
  { id: 2, name: '2号楼', left: '50%', top: '25%', info: '2号楼，10层，40户' },
  { id: 3, name: '3号楼', left: '70%', top: '40%', info: '3号楼，8层，32户' },
];

export const parkings = [
  { id: 1, name: '车位A', left: '30%', top: '60%', status: '空闲' },
  { id: 2, name: '车位B', left: '60%', top: '65%', status: '占用' },
];

export const cameras = [
  { id: 1, name: '摄像头1', left: '25%', top: '20%', status: '正常' },
  { id: 2, name: '摄像头2', left: '75%', top: '35%', status: '离线' },
];

export const entrances = [
  { id: 1, name: '北门', left: '10%', top: '80%', status: '开启' },
  { id: 2, name: '南门', left: '85%', top: '85%', status: '关闭' },
];

// 人口与出入信息
export const population = {
  total: 1800,
  residents: 1500,
  visitors: 300,
  age: [
    { name: '0-6岁', value: 80 },
    { name: '7-18岁', value: 220 },
    { name: '19-35岁', value: 520 },
    { name: '36-50岁', value: 410 },
    { name: '51-65岁', value: 320 },
    { name: '66岁以上', value: 250 },
  ],
  household: [
    { name: '本地', value: 1100 },
    { name: '外地', value: 600 },
    { name: '港澳台', value: 60 },
    { name: '外籍', value: 40 },
  ],
  // 2024-2030年入住与报警
  annualMoveIn: [210, 230, 250, 270, 260, 280, 300], // 2024-2030
  alarmEvents: [18, 22, 19, 25, 21, 24, 20], // 2024-2030
};

export const vehicle = {
  parkingRate: 0.82,
  registered: 410,
  // 2025年6月30日开始连续14天车流
  flow: [62, 58, 70, 65, 80, 75, 90, 85, 78, 88, 92, 95, 100, 98],
};

// 问题上报处理
export const issues = {
  types: [
    { name: '环境', value: 32 },
    { name: '设施', value: 27 },
    { name: '安防', value: 18 },
    { name: '其他', value: 9 },
  ],
  progress: [
    { name: '已处理', value: 60 },
    { name: '处理中', value: 18 },
    { name: '未处理', value: 8 },
  ],
  list: [
    { id: 1, type: '环境', desc: '垃圾未及时清理', status: '已处理' },
    { id: 2, type: '设施', desc: '健身器材损坏', status: '处理中' },
    { id: 3, type: '安防', desc: '门禁异常', status: '未处理' },
    { id: 4, type: '设施', desc: '电梯运行异常', status: '已处理' },
    { id: 5, type: '环境', desc: '绿化带杂草丛生', status: '已处理' },
    { id: 6, type: '安防', desc: '监控摄像头离线', status: '处理中' },
    { id: 7, type: '设施', desc: '路灯损坏', status: '已处理' },
    { id: 8, type: '环境', desc: '楼道异味', status: '处理中' },
    { id: 9, type: '安防', desc: '陌生人尾随进门', status: '已处理' },
    { id: 10, type: '其他', desc: '快递丢失', status: '未处理' },
  ],
};

// 安防监控
export const security = {
  access: [
    { time: '07:50', type: '进', person: '张三' },
    { time: '08:00', type: '进', person: '李四' },
    { time: '08:10', type: '出', person: '王五' },
    { time: '08:30', type: '进', person: '赵六' },
    { time: '09:00', type: '出', person: '钱七' },
    { time: '09:20', type: '进', person: '孙八' },
    { time: '09:40', type: '出', person: '周九' },
  ],
  visitors: [
    { name: '王五', time: '09:00', reason: '快递' },
    { name: '李雷', time: '10:15', reason: '家政' },
    { name: '韩梅梅', time: '11:30', reason: '亲友' },
    { name: '小明', time: '13:00', reason: '外卖' },
  ],
  warnings: [
    { time: '10:00', event: '异常徘徊', level: '高' },
    { time: '11:20', event: '门禁强行开启', level: '中' },
    { time: '12:45', event: '可疑人员聚集', level: '高' },
  ],
};

// 视频监控
export const videos = [
  { id: 1, name: '大门口', url: '/src/assets/video/video1.mp4' },
  { id: 2, name: '停车场', url: '/src/assets/video/video1.mp4' },
  { id: 3, name: '单元门', url: '/src/assets/video/video1.mp4' },
  { id: 4, name: '电梯口', url: '/src/assets/video/video1.mp4' },
  { id: 5, name: '小区花园', url: '/src/assets/video/video1.mp4' },
  { id: 6, name: '地下车库', url: '/src/assets/video/video1.mp4' },
  { id: 7, name: '健身区', url: '/src/assets/video/video1.mp4' },
  { id: 8, name: '儿童乐园', url: '/src/assets/video/video1.mp4' },
]; 