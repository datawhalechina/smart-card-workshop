import { ShowcaseCard } from '@/types';

export const showcaseCategories = {
  '海报设计': ['营销产品', '活动推广', '公益广告'],
  '日常分享': [
    '朋友圈', '旅行计划', '美食分享', '人生成就', '趣事分享', 
    '亲友活动', '读书分享', '产品种草', '八卦解读', '影视推荐'
  ],
  '知识科普': [
    '会议活动', '领域成果', '知识分享', 
    '论文解读', '知识营销', '画线共读'
  ],
  '日常办公': [
    '日报周报', '工作总结', '个人名片', 
    '解压卡片', '简历制作', '会议纪要'
  ],
  '特色创意': [
    '玄学卡片', '塔罗', '今日运势', '特色游戏', 
    '卡片问卷', '采访卡片', '真心话大冒险', '扑克牌'
  ],
  '动态卡片': [],
};

export const sortingOptions = {
  '综合推荐': 'recommended',
  '按热度': 'popularity',
  '按时间': 'latest',
}

export const mockShowcaseCards: ShowcaseCard[] = [
  {
    id: '1',
    title: '【营销】夏季新品发布会',
    content: '清凉一夏，新品来袭！XX品牌夏季新品发布会，邀请您共同见证。',
    htmlContent: '<div>...</div>',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    views: 12000,
    likes: 2300,
    forks: 450,
    tags: ['营销', '新品', '发布会'],
    author: '品牌官方',
    category: '海报设计',
    createdAt: '2024-07-20T10:00:00Z',
    updatedAt: '2024-07-20T10:00:00Z',
  },
  {
    id: '2',
    title: '我的京都奇妙之旅',
    content: '探索古都的魅力，从清水寺到金阁寺，记录下每一个心动瞬间。',
    htmlContent: '<div>...</div>',
    thumbnailUrl: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    views: 8900,
    likes: 1800,
    forks: 320,
    tags: ['旅行', '京都', '日本'],
    author: '旅行家小明',
    category: '日常分享',
    createdAt: '2024-07-19T14:30:00Z',
    updatedAt: '2024-07-19T14:30:00Z',
  },
  {
    id: '3',
    title: 'AI如何改变未来医疗',
    content: '深入探讨人工智能在诊断、治疗和药物研发中的应用与前景。',
    htmlContent: '<div>...</div>',
    thumbnailUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    views: 25000,
    likes: 5600,
    forks: 1200,
    tags: ['AI', '医疗', '科技'],
    author: '科技前沿',
    category: '知识科普',
    createdAt: '2024-07-21T09:00:00Z',
    updatedAt: '2024-07-21T09:00:00Z',
  },
  {
    id: '4',
    title: '项目Q2复盘总结',
    content: '对第二季度项目进行全面复盘，总结经验，规划Q3目标。',
    htmlContent: '<div>...</div>',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    views: 500,
    likes: 50,
    forks: 12,
    tags: ['工作', '总结', '复盘'],
    author: '产品经理-张三',
    category: '日常办公',
    createdAt: '2024-07-01T18:00:00Z',
    updatedAt: '2024-07-01T18:00:00Z',
  },
  {
    id: '5',
    title: '今日运势：水瓶座',
    content: '今天可能会有一次意想不到的相遇，敞开心扉，迎接惊喜。',
    htmlContent: '<div>...</div>',
    thumbnailUrl: 'https://images.unsplash.com/photo-1504333638930-c8787321e06e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    views: 33000,
    likes: 7800,
    forks: 900,
    tags: ['星座', '运势', '水瓶座'],
    author: '星座大师',
    category: '特色创意',
    createdAt: '2024-07-22T08:00:00Z',
    updatedAt: '2024-07-22T08:00:00Z',
  },
  {
    id: '6',
    title: '读书分享：《人类简史》',
    content: '从十万年前有生命迹象开始，到21世纪资本、科技交织的现代社会，这本书颠覆了我的认知。',
    htmlContent: '<div>...</div>',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3ac4024e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    views: 15000,
    likes: 3200,
    forks: 600,
    tags: ['读书', '历史', '人类简史'],
    author: '读书笔记',
    category: '日常分享',
    createdAt: '2024-06-15T12:00:00Z',
    updatedAt: '2024-06-15T12:00:00Z',
  },
  {
    id: '7',
    title: '公益广告：保护海洋',
    content: '每一次净滩，都是对海洋的一次呼吸。减少塑料使用，守护蓝色星球。',
    htmlContent: '<div>...</div>',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551293365-b1a3712140b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    views: 45000,
    likes: 9800,
    forks: 2100,
    tags: ['公益', '环保', '海洋'],
    author: '环保组织',
    category: '海报设计',
    createdAt: '2024-07-18T11:00:00Z',
    updatedAt: '2024-07-18T11:00:00Z',
  },
  {
    id: '8',
    title: '如何制作一份出色的个人简历',
    content: '从排版到内容，教你如何打造一份让HR眼前一亮的简历。',
    htmlContent: '<div>...</div>',
    thumbnailUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    views: 18000,
    likes: 4100,
    forks: 850,
    tags: ['求职', '简历', '技巧'],
    author: '职场达人',
    category: '日常办公',
    createdAt: '2024-07-10T16:00:00Z',
    updatedAt: '2024-07-10T16:00:00Z',
  },
]; 