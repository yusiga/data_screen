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
  total: 1200,
  residents: 1000,
  visitors: 200,
  age: [
    { name: '0-18岁', value: 150 },
    { name: '19-35岁', value: 400 },
    { name: '36-60岁', value: 350 },
    { name: '60岁以上', value: 300 },
  ],
  household: [
    { name: '本地', value: 800 },
    { name: '外地', value: 400 },
  ],
  annualMoveIn: [120, 150, 180, 200, 220, 250, 300], // 近7年入住
  alarmEvents: [10, 12, 8, 15, 20, 18, 22], // 近7年报警
};

export const vehicle = {
  parkingRate: 0.75,
  registered: 320,
  flow: [30, 45, 60, 50, 40, 55, 70], // 近7天车流
};

// 问题上报处理
export const issues = {
  types: [
    { name: '环境', value: 20 },
    { name: '设施', value: 15 },
    { name: '安防', value: 10 },
    { name: '其他', value: 5 },
  ],
  progress: [
    { name: '已处理', value: 35 },
    { name: '处理中', value: 10 },
    { name: '未处理', value: 5 },
  ],
  list: [
    { id: 1, type: '环境', desc: '小区垃圾未及时清理', status: '已处理' },
    { id: 2, type: '设施', desc: '健身器材损坏', status: '处理中' },
    { id: 3, type: '安防', desc: '门禁异常', status: '未处理' },
  ],
};

// 安防监控
export const security = {
  access: [
    { time: '08:00', type: '进', person: '张三' },
    { time: '08:30', type: '出', person: '李四' },
  ],
  visitors: [
    { name: '王五', time: '09:00', reason: '快递' },
  ],
  warnings: [
    { time: '10:00', event: '异常徘徊', level: '高' },
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