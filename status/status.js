// 定义起始时间
const startTime = new Date('2023-08-01T00:00:00Z');

// 更新运行时间的函数
function updateUptime() {
    const now = new Date(); // 当前时间
    const diff = now - startTime; // 时间差（毫秒）

    // 将时间差转换为天、小时、分钟和秒
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // 格式化显示内容
    const uptimeText = `
        ${days} 天 ${hours} 小时 ${minutes} 分钟 ${seconds} 秒
    `;

    // 更新到页面上的 uptime 元素
    document.getElementById('uptime').textContent = uptimeText.trim();
}

// 每秒更新一次运行时间
setInterval(updateUptime, 1000);

// 页面加载时立即调用一次
updateUptime();
// 数字雨背景
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(0);

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0F0';
    ctx.font = `${fontSize}px monospace`;

    drops.forEach((y, i) => {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    });
}

// 节点数据
const nodes = [
    { id: 1, region: "CN-BJ", name: "北京核心节点", cpu: 45, mem: 62, status: 1 },
    { id: 2, region: "US-SV", name: "硅谷数据中心", cpu: 78, mem: 82, status: 2 },
    { id: 3, region: "EU-FR", name: "法兰克福节点", cpu: 32, mem: 45, status: 1 },
    { id: 4, region: "AS-SG", name: "新加坡接入点", cpu: 91, mem: 88, status: 3 },
    { id: 5, region: "Cloudflare", name: "全球云", cpu: 61, mem: 58, status: 4 }
];

const statusColors = { 1: "--primary", 2: "--alert", 3: "--critical" };

function renderNodes() {
    const container = document.getElementById('nodeGrid');
    container.innerHTML = nodes.map(node => `
      <div class="node-card" style="border-color: var(${statusColors[node.status]})">
            <div class="node-status" style="background: var(${statusColors[node.status]})"></div>
            <br>
            <h3>${node.region} | ${node.name}</h3>
            <div class="metric-bar">
                <div class="metric-fill" 
                     style="width: ${node.cpu.toFixed(4)}%"></div>  <!-- 进度条保留4位小数 -->
            </div>
            <div>CPU: ${node.cpu.toFixed(4)}%</div>  <!-- 显示值保留4位小数 -->
            <div class="metric-bar">
                <div class="metric-fill" 
                     style="width: ${node.mem.toFixed(4)}%"></div>  <!-- 进度条保留4位小数 -->
            </div>
            <div>内存: ${node.mem.toFixed(4)}%</div>  <!-- 显示值保留4位小数 -->
        </div>
    `).join('');
}

// 日志生成
const geoData = [
    // 中国各省份和直辖市
    { region: "亚洲-中国-北京市", ipRange: "219.143" },
    { region: "亚洲-中国-上海市", ipRange: "202.120" },
    { region: "亚洲-中国-天津市", ipRange: "218.68" },
    { region: "亚洲-中国-重庆市", ipRange: "222.177" },
    { region: "亚洲-中国-河北省-石家庄", ipRange: "222.223" },
    { region: "亚洲-中国-山西省-太原", ipRange: "202.99" },
    { region: "亚洲-中国-内蒙古自治区-呼和浩特", ipRange: "219.150" },
    { region: "亚洲-中国-辽宁省-沈阳", ipRange: "218.60" },
    { region: "亚洲-中国-吉林省-长春", ipRange: "210.47" },
    { region: "亚洲-中国-黑龙江省-哈尔滨", ipRange: "202.97" },
    { region: "亚洲-中国-江苏省-南京", ipRange: "202.119" },
    { region: "亚洲-中国-浙江省-杭州", ipRange: "202.112" },
    { region: "亚洲-中国-安徽省-合肥", ipRange: "210.45" },
    { region: "亚洲-中国-福建省-福州", ipRange: "202.101" },
    { region: "亚洲-中国-江西省-南昌", ipRange: "202.103" },
    { region: "亚洲-中国-山东省-济南", ipRange: "202.194" },
    { region: "亚洲-中国-河南省-郑州", ipRange: "202.102" },
    { region: "亚洲-中国-湖北省-武汉", ipRange: "202.114" },
    { region: "亚洲-中国-湖南省-长沙", ipRange: "202.193" },
    { region: "亚洲-中国-广东省-广州", ipRange: "202.105" },
    { region: "亚洲-中国-广西壮族自治区-南宁", ipRange: "202.103" },
    { region: "亚洲-中国-海南省-海口", ipRange: "202.100" },
    { region: "亚洲-中国-四川省-成都", ipRange: "202.115" },
    { region: "亚洲-中国-贵州省-贵阳", ipRange: "202.98" },
    { region: "亚洲-中国-云南省-昆明", ipRange: "202.200" },
    { region: "亚洲-中国-西藏自治区-拉萨", ipRange: "202.107" },
    { region: "亚洲-中国-陕西省-西安", ipRange: "202.117" },
    { region: "亚洲-中国-甘肃省-兰州", ipRange: "202.112" },
    { region: "亚洲-中国-青海省-西宁", ipRange: "202.108" },
    { region: "亚洲-中国-宁夏回族自治区-银川", ipRange: "202.109" },
    { region: "亚洲-中国-新疆维吾尔自治区-乌鲁木齐", ipRange: "202.110" },
    { region: "亚洲-中国-香港特别行政区", ipRange: "203.199" },
    { region: "亚洲-中国-澳门特别行政区", ipRange: "202.175" },
    { region: "亚洲-中国-台湾省-台北", ipRange: "203.75" },

    // 全球其他主要城市
    { region: "欧洲-德国-法兰克福", ipRange: "88.209" },
    { region: "欧洲-英国-伦敦", ipRange: "91.220" },
    { region: "欧洲-法国-巴黎", ipRange: "195.154" },
    { region: "欧洲-荷兰-阿姆斯特丹", ipRange: "145.97" },
    { region: "欧洲-意大利-罗马", ipRange: "194.242" },
    { region: "欧洲-西班牙-马德里", ipRange: "83.51" },
    { region: "欧洲-瑞典-斯德哥尔摩", ipRange: "194.106" },
    { region: "欧洲-瑞士-苏黎世", ipRange: "195.176" },
    { region: "北美-美国-硅谷", ipRange: "172.217" },
    { region: "北美-美国-纽约", ipRange: "64.233" },
    { region: "北美-加拿大-多伦多", ipRange: "199.199" },
    { region: "南美-巴西-圣保罗", ipRange: "200.206" },
    { region: "南美-阿根廷-布宜诺斯艾利斯", ipRange: "190.210" },
    { region: "非洲-南非-开普敦", ipRange: "196.22.132" },
    { region: "非洲-埃及-开罗", ipRange: "41.215" },
    { region: "大洋洲-澳大利亚-悉尼", ipRange: "103.27" },
    { region: "大洋洲-新西兰-奥克兰", ipRange: "202.179" },
    { region: "中东-阿联酋-迪拜", ipRange: "109.168" },
    { region: "中东-以色列-特拉维夫", ipRange: "79.182" },
    { region: "亚洲-日本-东京", ipRange: "133.130" },
    { region: "亚洲-韩国-首尔", ipRange: "118.216" },
    { region: "亚洲-新加坡-新加坡", ipRange: "119.81" },
    { region: "亚洲-泰国-曼谷", ipRange: "203.144" },
    { region: "亚洲-印度-孟买", ipRange: "117.201" },
    { region: "亚洲-马来西亚-吉隆坡", ipRange: "203.106" },
    { region: "亚洲-菲律宾-马尼拉", ipRange: "203.160" },
    { region: "亚洲-越南-河内", ipRange: "203.162" },
    { region: "亚洲-印尼-雅加达", ipRange: "203.190" },
    { region: "北美洲-墨西哥-墨西哥城", ipRange: "189.125" },
    { region: "南美洲-哥伦比亚-波哥大", ipRange: "190.141" },
    { region: "非洲-尼日利亚-拉各斯", ipRange: "197.210" },
    { region: "欧洲-俄罗斯-莫斯科", ipRange: "95.173" },
    // 新增国际企业
    { region: "北美洲-美国-苹果公司-加利福尼亚州-库比蒂诺", ipRange: "17.0" },  // Apple实际IP段
    { region: "北美洲-美国-谷歌公司-加利福尼亚州-山景城", ipRange: "64.233" },   // 谷歌常用IP段
    { region: "北美洲-美国-微软公司-华盛顿州-雷德蒙德", ipRange: "40.112" },      // Azure主要IP段
    { region: "北美洲-美国-亚马逊AWS-华盛顿州-西雅图", ipRange: "54.240" },     // AWS核心IP段
    { region: "北美洲-美国-特斯拉公司-德克萨斯州-奥斯汀", ipRange: "199.255" },
    { region: "欧洲-荷兰-壳牌石油-海牙总部", ipRange: "193.173" },
    { region: "亚洲-韩国-三星电子-首尔瑞草区", ipRange: "210.114" },
    { region: "欧洲-瑞士-雀巢集团-沃韦总部", ipRange: "194.209" },

    // 国际组织
    { region: "北美洲-国际组织-联合国-纽约总部", ipRange: "149.240" },        // 联合国官网IP段
    { region: "欧洲-国际组织-北约组织-布鲁塞尔总部", ipRange: "193.110" },
    { region: "欧洲-国际组织-欧盟议会-斯特拉斯堡", ipRange: "80.83" },
    { region: "亚洲-国际组织-东盟秘书处-雅加达", ipRange: "202.58" },
    { region: "欧洲-瑞士-国际红十字会-日内瓦", ipRange: "194.246" },
    
    // 互联网基础设施
    { region: "北美洲-美国-Cloudflare-旧金山核心节点", ipRange: "104.16" },    // 实际CDN IP段
    { region: "北美洲-美国-Akamai-马萨诸塞州-剑桥", ipRange: "23.0" },         // 全球CDN节点
    { region: "欧洲-德国-法兰克福-DE-CIX互联网交换中心", ipRange: "80.81" },   // 全球最大IXP
    
    // 金融机构
    { region: "北美洲-美国-美联储-华盛顿数据中心", ipRange: "207.230" },
    { region: "欧洲-瑞士-国际清算银行-巴塞尔", ipRange: "195.176" },
    { region: "亚洲-中国-亚洲基础设施投资银行-北京总部", ipRange: "203.176" },
    
    // 新增科技公司
    { region: "北美洲-美国-IBM-纽约州-阿蒙克", ipRange: "129.42" },
    { region: "亚洲-日本-索尼集团-东京都港区", ipRange: "210.254" },
    { region: "欧洲-芬兰-诺基亚-埃斯波", ipRange: "193.210" },
    { region: "北美洲-加拿大-黑莓公司-安大略省", ipRange: "209.212" },
    
    // 社交媒体平台
    { region: "北美洲-美国-Meta-加利福尼亚州-门洛帕克", ipRange: "31.13" },    // Facebook
    { region: "北美洲-美国-Twitter-加利福尼亚州-旧金山", ipRange: "104.244" },  // X平台
    { region: "亚洲-中国-字节跳动-新加坡亚太节点", ipRange: "119.81" },        // TikTok
    
    // 电信运营商
    { region: "北美洲-美国-AT&T-德克萨斯州-达拉斯", ipRange: "12.0" },
    { region: "亚洲-中国-中国电信-广州骨干网", ipRange: "202.97" },
    { region: "欧洲-英国-沃达丰-伦敦总部", ipRange: "193.25" },
    
    // 新增国际机构
    { region: "欧洲-法国-联合国教科文组织-巴黎", ipRange: "193.194" },
    { region: "欧洲-瑞士-世界卫生组织-日内瓦", ipRange: "194.146" },
    { region: "北美洲-美国-世界银行-华盛顿特区", ipRange: "207.230" },
    { region: "欧洲-比利时-欧盟委员会-布鲁塞尔", ipRange: "80.83" },
    
    // 新增科研机构
    { region: "欧洲-瑞士-欧洲核子研究中心-日内瓦", ipRange: "128.141" },
    { region: "北美洲-美国-NASA-加州喷气推进实验室", ipRange: "169.154" },
    { region: "亚洲-日本-高能加速器研究机构-筑波市", ipRange: "192.145" },
    
    // 新增行业代表
    { region: "亚洲-沙特-沙特阿美-达兰总部", ipRange: "212.26" },             // 石油巨头
    { region: "南美洲-巴西-淡水河谷-里约热内卢", ipRange: "200.160" },        // 矿业巨头
    { region: "大洋洲-澳大利亚-必和必拓-墨尔本", ipRange: "203.12" },         // 全球矿业
    { region: "非洲-南非-德比尔斯-约翰内斯堡", ipRange: "196.33" },            // 钻石行业
    
    // 新增关键基础设施
    { region: "北美洲-美国-纽约证券交易所", ipRange: "208.176" },
    { region: "亚洲-日本-东京证券交易所", ipRange: "210.169" },
    { region: "欧洲-英国-伦敦金属交易所", ipRange: "193.130" },
    
    // 新增媒体机构
    { region: "北美洲-美国-彭博社-纽约总部", ipRange: "199.254" },
    { region: "欧洲-英国-路透社-伦敦金丝雀码头", ipRange: "213.152" },
    { region: "亚洲-卡塔尔-半岛电视台-多哈", ipRange: "82.148" },
    
    // 新增汽车制造商
    { region: "欧洲-德国-大众集团-沃尔夫斯堡", ipRange: "193.200" },
    { region: "亚洲-日本-丰田汽车-爱知县", ipRange: "202.214" },
    { region: "北美洲-美国-通用汽车-底特律", ipRange: "156.154" },
    
    // 新增金融机构
    { region: "北美洲-美国-摩根大通-纽约总部", ipRange: "158.113" },
    { region: "欧洲-瑞士-瑞银集团-苏黎世", ipRange: "194.208" },
    { region: "亚洲-中国-香港交易所", ipRange: "203.198" },
    
    // 新增电商平台
    { region: "亚洲-中国-阿里巴巴-杭州西溪园区", ipRange: "140.205" },        // 阿里云核心IP
    { region: "亚洲-中国-京东集团-北京亦庄", ipRange: "111.206" },
    { region: "北美洲-美国-沃尔玛-阿肯色州本顿维尔", ipRange: "161.130" },
    
    // 新增电信设备商
    { region: "亚洲-中国-华为技术-深圳坂田", ipRange: "210.22" },
    { region: "欧洲-瑞典-爱立信-斯德哥尔摩", ipRange: "193.181" },
    { region: "欧洲-芬兰-诺基亚-埃斯波", ipRange: "193.210" },
    
    // 新增国际金融机构
    { region: "欧洲-瑞士-国际货币基金组织-日内瓦", ipRange: "194.146" },
    { region: "亚洲-菲律宾-亚洲开发银行-马尼拉", ipRange: "202.133" },
    
    // 新增非洲代表
    { region: "非洲-尼日利亚-非洲开发银行-阿布贾", ipRange: "197.211" },
    { region: "非洲-肯尼亚-非洲联盟-内罗毕", ipRange: "196.201" },
    
    // 新增中东代表
    { region: "中东-卡塔尔-卡塔尔航空-多哈", ipRange: "82.148" },
    { region: "中东-阿联酋-阿提哈德航空-阿布扎比", ipRange: "94.200" }
];

function generateIP(base) {
    return `${base}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`;
}

function generateLogEntry() {
    const methods = ['GET', 'POST', 'PUT', 'DELETE'];
    const endpoints = [
    // 用户相关
    '/api/v1/users',                     // 获取用户列表
    '/api/v1/users/:id',                 // 获取特定用户信息
    '/api/v1/users/register',            // 用户注册
    '/api/v1/users/login',               // 用户登录
    '/api/v1/users/logout',              // 用户登出
    '/api/v1/users/update',              // 更新用户信息
    '/api/v1/users/delete/:id',          // 删除用户
    '/api/v1/users/reset-password',      // 重置密码
    '/api/v1/users/verify-email',        // 验证邮箱

    // 身份验证与授权
    '/auth/login',                       // 登录接口
    '/auth/logout',                      // 登出接口
    '/auth/refresh-token',               // 刷新令牌
    '/auth/forgot-password',             // 忘记密码
    '/auth/verify-token',                // 验证令牌有效性
    '/auth/change-password',             // 修改密码
    '/auth/roles',                       // 获取用户角色
    '/auth/permissions',                 // 获取权限列表

    // 数据查询与操作
    '/api/v1/data',                      // 获取数据列表
    '/api/v1/data/:id',                  // 获取特定数据项
    '/api/v1/data/create',               // 创建新数据
    '/api/v1/data/update/:id',           // 更新数据项
    '/api/v1/data/delete/:id',           // 删除数据项
    '/api/v1/data/search',               // 搜索数据
    '/api/v1/data/export',               // 导出数据
    '/api/v1/data/import',               // 导入数据

    // 文件上传与下载
    '/cdn/assets',                       // 获取资源列表
    '/cdn/assets/upload',                // 上传文件
    '/cdn/assets/download/:fileId',      // 下载文件
    '/cdn/assets/delete/:fileId',        // 删除文件
    '/cdn/assets/preview/:fileId',       // 文件预览
    '/cdn/assets/metadata/:fileId',      // 获取文件元数据

    // 数据库查询
    '/db/query',                         // 执行数据库查询
    '/db/query/:table',                  // 查询特定表
    '/db/insert/:table',                 // 插入数据到表
    '/db/update/:table/:id',             // 更新表中的记录
    '/db/delete/:table/:id',             // 删除表中的记录
    '/db/stats',                         // 数据库状态统计
    '/db/backup',                        // 数据库备份
    '/db/restore',                       // 数据库恢复

    // 系统监控与日志
    '/system/status',                    // 系统运行状态
    '/system/logs',                      // 获取系统日志
    '/system/metrics',                   // 系统性能指标
    '/system/health-check',              // 健康检查
    '/system/alerts',                    // 系统告警
    '/system/config',                    // 系统配置
    '/system/restart',                   // 重启服务
    '/system/shutdown',                  // 关闭服务

    // 订单与支付
    '/api/v1/orders',                    // 获取订单列表
    '/api/v1/orders/:id',                // 获取特定订单
    '/api/v1/orders/create',             // 创建订单
    '/api/v1/orders/cancel/:id',         // 取消订单
    '/api/v1/orders/pay/:id',            // 支付订单
    '/api/v1/orders/refund/:id',         // 退款
    '/api/v1/orders/history',            // 订单历史

    // 消息与通知
    '/api/v1/messages',                  // 获取消息列表
    '/api/v1/messages/send',             // 发送消息
    '/api/v1/messages/read/:id',         // 标记消息已读
    '/api/v1/notifications',             // 获取通知列表
    '/api/v1/notifications/mark-read',   // 标记通知已读
    '/api/v1/notifications/clear',       // 清空通知

    // 社交与互动
    '/api/v1/posts',                     // 获取帖子列表
    '/api/v1/posts/create',              // 创建新帖子
    '/api/v1/posts/:id',                 // 获取特定帖子
    '/api/v1/posts/like/:id',            // 点赞帖子
    '/api/v1/posts/comment/:id',         // 评论帖子
    '/api/v1/friends',                   // 获取好友列表
    '/api/v1/friends/add',               // 添加好友
    '/api/v1/friends/remove/:id',        // 移除好友

    // 第三方集成
    '/api/v1/integrations',              // 获取第三方集成列表
    '/api/v1/integrations/connect',      // 连接第三方服务
    '/api/v1/integrations/disconnect',   // 断开第三方服务
    '/api/v1/webhooks',                  // 获取 Webhook 列表
    '/api/v1/webhooks/create',           // 创建 Webhook
    '/api/v1/webhooks/delete/:id',       // 删除 Webhook

    // 测试与调试
    '/test/ping',                        // 测试服务器连接
    '/test/echo',                        // 回显请求内容
    '/test/error',                       // 触发错误测试
    '/test/stress',                      // 压力测试

    '026-countdown.html',
    '04-error-roomcss.zip',
    'pple top',
    'rchive.html',
    'sset',
    'ingSiteAuth.xml',
    'odepan',
    'ss',
    'ocusaurus',
    'mail',
    'avicon.ico',
    'ile_paths.txt',
    'ont',
    'lobalnews.html',
    'frame',
    'ndex.html',
    'nfo',
    'ntelligence',
    'nvestigate',
    's',
    'ap.html',
    'arxistDatabase',
    'p4',
    'usic',
    'ewindex.html',
    'ewindex2.html',
    'ewindex3.html',
    'ews',
    'vidia.html',
    'pen.html',
    'penhtml.html',
    'ppo_font',
    'rganization',
    'df-viewer.html',
    'dfshow.html',
    'ersonage',
    'ingFangSC-main',
    'wen_index',
    'erch.html',
    'F-Pro-Display',
    'itemap.xml',
    'ource',
    'tatus',
    'tyles.css',
    'extbook.html',
    'iddlywiki',
    'ools',
    'nhub_001.png',
    'nhub_loding.html',
    'ikipedia',
    'isdom',
    'ytc-ai.html',
    'ytc-info.html',
    'ip',
    'yhmap',
    '����Ϣ����',
    'pple top/index.html',
    'pple top/script.js',
    'pple top/style.css',
    'sset/car_img',
    'sset/ceshi',
    'sset/data',
    'sset/icon_logo',
    'sset/iit_asset',
    'sset/jiaocai',
    'sset/js_icon',
    'sset/MP4',
    'sset/nav_font',
    'sset/nav_img',
    'sset/newindex_img',
    'sset/new_index_img',
    'sset/new_logo',
    'sset/new_website_assets',
    'sset/NextBook.gif',
    'sset/open_img',
    'sset/car_img/ChinaTextbook.jpg',
    'sset/car_img/globalnews.jpg',
    'sset/car_img/gn.png',
    'sset/car_img/jishu.png',
    'sset/car_img/music.jpg',
    'sset/car_img/org.jpg',
    'sset/car_img/Sun Yat-sen.png',
    'sset/car_img/wisdom.jpg',
    'sset/ceshi/jqqd.png',
    'sset/data/compressed_parsed_hierarchical_structure.json',
    'sset/data/hierarchical_structure.txt',
    'sset/data/parsed_hierarchical_structure.json',
    'sset/icon_logo/306.svg',
    'sset/icon_logo/360_unhub_logo.png',
    'sset/icon_logo/biaodan.svg',
    'sset/icon_logo/cloudflare-for-teams.svg',
    'sset/icon_logo/favicon.ico',
    'sset/icon_logo/football-club-riograndense-de-rio-grande-rs.svg',
    'sset/icon_logo/hbxytc.png',
    'sset/icon_logo/hei_by_y_1.png',
    'sset/icon_logo/hei_by_y_1.svg',
    'sset/icon_logo/hei_b_y_1.png',
    'sset/icon_logo/imagemin.svg',
    'sset/icon_logo/kfc-8.svg',
    'sset/icon_logo/loading.svg',
    'sset/icon_logo/loading_2025.svg',
    'sset/icon_logo/loading_menshen.svg',
    'sset/icon_logo/login.svg',
    'sset/icon_logo/Marx_Engels_oval.svg',
    'sset/icon_logo/mcdonald-s-7.svg',
    'sset/icon_logo/mcdonalds-7.svg',
    'sset/icon_logo/open-source.svg',
    'sset/icon_logo/powershell.svg',
    'sset/icon_logo/red-hat.svg',
    'sset/icon_logo/red-zyhorg.png',
    'sset/icon_logo/red_by_y_1.png',
    'sset/icon_logo/red_b_y_2.png',
    'sset/icon_logo/red_y_y_3.png',
    'sset/icon_logo/unhub.svg',
    'sset/icon_logo/unhub_music.svg',
    'sset/icon_logo/unhub_red.svg',
    'sset/icon_logo/unhub_verify.svg',
    'sset/icon_logo/verify.svg',
    'sset/icon_logo/Wikinews-logo.svg',
    'sset/icon_logo/zhwiki-cny-2025.svg',
    'sset/iit_asset/css',
    'sset/iit_asset/img',
    'sset/iit_asset/logo',
    'sset/iit_asset/css/style.css',
    'sset/iit_asset/img/bg01.png',
    'sset/iit_asset/img/bg02.png',
    'sset/iit_asset/img/top',
    'sset/iit_asset/img/wxz.svg',
    'sset/iit_asset/img/xz.svg',
    'sset/iit_asset/img/��һ����Ϣ����.svg',
    'sset/iit_asset/img/top/albert-stoynov-dyUp7WPu5q4-unsplash.jpg',
    'sset/iit_asset/img/top/clay-banks-_Jb1TF3kvsA-unsplash.jpg',
    'sset/iit_asset/img/top/dp.png',
    'sset/iit_asset/img/top/flyd-mT7lXZPjk7U-unsplash.jpg',
    'sset/iit_asset/img/top/jean-philippe-delberghe-75xPHEQBmvA-unsplash.jpg',
    'sset/iit_asset/img/top/scott-rodgerson-PSpf_XgOM5w-unsplash.jpg',
    'sset/iit_asset/img/top/shubham-dhage-_rZnChsIFuQ-unsplash.jpg',
    'sset/iit_asset/img/top/steve-johnson-ZPOoDQc8yMw-unsplash.jpg',
    'sset/iit_asset/img/top/xcn.png',
    'sset/iit_asset/img/top/zhizhao.jpg',
    'sset/iit_asset/logo/logo1.png',
    'sset/iit_asset/logo/logo2.png',
    'sset/iit_asset/logo/logo3.png',
    'sset/iit_asset/logo/logo3.svg',
    'sset/jiaocai/jiaocai_nav.png',
    'sset/jiaocai/jiaochai_logo.png',
    'sset/js_icon/apple.svg',
    'sset/js_icon/cloudflare.svg',
    'sset/js_icon/github.svg',
    'sset/js_icon/JavaScript.svg',
    'sset/js_icon/jetbrains.svg',
    'sset/js_icon/linux.svg',
    'sset/js_icon/PowerShell.svg',
    'sset/js_icon/python.svg',
    'sset/js_icon/ǰ��.svg',
    'sset/js_icon/��ת.svg',
    'sset/MP4/405078372-1-208.mp4',
    'sset/MP4/��ֽ�����ȡ�_1_Ҫ��_����С������ҳ��.jpg',
    'sset/MP4/ʤ���Ӻ�Ӱ ����Ұ�� �����Ȱ�������_1_GuoGang_����С������ҳ��.jpg',
    'sset/MP4/ʤ���Ӻ�Ӱ ����Ұ�� �����Ȱ�������_2_GuoGang_����С������ҳ��.jpg',
    'sset/nav_font/API��.svg',
    'sset/nav_font/������.svg',
    'sset/nav_font/���߿�.svg',
    'sset/nav_font/��Դ��.svg',
    'sset/nav_font/�йܿ�.svg',
    'sset/nav_font/�̿����.svg',
    'sset/nav_font/��ҳ.svg',
    'sset/nav_img/2025_s.png',
    'sset/nav_img/2025_s.svg',
    'sset/nav_img/Animation - 1737888421871.gif',
    'sset/nav_img/apt.png',
    'sset/nav_img/china.png',
    'sset/nav_img/font.png',
    'sset/nav_img/new year.svg',
    'sset/nav_img/newyear2025.png',
    'sset/nav_img/qie.png',
    'sset/nav_img/sb.png',
    'sset/nav_img/shou.jpg',
    'sset/nav_img/snake.png',
    'sset/nav_img/th.png',
    'sset/nav_img/vday-store-seasonalbanner-202501.png',
    'sset/nav_img/yun.jpg',
    'sset/nav_img/һ��������.svg',
    'sset/newindex_img/jfk-mb.jpg',
    'sset/newindex_img/jfk-mb2.jpg',
    'sset/newindex_img/jfk-mb3.jpg',
    'sset/newindex_img/jfk.jpg',
    'sset/newindex_img/lunwen.jpg',
    'sset/newindex_img/map-max.jpg',
    'sset/newindex_img/map-min.jpg',
    'sset/newindex_img/map-sumax.jpg',
    'sset/newindex_img/xytsg-supmax.jpg',
    'sset/newindex_img/xyzyjsxy-long.jpg',
    'sset/newindex_img/xyzyjsxy-mb.jpg',
    'sset/newindex_img/xyzyjsxy-mb2.jpg',
    'sset/newindex_img/xyzyjsxy-mb3.jpg',
    'sset/newindex_img/xyzyjsxy.jpg',
    'sset/newindex_img/xyzyjsxy_medium_2x.jpg',
    'sset/new_index_img/cen_img',
    'sset/new_index_img/icon',
    'sset/new_index_img/top',
    'sset/new_index_img/cen_img/eye.jpg',
    'sset/new_index_img/icon/cloudflare.svg',
    'sset/new_index_img/icon/deepseek.svg',
    'sset/new_index_img/icon/Docker.svg',
    'sset/new_index_img/icon/drcc.svg',
    'sset/new_index_img/icon/GitHub.svg',
    'sset/new_index_img/icon/GN.svg',
    'sset/new_index_img/icon/hug.svg',
    'sset/new_index_img/icon/iit.svg',
    'sset/new_index_img/icon/linux.svg',
    'sset/new_index_img/icon/microsoft.svg',
    'sset/new_index_img/icon/navres.svg',
    'sset/new_index_img/icon/ollama.svg',
    'sset/new_index_img/icon/oolong.svg',
    'sset/new_index_img/icon/openwebui.svg',
    'sset/new_index_img/icon/oppo.svg',
    'sset/new_index_img/icon/qwen.svg',
    'sset/new_index_img/icon/unhub.svg',
    'sset/new_index_img/icon/VMware.svg',
    'sset/new_index_img/icon/wisdom.svg',
    'sset/new_index_img/icon/xytc.svg',
    'sset/new_index_img/icon/zlsj.svg',
    'sset/new_index_img/icon/zyhgov.svg',
    'sset/new_index_img/icon/zyhorg.svg',
    'sset/new_index_img/icon/���ҵ���.svg',
    'sset/new_index_img/icon/ģ��-hugging face.svg',
    'sset/new_index_img/icon/��ϵ��.svg',
    'sset/new_index_img/icon/��Ѷ��.svg',
    'sset/new_index_img/icon/����֪ʶ.svg',
    'sset/new_index_img/icon/������.svg',
    'sset/new_index_img/top/ai.jpg',
    'sset/new_index_img/top/kn2025.webp',
    'sset/new_index_img/top/wlaq.jpg',
    'sset/new_index_img/top/World_Time_Zones_Map.png',
    'sset/new_index_img/top/xytc-ai.jpg',
    'sset/new_logo/logo-hong.png',
    'sset/new_logo/logo-hui.png',
    'sset/new_website_assets/css',
    'sset/new_website_assets/font',
    'sset/new_website_assets/icon',
    'sset/new_website_assets/js',
    'sset/new_website_assets/kejiqianyan',
    'sset/new_website_assets/logo',
    'sset/new_website_assets/nav',
    'sset/new_website_assets/top',
    'sset/new_website_assets/top2',
    'sset/new_website_assets/wappalyzer_127-0.0.1.csv',
    'sset/new_website_assets/css/oppo_main.877afd8de28c0bdbd0b8.css',
    'sset/new_website_assets/font/OPPO Sans 4.0.ttf',
    'sset/new_website_assets/font/PingFang.woff2',
    'sset/new_website_assets/icon/github-2.svg',
    'sset/new_website_assets/icon/github-icon-1.svg',
    'sset/new_website_assets/icon/google.svg',
    'sset/new_website_assets/icon/nvidia-wordmark-1.svg',
    'sset/new_website_assets/icon/outlook.svg',
    'sset/new_website_assets/icon/qq.svg',
    'sset/new_website_assets/icon/QQcai.svg',
    'sset/new_website_assets/icon/qqqr.png',
    'sset/new_website_assets/icon/QQ����.svg',
    'sset/new_website_assets/icon/wxqr.png',
    'sset/new_website_assets/icon/΢��.svg',
    'sset/new_website_assets/icon/΢��cai.svg',
    'sset/new_website_assets/icon/΢�Ű�.svg',
    'sset/new_website_assets/icon/�绰.svg',
    'sset/new_website_assets/icon/��ϵ��.svg',
    'sset/new_website_assets/js/cloud-observation-rum.global.prod.js',
    'sset/new_website_assets/js/index.umd.js',
    'sset/new_website_assets/js/jquery-3.5.1.min.js',
    'sset/new_website_assets/js/lunar.min.js',
    'sset/new_website_assets/js/oppo_main.84638998acd54656de81.js',
    'sset/new_website_assets/js/oppo_vendor.3bb9cc8c1bfa5311f84b.js',
    'sset/new_website_assets/js/TweenMax_TimelineMax.min.js',
    'sset/new_website_assets/kejiqianyan/browser-use.jpg',
    'sset/new_website_assets/kejiqianyan/collect-a-colossal-2x-gta-and-rp-on-the-titan-job-in-oscar-guzman-flie.jpg',
    'sset/new_website_assets/kejiqianyan/GitHub��ѿ�Դ��Ŀ.jpg',
    'sset/new_website_assets/kejiqianyan/modelcontextprotocolservers ģ�ͷ���.png',
    'sset/new_website_assets/kejiqianyan/ollama.jpg',
    'sset/new_website_assets/kejiqianyan/qwq-32b-final.jpg',
    'sset/new_website_assets/kejiqianyan/QwQΪ����ְҵ����ѧԺ.jpg',
    'sset/new_website_assets/kejiqianyan/reach-new-heights-with-double-rewards-on-air-freight-cargo-sell-missio.jpg',
    'sset/new_website_assets/kejiqianyan/shadps4-emu.png',
    'sset/new_website_assets/kejiqianyan/xytc-ai.jpg',
    'sset/new_website_assets/logo/logo.svg',
    'sset/new_website_assets/nav/textbook.png',
    'sset/new_website_assets/top/cloudflare.png',
    'sset/new_website_assets/top/fwq.jpg',
    'sset/new_website_assets/top/fwq2.jpg',
    'sset/new_website_assets/top/knd-5120-1280-v2-2.jpg',
    'sset/new_website_assets/top/knd-5120-1280-v2.jpg',
    'sset/new_website_assets/top/lunwen.jpg',
    'sset/new_website_assets/top/lunwen2.jpg',
    'sset/new_website_assets/top/UNHub AI ϵ��.png',
    'sset/new_website_assets/top/UNHub DOC.png',
    'sset/new_website_assets/top/xytc-ds-5120-1280-v2-2.jpg',
    'sset/new_website_assets/top/xytc-ds-5120-1280-v2.jpg',
    'sset/new_website_assets/top2/conan2025.png',
    'sset/new_website_assets/top2/lunwen.png',
    'sset/new_website_assets/top2/mail.png',
    'sset/new_website_assets/top2/mail2.png',
    'sset/new_website_assets/top2/music.jpg',
    'sset/open_img/0001.jpg',
    'sset/open_img/0002.jpg',
    'sset/open_img/0003.jpg',
    'sset/open_img/0004.jpg',
    'sset/open_img/1592067431_2034_thumb.jpg',
    'sset/open_img/1592067432_1719_thumb.jpg',
    'sset/open_img/1592067432_4882_thumb.jpg',
    'sset/open_img/2.jpg',
    'sset/open_img/3.jpg',
    'sset/open_img/ai_img',
    'sset/open_img/bd_0001.png',
    'sset/open_img/bd_0002.png',
    'sset/open_img/bd_0003.png',
    'sset/open_img/bd_0004.png',
    'sset/open_img/bd_0005.png',
    'sset/open_img/bd_0006.png',
    'sset/open_img/bd_0007.png',
    'sset/open_img/bd_0008.jpg',
    'sset/open_img/bd_0008.png',
    'sset/open_img/bd_0020-1.png',
    'sset/open_img/bd_0020.png',
    'sset/open_img/bd_0021.png',
    'sset/open_img/bd_0022.png',
    'sset/open_img/deepseek_xytc.svg',
    'sset/open_img/info.svg',
    'sset/open_img/miaoshujiem1.jpeg',
    'sset/open_img/n1.webp',
    'sset/open_img/n2.webp',
    'sset/open_img/n3.webp',
    'sset/open_img/qwq-32b-final.jpg',
    'sset/open_img/QwQ-32B-Preview_result.png',
    'sset/open_img/qwq0001.png',
    'sset/open_img/tool_json',
    'sset/open_img/unhub_xytc_ds.svg',
    'sset/open_img/xytc.svg',
    'sset/open_img/xytc_logo.png',
    'sset/open_img/xytc_logo2.png',
    'sset/open_img/xytc_logo3.png',
    'sset/open_img/xytc_v3_full.png',
    'sset/open_img/xyzyjsxy.svg',
    'sset/open_img/xyzyjsxy_baise_r1.svg',
    'sset/open_img/xyzyjsxy_ds_r1-qwen.png',
    'sset/open_img/xyzyjsxy_ds_r1.png',
    'sset/open_img/xyzyjsx_lv_logo.svg',
    'sset/open_img/xyzyjsx_qwen_logo.svg',
    'sset/open_img/����ְҵ����ѧԺ֪ʶ��',
    'sset/open_img/ai_img/c1.jpg',
    'sset/open_img/ai_img/cf_1.jpg',
    'sset/open_img/ai_img/cf_2.jpg',
    'sset/open_img/ai_img/cf_3.jpg',
    'sset/open_img/ai_img/cf_4.jpg',
    'sset/open_img/ai_img/cf_f_1.jpg',
    'sset/open_img/ai_img/cf_f_2.jpg',
    'sset/open_img/ai_img/cf_f_4.jpg',
    'sset/open_img/ai_img/deepseek_xytc.jpg',
    'sset/open_img/ai_img/deepseek_xytc.svg',
    'sset/open_img/ai_img/icon',
    'sset/open_img/ai_img/n1.jpg',
    'sset/open_img/ai_img/n2.jpg',
    'sset/open_img/ai_img/n3.jpg',
    'sset/open_img/ai_img/n4.jpg',
    'sset/open_img/ai_img/n5.jpg',
    'sset/open_img/ai_img/news_img',
    'sset/open_img/ai_img/time.jpg',
    'sset/open_img/ai_img/icon/cloudflare.svg',
    'sset/open_img/ai_img/icon/deepseek.svg',
    'sset/open_img/ai_img/icon/ollama.svg',
    'sset/open_img/ai_img/icon/PyTorch.svg',
    'sset/open_img/ai_img/icon/tensorflow.svg',
    'sset/open_img/ai_img/icon/ģ��-hugging face.svg',
    'sset/open_img/ai_img/news_img/bd_0021.png',
    'sset/open_img/ai_img/news_img/bd_0022.png',
    'sset/open_img/ai_img/news_img/dl001.jpg',
    'sset/open_img/ai_img/news_img/dl002.jpg',
    'sset/open_img/ai_img/news_img/dl003.jpg',
    'sset/open_img/ai_img/news_img/error.jpg',
    'sset/open_img/ai_img/news_img/openwebui001.jpg',
    'sset/open_img/ai_img/news_img/openwebui002.jpg',
    'sset/open_img/tool_json/tool-Knowledgebase tools.json',
    'sset/open_img/����ְҵ����ѧԺ֪ʶ��/xytc_info.txt',
    'sset/open_img/����ְҵ����ѧԺ֪ʶ��/����ְҵ����ѧԺ��Ϣ.txt',
    'sset/open_img/����ְҵ����ѧԺ֪ʶ��/����ְҵ����ѧԺʦ�ʶ���.txt',
    'sset/open_img/����ְҵ����ѧԺ֪ʶ��/����ְҵ����ѧԺ��ʦ�¼�.txt',
    'odepan/ai',
    'odepan/open',
    'odepan/opencard',
    'odepan/ai/open.html',
    'odepan/ai/����.txt',
    'odepan/open/card.css',
    'odepan/open/dist',
    'odepan/open/index.html',
    'odepan/open/script.js',
    'odepan/open/style.css',
    'odepan/open/dist/index.html',
    'odepan/open/dist/script.js',
    'odepan/open/dist/style.css',
    'odepan/opencard/index.html',
    'odepan/opencard/script.js',
    'odepan/opencard/style.css',
    'ss/ac-globalnav.css',
    'ss/aos-overrides.css',
    'ss/archive.css',
    'ss/as-store.css',
    'ss/common.css',
    'ss/effect.css',
    'ss/external.css',
    'ss/globalnews.css',
    'ss/loading.css',
    'ss/map.css',
    'ss/nav.css',
    'ss/networkCheck.css',
    'ss/open',
    'ss/serch.css',
    'ss/step-zero.css',
    'ss/store-home.css',
    'ss/swiper-bundle.min.css',
    'ss/swiper.css',
    'ss/Textbook.css',
    'ss/zyhdivmap.css',
    'ss/open/3.4.16',
    'ss/open/zt.css',
    'ocusaurus/my-docs',
    'ocusaurus/ά���ٿƴ���HTML',
    'ocusaurus/�����ٿ�ͼƬ',
    'mail/contact.html',
    'ont/.gitkeep',
    'ont/Inter-Variable.ttf',
    'ont/JetBrainsMono-2.304',
    'ont/JetBrainsMono-2.304.zip',
    'ont/NotoSansHans-Regular.otf',
    'ont/PingFangSC-Medium.ttf',
    'ont/PingFangSC-Medium.woff2',
    'ont/PingFangSC-Regular.ttf',
    'ont/PingFangSC-Regular.woff2',
    'ont/PingFangSC-Semibold.ttf',
    'ont/PingFangSC-Semibold.woff2',
    'ont/sf-pro-display_semibold.woff2',
    'ont/JetBrainsMono-2.304/AUTHORS.txt',
    'ont/JetBrainsMono-2.304/fonts',
    'ont/JetBrainsMono-2.304/OFL.txt',
    'ont/JetBrainsMono-2.304/fonts/ttf',
    'ont/JetBrainsMono-2.304/fonts/variable',
    'ont/JetBrainsMono-2.304/fonts/webfonts',
    'ont/JetBrainsMono-2.304/fonts/ttf/JetBrainsMono-Bold.ttf',
    'ont/JetBrainsMono-2.304/fonts/ttf/JetBrainsMono-BoldItalic.ttf',
    'ont/JetBrainsMono-2.304/fonts/ttf/JetBrainsMono-ExtraBold.ttf',
    'ont/JetBrainsMono-2.304/fonts/ttf/JetBrainsMono-ExtraBoldItalic.ttf',
    'ont/JetBrainsMono-2.304/fonts/ttf/JetBrainsMono-ExtraLight.ttf',
    'ont/JetBrainsMono-2.304/fonts/ttf/JetBrainsMono-ExtraLightItalic.ttf',
    'ont/JetBrainsMono-2.304/fonts/ttf/JetBrainsMono-Italic.ttf',
    'ont/JetBrainsMono-2.304/fonts/ttf/JetBrainsMono-Light.ttf',
    'ont/JetBrainsMono-2.304/fonts/ttf/JetBrainsMono-LightItalic.ttf',
    'ont/JetBrainsMono-2.304/fonts/ttf/JetBrainsMono-Medium.ttf',
    'ont/JetBrainsMono-2.304/fonts/ttf/JetBrainsMono-MediumItalic.ttf',
    'ont/JetBrainsMono-2.304/fonts/ttf/JetBrainsMono-Regular.ttf',
    'ont/JetBrainsMono-2.304/fonts/ttf/JetBrainsMono-SemiBold.ttf',
    'ont/JetBrainsMono-2.304/fonts/ttf/JetBrainsMono-SemiBoldItalic.ttf',
    'ont/JetBrainsMono-2.304/fonts/ttf/JetBrainsMono-Thin.ttf',
    'ont/JetBrainsMono-2.304/fonts/ttf/JetBrainsMono-ThinItalic.ttf',
    'ont/JetBrainsMono-2.304/fonts/ttf/JetBrainsMonoNL-Bold.ttf',
    'ont/JetBrainsMono-2.304/fonts/ttf/JetBrainsMonoNL-BoldItalic.ttf',
    'ont/JetBrainsMono-2.304/fonts/ttf/JetBrainsMonoNL-ExtraBold.ttf',
    'ont/JetBrainsMono-2.304/fonts/ttf/JetBrainsMonoNL-ExtraBoldItalic.ttf',
    'ont/JetBrainsMono-2.304/fonts/ttf/JetBrainsMonoNL-ExtraLight.ttf',
    'ont/JetBrainsMono-2.304/fonts/ttf/JetBrainsMonoNL-ExtraLightItalic.ttf',
    'ont/JetBrainsMono-2.304/fonts/ttf/JetBrainsMonoNL-Italic.ttf',
    'ont/JetBrainsMono-2.304/fonts/ttf/JetBrainsMonoNL-Light.ttf',
    'ont/JetBrainsMono-2.304/fonts/ttf/JetBrainsMonoNL-LightItalic.ttf',
    'ont/JetBrainsMono-2.304/fonts/ttf/JetBrainsMonoNL-Medium.ttf',
    'ont/JetBrainsMono-2.304/fonts/ttf/JetBrainsMonoNL-MediumItalic.ttf',
    'ont/JetBrainsMono-2.304/fonts/ttf/JetBrainsMonoNL-Regular.ttf',
    'ont/JetBrainsMono-2.304/fonts/ttf/JetBrainsMonoNL-SemiBold.ttf',
    'ont/JetBrainsMono-2.304/fonts/ttf/JetBrainsMonoNL-SemiBoldItalic.ttf',
    'ont/JetBrainsMono-2.304/fonts/ttf/JetBrainsMonoNL-Thin.ttf',
    'ont/JetBrainsMono-2.304/fonts/ttf/JetBrainsMonoNL-ThinItalic.ttf',
    'ont/JetBrainsMono-2.304/fonts/variable/JetBrainsMono-Italic[wght].ttf',
    'ont/JetBrainsMono-2.304/fonts/variable/JetBrainsMono[wght].ttf',
    'ont/JetBrainsMono-2.304/fonts/webfonts/JetBrainsMono-Bold.woff2',
    'ont/JetBrainsMono-2.304/fonts/webfonts/JetBrainsMono-BoldItalic.woff2',
    'ont/JetBrainsMono-2.304/fonts/webfonts/JetBrainsMono-ExtraBold.woff2',
    'ont/JetBrainsMono-2.304/fonts/webfonts/JetBrainsMono-ExtraBoldItalic.woff2',
    'ont/JetBrainsMono-2.304/fonts/webfonts/JetBrainsMono-ExtraLight.woff2',
    'ont/JetBrainsMono-2.304/fonts/webfonts/JetBrainsMono-ExtraLightItalic.woff2',
    'ont/JetBrainsMono-2.304/fonts/webfonts/JetBrainsMono-Italic.woff2',
    'ont/JetBrainsMono-2.304/fonts/webfonts/JetBrainsMono-Light.woff2',
    'ont/JetBrainsMono-2.304/fonts/webfonts/JetBrainsMono-LightItalic.woff2',
    'ont/JetBrainsMono-2.304/fonts/webfonts/JetBrainsMono-Medium.woff2',
    'ont/JetBrainsMono-2.304/fonts/webfonts/JetBrainsMono-MediumItalic.woff2',
    'ont/JetBrainsMono-2.304/fonts/webfonts/JetBrainsMono-Regular.woff2',
    'ont/JetBrainsMono-2.304/fonts/webfonts/JetBrainsMono-SemiBold.woff2',
    'ont/JetBrainsMono-2.304/fonts/webfonts/JetBrainsMono-SemiBoldItalic.woff2',
    'ont/JetBrainsMono-2.304/fonts/webfonts/JetBrainsMono-Thin.woff2',
    'ont/JetBrainsMono-2.304/fonts/webfonts/JetBrainsMono-ThinItalic.woff2',
    'frame/��Ȧ��ѧ���',
    'frame/��Ȧ��ѧ���/55ae-ietnfsq1275692.jpg',
    'frame/��Ȧ��ѧ���/index.html',
    'frame/��Ȧ��ѧ���/mute (1).png',
    'frame/��Ȧ��ѧ���/mute.png',
    'frame/��Ȧ��ѧ���/plus.png',
    'frame/��Ȧ��ѧ���/restart.png',
    'frame/��Ȧ��ѧ���/script.js',
    'frame/��Ȧ��ѧ���/sdz1.png',
    'frame/��Ȧ��ѧ���/sdz2.png',
    'frame/��Ȧ��ѧ���/sdz3.png',
    'frame/��Ȧ��ѧ���/sdz4.png',
    'frame/��Ȧ��ѧ���/sdz5.png',
    'frame/��Ȧ��ѧ���/sdz6.png',
    'frame/��Ȧ��ѧ���/sdz7.png',
    'frame/��Ȧ��ѧ���/sdz8.png',
    'frame/��Ȧ��ѧ���/sound.png',
    'frame/��Ȧ��ѧ���/stick1.png',
    'frame/��Ȧ��ѧ���/stick2.png',
    'frame/��Ȧ��ѧ���/stick3.png',
    'frame/��Ȧ��ѧ���/stick4.png',
    'frame/��Ȧ��ѧ���/stick5.png',
    'frame/��Ȧ��ѧ���/style.css',
    'frame/��Ȧ��ѧ���/�������������ְ棩.ogg.mp3',
    'nfo/16_112f8f03c4affe4b3ac7.jpg',
    'nfo/3_57fee22710b04cebe1d5.svg',
    'nfo/app.js',
    'nfo/app2.js',
    'nfo/auth.html',
    'nfo/auth.js',
    'nfo/bg-2.jpg',
    'nfo/bg.svg',
    'nfo/lny25_mac__d1fgjqerrxkm_wallpaper_6016x3384.jpg',
    'nfo/login.css',
    'nfo/login.html',
    'nfo/login.js',
    'nfo/macos-sequoia-4096x2262-17019.jpg',
    'nfo/manage.js',
    'nfo/notice.js',
    'nfo/privacy.js',
    'nfo/register.css',
    'nfo/register.html',
    'nfo/register.js',
    'nfo/register_login.html',
    'nfo/register_login.js',
    'nfo/secure.js',
    'nfo/sty.css',
    'nfo/styles.css',
    'nfo/supabase-js.js',
    'nfo/t11b673bcd6e4d756bd9c237a2d.png',
    'nfo/tailwind.config.js',
    'nfo/tailwind.min.css',
    'nfo/userinfo.js',
    'nfo/welcome.css',
    'nfo/welcome.html',
    'nfo/welcome.js',
    'nfo/wp5424185-wallpaper-mac-pro.png',
    'nfo/�û� (1).png',
    'nfo/�û�.png',
    'nfo/�û�.svg',
    'ntelligence/ai.css',
    'ntelligence/deepseek r1.svg',
    'ntelligence/deepseek-copy.svg',
    'ntelligence/deepseek.svg',
    'ntelligence/delete.svg',
    'ntelligence/edit.svg',
    'ntelligence/github-markdown-light.min.css',
    'ntelligence/knowledge-base.txt',
    'ntelligence/lod.js',
    'ntelligence/marked.min.js',
    'ntelligence/O1CN01cOgO0228KfUaIUM9k_!!6000000007914-54-tps-150-150.apng',
    'ntelligence/script copy.js',
    'ntelligence/script.js',
    'ntelligence/sf-pro-display_semibold.woff2',
    'ntelligence/styles.css',
    'ntelligence/unhub_qwen.png',
    'ntelligence/unhub_wisdom_qwen.png',
    'ntelligence/wisdom.html',
    'ntelligence/wisdom.png',
    'ntelligence/wisdom.svg',
    'ntelligence/wisdom_heng.png',
    'ntelligence/zyhgov.png',
    'ntelligence/��������.svg',
    'ntelligence/���ļ� 18.txt',
    'nvestigate/har-9a23f0dc-cf50-4121-9d41-f00b1af4dfe3.har',
    'nvestigate/json-9a23f0dc-cf50-4121-9d41-f00b1af4dfe3.json',
    's/ac-globalnav.umd.js',
    's/analytics.js',
    's/apt.js',
    's/archive.js',
    's/axios.min.js',
    's/daotaicharu.js',
    's/echo.min.js',
    's/external.js',
    's/globalelements.js',
    's/globalnews.js',
    's/img.js',
    's/jquery.min.js',
    's/loading.js',
    's/lodash.min.js',
    's/log.js',
    's/map.js',
    's/networkCheck.js',
    's/news-data.json',
    's/open',
    's/pages.js',
    's/react-dom.production.min.js',
    's/react.production.min.js',
    's/serch.js',
    's/set.js',
    's/store-home.js',
    's/swiper.js',
    's/Textbook.js',
    's/unsupportedBrowser.min.js',
    's/open/config.js',
    's/open/open.js',
    'arxistDatabase/index.html',
    'arxistDatabase/marxist.css',
    'arxistDatabase/marxist.js',
    'p4/music.mp4',
    'p4/���ľ������Դ001.mp4',
    'usic/.gitkeep',
    'usic/asset',
    'usic/css',
    'usic/index.html',
    'usic/js',
    'usic/music.jpg',
    'usic/music.json',
    'usic/music2.jpg',
    'usic/musicplay.html',
    'usic/script.js',
    'usic/style.css',
    'usic/asset/.gitkeep',
    'usic/asset/images',
    'usic/asset/images/.gitkeep',
    'usic/asset/images/zhuanji',
    'usic/asset/images/zhuanji/.gitkeep',
    'usic/asset/images/zhuanji/ggyh.webp',
    'usic/asset/images/zhuanji/ljj.webp',
    'usic/asset/images/zhuanji/mldq.webp',
    'usic/asset/images/zhuanji/syydxb.webp',
    'usic/asset/images/zhuanji/TFBOYS.webp',
    'usic/asset/images/zhuanji/�е���ѩ-���������ı���.webp',
    'usic/asset/images/zhuanji/�������ĵ׵�����-¬����.webp',
    'usic/asset/images/zhuanji/�Ҵ�����.webp',
    'usic/asset/images/zhuanji/���-���ư�.webp',
    'usic/asset/images/zhuanji/��ں�-������.webp',
    'usic/asset/images/zhuanji/��ں�_-_������.webp',
    'usic/asset/images/zhuanji/������.webp',
    'usic/asset/images/zhuanji/С�����-�Ն�.webp',
    'usic/asset/images/zhuanji/��ʼ����-������.webp',
    'usic/asset/images/zhuanji/��ʼ����_-_������.webp',
    'usic/asset/images/zhuanji/�Һ�æ.webp',
    'usic/asset/images/zhuanji/����˹С��-��ͯ����.webp',
    'usic/asset/images/zhuanji/����˹С��_-_��ͯ����.webp',
    'usic/asset/images/zhuanji/��-TFBOYS.webp',
    'usic/asset/images/zhuanji/��һ��-������.webp',
    'usic/asset/images/zhuanji/��һ��_-_������.webp',
    'usic/asset/images/zhuanji/Ⱥ��.webp',
    'usic/asset/images/zhuanji/�ط�ʮ����.webp',
    'usic/asset/images/zhuanji/�����.webp',
    'usic/asset/images/zhuanji/�����2.webp',
    'usic/asset/images/zhuanji/�갮-��ة��.webp',
    'usic/asset/images/zhuanji/�갮_-_��ة��.webp',
    'usic/asset/images/zhuanji/Τ��.webp',
    'usic/asset/images/zhuanji/¹��.webp',
    'usic/css/.gitkeep',
    'usic/css/music.css',
    'usic/css/playlist.css',
    'usic/js/.gitkeep',
    'usic/js/jquery-3.7.1.min.js',
    'usic/js/music2.js',
    'usic/js/responsive.js',
    'ews/2024',
    'ews/2025',
    'ews/data',
    'ews/Marxismus',
    'ews/news.css',
    'ews/news_img',
    'ews/zhanwang',
    'ews/2024/12',
    'ews/2024/12/ny2025.html',
    'ews/2025/1',
    'ews/2025/2',
    'ews/2025/3',
    'ews/2025/1/20250114_zffr.html',
    'ews/2025/1/20250115_GJ_001.html',
    'ews/2025/1/20250115_GN_001.html',
    'ews/2025/1/20250115_GN_002.html',
    'ews/2025/1/20250115_GN_003.html',
    'ews/2025/1/20250116_GJ_001.html',
    'ews/2025/1/20250116_GJ_002.html',
    'ews/2025/1/20250118_GJ_001.html',
    'ews/2025/1/20250120_garfield.html',
    'ews/2025/1/20250120_GN_001.html',
    'ews/2025/1/20250120_gtxy.html',
    'ews/2025/1/20250120_jng.html',
    'ews/2025/1/20250120_kdy.html',
    'ews/2025/1/20250120_kt.html',
    'ews/2025/1/20250120_melody.html',
    'ews/2025/1/20250120_mickey.html',
    'ews/2025/1/20250120_mll.html',
    'ews/2025/1/20250120_stitch.html',
    'ews/2025/1/20250120_xhl.html',
    'ews/2025/1/20250123_GJ_001.html',
    'ews/2025/1/20250123_GJ_002.html',
    'ews/2025/1/20250123_GJ_003.html',
    'ews/2025/1/20250131_paper.html',
    'ews/2025/1/360apt.html',
    'ews/2025/1/Conan2025.html',
    'ews/2025/1/MyWebsiteInfo.html',
    'ews/2025/1/notion.html',
    'ews/2025/1/Safety-Statement.html',
    'ews/2025/1/sgp_20250114_001.html',
    'ews/2025/1/test.html',
    'ews/2025/2/20250211_wisdom.html',
    'ews/2025/2/Cities-Skylines-i.html',
    'ews/2025/2/Jensen_Jen-hsun_Huang.html',
    'ews/2025/2/WorldBox.html',
    'ews/2025/3/xytc-DeepSeek.html',
    'ews/data/DeepSeek_R1.pdf',
    'ews/data/W020250115316365065129.doc',
    'ews/data/������_222003872_����Hadoopƽ̨�ľ�ҵ����Ԥ��.pdf',
    'ews/data/�S�ʄ�_���Ͽ�UNHub.pdf',
    'ews/Marxismus/marxismus_img',
    'ews/news_img/2',
    'ews/news_img/360-2.png',
    'ews/news_img/360.jpg',
    'ews/news_img/benchmark.jpg',
    'ews/news_img/c77c301dadc2a31bdd7d3e2b02e3f32e.jpg',
    'ews/news_img/Conan2025_biaoz.webp',
    'ews/news_img/Conan2025_haibao.webp',
    'ews/news_img/deepseek_r1_benchmark_table.png',
    'ews/news_img/deepseek_r1_example.gif',
    'ews/news_img/deepseek_r1_hf.png',
    'ews/news_img/deepseek_r1_price.jpeg',
    'ews/news_img/deepseek_r1_price_compare.png',
    'ews/news_img/Donald J. Trump.jpeg',
    'ews/news_img/eMLnTUZe4irzR4LC.jpg',
    'ews/news_img/gongshi.jpg',
    'ews/news_img/hanzheng.jpeg',
    'ews/news_img/info01.jpg',
    'ews/news_img/info01.png',
    'ews/news_img/info02.jpg',
    'ews/news_img/info03.jpg',
    'ews/news_img/j4mWz5R6eHfVZT4X.jpeg',
    'ews/news_img/JD Vance.jpeg',
    'ews/news_img/JFK_limousine.png',
    'ews/news_img/John_F._Kennedy,_White_House_color_photo_portrait.jpg',
    'ews/news_img/kejie.jpg',
    'ews/news_img/logo.png',
    'ews/news_img/lunwen.jpeg',
    'ews/news_img/nhk.jpg',
    'ews/news_img/paper.jpg',
    'ews/news_img/paper2.jpg',
    'ews/news_img/r',
    'ews/news_img/screen-shot-edit.jpg',
    'ews/news_img/screen-shot-preview.jpg',
    'ews/news_img/sgp.jpg',
    'ews/news_img/she_2025.jpg',
    'ews/news_img/shirunrun.jpg',
    'ews/news_img/text.jpg',
    'ews/news_img/txyun',
    'ews/news_img/W020250115386588485834.jpg',
    'ews/news_img/wisdom.jpg',
    'ews/news_img/wisdom_window.jpg',
    'ews/news_img/xxycdtxw.jpg',
    'ews/news_img/year_bg.jpg',
    'ews/news_img/2/2788-2888_San_Tomas_Expwy.jpg',
    'ews/news_img/2/2788-2888_San_Tomas_Expwy.jpg.crdownload',
    'ews/news_img/2/cities-skylines-ii-keyart-clean-3200px.jpg',
    'ews/news_img/2/cities-skylines-ii-physical-edition-5.png',
    'ews/news_img/2/greg.png',
    'ews/news_img/2/Jen-Hsun_Huang_Headshot_(15313247387).jpg',
    'ews/news_img/2/Jensen_Huang_20231109_(cropped2).jpg',
    'ews/news_img/2/mario.png',
    'ews/news_img/2/vid-placeholder.webp',
    'ews/news_img/2/WorldBox.png',
    'ews/news_img/2/ë�󶫱�׼��.jpg',
    'ews/news_img/r/gtxy (1).jpg',
    'ews/news_img/r/gtxy (10).jpg',
    'ews/news_img/r/gtxy (11).jpg',
    'ews/news_img/r/gtxy (12).jpg',
    'ews/news_img/r/gtxy (13).jpg',
    'ews/news_img/r/gtxy (2).jpg',
    'ews/news_img/r/gtxy (3).jpg',
    'ews/news_img/r/gtxy (4).jpg',
    'ews/news_img/r/gtxy (5).jpg',
    'ews/news_img/r/gtxy (6).jpg',
    'ews/news_img/r/gtxy (7).jpg',
    'ews/news_img/r/gtxy (8).jpg',
    'ews/news_img/r/gtxy (9).jpg',
    'ews/news_img/r/jfm (1).jpg',
    'ews/news_img/r/jfm (10).jpg',
    'ews/news_img/r/jfm (11).jpg',
    'ews/news_img/r/jfm (12).jpg',
    'ews/news_img/r/jfm (13).jpg',
    'ews/news_img/r/jfm (2).jpg',
    'ews/news_img/r/jfm (3).jpg',
    'ews/news_img/r/jfm (4).jpg',
    'ews/news_img/r/jfm (5).jpg',
    'ews/news_img/r/jfm (6).jpg',
    'ews/news_img/r/jfm (7).jpg',
    'ews/news_img/r/jfm (8).jpg',
    'ews/news_img/r/jfm (9).jpg',
    'ews/news_img/r/jng (10).jpg',
    'ews/news_img/r/jng (11).jpg',
    'ews/news_img/r/jng (12).jpg',
    'ews/news_img/r/jng (13).jpg',
    'ews/news_img/r/jng (2).jpg',
    'ews/news_img/r/jng (3).jpg',
    'ews/news_img/r/jng (4).jpg',
    'ews/news_img/r/jng (5).jpg',
    'ews/news_img/r/jng (6).jpg',
    'ews/news_img/r/jng (7).jpg',
    'ews/news_img/r/jng (8).jpg',
    'ews/news_img/r/jng (9).jpg',
    'ews/news_img/r/kdy (1).jpg',
    'ews/news_img/r/kdy (10).jpg',
    'ews/news_img/r/kdy (11).jpg',
    'ews/news_img/r/kdy (12).jpg',
    'ews/news_img/r/kdy (13).jpg',
    'ews/news_img/r/kdy (2).jpg',
    'ews/news_img/r/kdy (3).jpg',
    'ews/news_img/r/kdy (4).jpg',
    'ews/news_img/r/kdy (5).jpg',
    'ews/news_img/r/kdy (6).jpg',
    'ews/news_img/r/kdy (7).jpg',
    'ews/news_img/r/kdy (8).jpg',
    'ews/news_img/r/kdy (9).jpg',
    'ews/news_img/r/kt (1).jpg',
    'ews/news_img/r/kt (10).jpg',
    'ews/news_img/r/kt (11).jpg',
    'ews/news_img/r/kt (12).jpg',
    'ews/news_img/r/kt (13).jpg',
    'ews/news_img/r/kt (2).jpg',
    'ews/news_img/r/kt (3).jpg',
    'ews/news_img/r/kt (4).jpg',
    'ews/news_img/r/kt (5).jpg',
    'ews/news_img/r/kt (6).jpg',
    'ews/news_img/r/kt (7).jpg',
    'ews/news_img/r/kt (8).jpg',
    'ews/news_img/r/kt (9).jpg',
    'ews/news_img/r/mld (1).jpg',
    'ews/news_img/r/mld (10).jpg',
    'ews/news_img/r/mld (11).jpg',
    'ews/news_img/r/mld (12).jpg',
    'ews/news_img/r/mld (13).jpg',
    'ews/news_img/r/mld (2).jpg',
    'ews/news_img/r/mld (3).jpg',
    'ews/news_img/r/mld (4).jpg',
    'ews/news_img/r/mld (5).jpg',
    'ews/news_img/r/mld (6).jpg',
    'ews/news_img/r/mld (7).jpg',
    'ews/news_img/r/mld (8).jpg',
    'ews/news_img/r/mld (9).jpg',
    'ews/news_img/r/mll (1).jpg',
    'ews/news_img/r/mll (10).jpg',
    'ews/news_img/r/mll (11).jpg',
    'ews/news_img/r/mll (12).jpg',
    'ews/news_img/r/mll (13).jpg',
    'ews/news_img/r/mll (2).jpg',
    'ews/news_img/r/mll (3).jpg',
    'ews/news_img/r/mll (4).jpg',
    'ews/news_img/r/mll (5).jpg',
    'ews/news_img/r/mll (6).jpg',
    'ews/news_img/r/mll (7).jpg',
    'ews/news_img/r/mll (8).jpg',
    'ews/news_img/r/mll (9).jpg',
    'ews/news_img/r/mq (1).jpg',
    'ews/news_img/r/mq (10).jpg',
    'ews/news_img/r/mq (11).jpg',
    'ews/news_img/r/mq (12).jpg',
    'ews/news_img/r/mq (13).jpg',
    'ews/news_img/r/mq (2).jpg',
    'ews/news_img/r/mq (3).jpg',
    'ews/news_img/r/mq (4).jpg',
    'ews/news_img/r/mq (5).jpg',
    'ews/news_img/r/mq (6).jpg',
    'ews/news_img/r/mq (7).jpg',
    'ews/news_img/r/mq (8).jpg',
    'ews/news_img/r/mq (9).jpg',
    'ews/news_img/r/sdz (1).jpg',
    'ews/news_img/r/sdz (10).jpg',
    'ews/news_img/r/sdz (2).jpg',
    'ews/news_img/r/sdz (3).jpg',
    'ews/news_img/r/sdz (4).jpg',
    'ews/news_img/r/sdz (5).jpg',
    'ews/news_img/r/sdz (6).jpg',
    'ews/news_img/r/sdz (7).jpg',
    'ews/news_img/r/sdz (8).jpg',
    'ews/news_img/r/sdz (9).jpg',
    'ews/news_img/r/squirtle.jpg',
    'ews/news_img/r/xhl (1).jpg',
    'ews/news_img/r/xhl (10).jpg',
    'ews/news_img/r/xhl (11).jpg',
    'ews/news_img/r/xhl (12).jpg',
    'ews/news_img/r/xhl (13).jpg',
    'ews/news_img/r/xhl (2).jpg',
    'ews/news_img/r/xhl (3).jpg',
    'ews/news_img/r/xhl (4).jpg',
    'ews/news_img/r/xhl (5).jpg',
    'ews/news_img/r/xhl (6).jpg',
    'ews/news_img/r/xhl (7).jpg',
    'ews/news_img/r/xhl (8).jpg',
    'ews/news_img/r/xhl (9).jpg',
    'ews/news_img/txyun/3ea38a9520c2ab207132ccdf8c059edae130746a.jpg',
    'ews/news_img/txyun/65e6332db34bacc884b2a59e73e5df26208fcdc3.jpg',
    'ews/news_img/txyun/cities-skylines-ii-keyart-clean-3200px.jpg',
    'ews/news_img/txyun/gongshi.jpg',
    'ews/news_img/txyun/info01.jpg',
    'ews/news_img/txyun/NextBook.gif',
    'ews/news_img/txyun/paper.jpg',
    'ews/news_img/txyun/vid-placeholder.webp',
    'ews/news_img/txyun/wisdom.jpg',
    'ews/zhanwang/paper.htm',
    'ews/zhanwang/verify.htm',
    'ews/zhanwang/wisdom.htm',
    'ews/zhanwang/xytc-ai.htm',
    'ppo_font/OPPOSans3.0cn-Medium.woff2',
    'ppo_font/OPPOSans3.0cn-Regular.woff2',
    'rganization/bg.jpg',
    'rganization/hug.jpg',
    'rganization/index.html',
    'rganization/oolong.jpg',
    'rganization/style.css',
    'rganization/unhub.jpg',
    'rganization/wisdom.jpg',
    'rganization/wpmc.jpg',
    'rganization/zyh.jpg',
    'rganization/zyhgov.jpg',
    'rganization/zyhnas.jpg',
    'ersonage/1.html',
    'ersonage/4e4a20a4462309f79052991150441bf3d7ca7bcb78d4.jpg',
    'ersonage/ac4bd11373f08202948bbfd44dfbfbedab641b3b.webp',
    'ersonage/code.html',
    'ersonage/index.html',
    'ersonage/index2.html',
    'ersonage/Jensen_Jen-hsun_Huang.html',
    'ersonage/leadership.html',
    'ersonage/script.js',
    'ersonage/styles.css',
    'ersonage/table.html',
    'ersonage/table.txt',
    'ersonage/table2.html',
    'ersonage/up.html',
    'ingFangSC-main/.gitignore',
    'ingFangSC-main/index.html',
    'ingFangSC-main/LICENSE',
    'ingFangSC-main/README.md',
    'ingFangSC-main/ttf',
    'ingFangSC-main/woff2',
    'ingFangSC-main/ttf/PingFangSC-Light.ttf',
    'ingFangSC-main/ttf/PingFangSC-Medium.ttf',
    'ingFangSC-main/ttf/PingFangSC-Regular.ttf',
    'ingFangSC-main/ttf/PingFangSC-Semibold.ttf',
    'ingFangSC-main/ttf/PingFangSC-Thin.ttf',
    'ingFangSC-main/ttf/PingFangSC-ttf.css',
    'ingFangSC-main/ttf/PingFangSC-Ultralight.ttf',
    'ingFangSC-main/woff2/PingFangSC-Light.woff2',
    'ingFangSC-main/woff2/PingFangSC-Medium.woff2',
    'ingFangSC-main/woff2/PingFangSC-Regular.woff2',
    'ingFangSC-main/woff2/PingFangSC-Semibold.woff2',
    'ingFangSC-main/woff2/PingFangSC-Thin.woff2',
    'ingFangSC-main/woff2/PingFangSC-Ultralight.woff2',
    'ingFangSC-main/woff2/PingFangSC-woff2.css',
    'wen_index/index.html',
    'F-Pro-Display/sf-pro-display_medium.woff2',
    'F-Pro-Display/sf-pro-display_regular.woff2',
    'F-Pro-Display/sf-pro-display_semibold.woff2',
    'F-Pro-Display/V4.21',
    'F-Pro-Display/V4.21.zip',
    'F-Pro-Display/V4.21/chrome_100_percent.pak',
    'F-Pro-Display/V4.21/chrome_200_percent.pak',
    'F-Pro-Display/V4.21/d3dcompiler_47.dll',
    'F-Pro-Display/V4.21/ffmpeg.dll',
    'F-Pro-Display/V4.21/icudtl.dat',
    'F-Pro-Display/V4.21/libEGL.dll',
    'F-Pro-Display/V4.21/libGLESv2.dll',
    'F-Pro-Display/V4.21/LICENSE.electron.txt',
    'F-Pro-Display/V4.21/LICENSES.chromium.html',
    'F-Pro-Display/V4.21/locales',
    'F-Pro-Display/V4.21/resources',
    'F-Pro-Display/V4.21/resources.pak',
    'F-Pro-Display/V4.21/snapshot_blob.bin',
    'F-Pro-Display/V4.21/v8_context_snapshot.bin',
    'F-Pro-Display/V4.21/vk_swiftshader.dll',
    'F-Pro-Display/V4.21/vk_swiftshader_icd.json',
    'F-Pro-Display/V4.21/vulkan-1.dll',
    'F-Pro-Display/V4.21/һ��.exe',
    'F-Pro-Display/V4.21/locales/af.pak',
    'F-Pro-Display/V4.21/locales/am.pak',
    'F-Pro-Display/V4.21/locales/ar.pak',
    'F-Pro-Display/V4.21/locales/bg.pak',
    'F-Pro-Display/V4.21/locales/bn.pak',
    'F-Pro-Display/V4.21/locales/ca.pak',
    'F-Pro-Display/V4.21/locales/cs.pak',
    'F-Pro-Display/V4.21/locales/da.pak',
    'F-Pro-Display/V4.21/locales/de.pak',
    'F-Pro-Display/V4.21/locales/el.pak',
    'F-Pro-Display/V4.21/locales/en-GB.pak',
    'F-Pro-Display/V4.21/locales/en-US.pak',
    'F-Pro-Display/V4.21/locales/es-419.pak',
    'F-Pro-Display/V4.21/locales/es.pak',
    'F-Pro-Display/V4.21/locales/et.pak',
    'F-Pro-Display/V4.21/locales/fa.pak',
    'F-Pro-Display/V4.21/locales/fi.pak',
    'F-Pro-Display/V4.21/locales/fil.pak',
    'F-Pro-Display/V4.21/locales/fr.pak',
    'F-Pro-Display/V4.21/locales/gu.pak',
    'F-Pro-Display/V4.21/locales/he.pak',
    'F-Pro-Display/V4.21/locales/hi.pak',
    'F-Pro-Display/V4.21/locales/hr.pak',
    'F-Pro-Display/V4.21/locales/hu.pak',
    'F-Pro-Display/V4.21/locales/id.pak',
    'F-Pro-Display/V4.21/locales/it.pak',
    'F-Pro-Display/V4.21/locales/ja.pak',
    'F-Pro-Display/V4.21/locales/kn.pak',
    'F-Pro-Display/V4.21/locales/ko.pak',
    'F-Pro-Display/V4.21/locales/lt.pak',
    'F-Pro-Display/V4.21/locales/lv.pak',
    'F-Pro-Display/V4.21/locales/ml.pak',
    'F-Pro-Display/V4.21/locales/mr.pak',
    'F-Pro-Display/V4.21/locales/ms.pak',
    'F-Pro-Display/V4.21/locales/nb.pak',
    'F-Pro-Display/V4.21/locales/nl.pak',
    'F-Pro-Display/V4.21/locales/pl.pak',
    'F-Pro-Display/V4.21/locales/pt-BR.pak',
    'F-Pro-Display/V4.21/locales/pt-PT.pak',
    'F-Pro-Display/V4.21/locales/ro.pak',
    'F-Pro-Display/V4.21/locales/ru.pak',
    'F-Pro-Display/V4.21/locales/sk.pak',
    'F-Pro-Display/V4.21/locales/sl.pak',
    'F-Pro-Display/V4.21/locales/sr.pak',
    'F-Pro-Display/V4.21/locales/sv.pak',
    'F-Pro-Display/V4.21/locales/sw.pak',
    'F-Pro-Display/V4.21/locales/ta.pak',
    'F-Pro-Display/V4.21/locales/te.pak',
    'F-Pro-Display/V4.21/locales/th.pak',
    'F-Pro-Display/V4.21/locales/tr.pak',
    'F-Pro-Display/V4.21/locales/uk.pak',
    'F-Pro-Display/V4.21/locales/ur.pak',
    'F-Pro-Display/V4.21/locales/vi.pak',
    'F-Pro-Display/V4.21/locales/zh-CN.pak',
    'F-Pro-Display/V4.21/locales/zh-TW.pak',
    'F-Pro-Display/V4.21/resources/app.asar',
    'F-Pro-Display/V4.21/resources/app.asar.unpacked',
    'F-Pro-Display/V4.21/resources/elevate.exe',
    'F-Pro-Display/V4.21/resources/app.asar.unpacked/resources',
    'F-Pro-Display/V4.21/resources/app.asar.unpacked/resources/ffmpeg',
    'F-Pro-Display/V4.21/resources/app.asar.unpacked/resources/ffmpeg.exe',
    'ource/3.4.16',
    'ource/config.js',
    'ource/data.json',
    'ource/data2.json',
    'ource/dom.js',
    'ource/dt_card.js',
    'ource/filter.js',
    'ource/hub.html',
    'ource/img',
    'ource/navres.html',
    'ource/news.js',
    'ource/news.json',
    'ource/remixicon.css',
    'ource/search.js',
    'ource/where.css',
    'ource/img/icon',
    'ource/img/logo.png',
    'ource/img/logo2.png',
    'ource/img/top_img',
    'ource/img/unhub_lookhere.png',
    'ource/img/icon/3.��Ϊ��-��.svg',
    'ource/img/icon/android.svg',
    'ource/img/icon/apache.svg',
    'ource/img/icon/audit.png',
    'ource/img/icon/bootstrap.svg',
    'ource/img/icon/box_maven.svg',
    'ource/img/icon/centos-copy.svg',
    'ource/img/icon/ceph.svg',
    'ource/img/icon/clickhouse.svg',
    'ource/img/icon/com-signal.svg',
    'ource/img/icon/court.svg',
    'ource/img/icon/cppcc.svg',
    'ource/img/icon/CSS.svg',
    'ource/img/icon/CSS3.svg',
    'ource/img/icon/Docker (1).svg',
    'ource/img/icon/docker.svg',
    'ource/img/icon/gimp_.svg',
    'ource/img/icon/HTML.svg',
    'ource/img/icon/HTML5.svg',
    'ource/img/icon/huawei.svg',
    'ource/img/icon/ic_alibaba.svg',
    'ource/img/icon/jenkins.svg',
    'ource/img/icon/kubernetes.svg',
    'ource/img/icon/logo-small-dark.png',
    'ource/img/icon/mariadb.svg',
    'ource/img/icon/mca.png',
    'ource/img/icon/miit.svg',
    'ource/img/icon/mkszywk.svg',
    'ource/img/icon/mofcom.png',
    'ource/img/icon/MongoDB.svg',
    'ource/img/icon/mps.svg',
    'ource/img/icon/mss.svg',
    'ource/img/icon/MySQL.svg',
    'ource/img/icon/nhc.png',
    'ource/img/icon/Node.js.svg',
    'ource/img/icon/npm.svg',
    'ource/img/icon/PostgreSQL.svg',
    'ource/img/icon/prc.svg',
    'ource/img/icon/pypi.svg',
    'ource/img/icon/pyspark.svg',
    'ource/img/icon/pytorch.svg',
    'ource/img/icon/qiye.svg',
    'ource/img/icon/Rust.svg',
    'ource/img/icon/scholaread.jpg',
    'ource/img/icon/soa.svg',
    'ource/img/icon/spp.svg',
    'ource/img/icon/tailwindcss.svg',
    'ource/img/icon/ubuntu.svg',
    'ource/img/icon/ustc.png',
    'ource/img/icon/Z.svg',
    'ource/img/icon/ǧ������.svg',
    'ource/img/icon/��������.svg',
    'ource/img/icon/����.svg',
    'ource/img/icon/������.svg',
    'ource/img/top_img/promo_cny25_services_appstore__eu0xo4xjws8y_large.jpg',
    'ource/img/top_img/wallhaven-76jx13.png',
    'ource/img/top_img/wallhaven-k9l7j1.png',
    'ource/img/top_img/wp5424185-wallpaper-mac-pro.jpg',
    'tatus/icon',
    'tatus/icon/������.svg',
    'iddlywiki/ext',
    'iddlywiki/tiddlywiki-xp.zip',
    'iddlywiki/tiddlywiki-xp_Full.html',
    'iddlywiki/tiddlywiki-xp_Minimal.html',
    'iddlywiki/����˹̹.webp',
    'iddlywiki/���Ͽ�UNhub (1).htm',
    'iddlywiki/���Ͽ�UNhub.htm',
    'iddlywiki/ext/audio',
    'iddlywiki/ext/doc',
    'iddlywiki/ext/img',
    'iddlywiki/ext/other',
    'iddlywiki/ext/prog',
    'iddlywiki/ext/video',
    'iddlywiki/ext/audio/.gitkeep',
    'iddlywiki/ext/doc/.gitkeep',
    'iddlywiki/ext/img/.gitkeep',
    'iddlywiki/ext/other/.gitkeep',
    'iddlywiki/ext/prog/.gitkeep',
    'iddlywiki/ext/video/.gitkeep',
    'ools/css',
    'ools/functions',
    'ools/js',
    'ools/navigation.html',
    'ools/css/navigation.css',
    'ools/functions/unit-converter.html',
    'ools/js/navigation.js',
    'ikipedia/ceshi.html',
    'ikipedia/data_pdf',
    'ikipedia/index.html',
    'ikipedia/JensenHuang.html',
    'ikipedia/Jensen_Jen-hsun_Huang.html',
    'ikipedia/ë��.html',
    'ikipedia/ά���ٿ���Ŀ.html',
    'ikipedia/data_pdf/�O��ɽ.pdf',
    'ikipedia/data_pdf/�ν���.pdf',
    'ikipedia/data_pdf/ë�� - ά���ٿƣ����ɵİٿ�ȫ�� (2025_3_2 14��02��17).html',
    'ikipedia/data_pdf/ë�� - ά���ٿƣ����ɵİٿ�ȫ��.md',
    'ikipedia/data_pdf/ë��.pdf',
    'ikipedia/data_pdf/ά���ٿ� - Google ����.md',
    'ikipedia/data_pdf/Ԭ����.pdf',
    'ip/001.html',
    'ip/002.html',
    'ip/003.html',
    'ip/004.html',
    'ip/about.CFtCtOY4.css',
    'ip/cssandjs',
    'ip/dist',
    'ip/Emil',
    'ip/iit.html',
    'ip/info',
    'ip/Loading',
    'ip/MiSans-woff2',
    'ip/OpenAI.html',
    'ip/teme',
    'ip/xyai.html',
    'ip/cssandjs/emmetts-website.webflow.57cbf4948.min.css',
    'ip/cssandjs/jgg5oxs.css',
    'ip/cssandjs/styles.css',
    'ip/dist/index.html',
    'ip/dist/script.js',
    'ip/dist/style.css',
    'ip/Emil/index.html',
    'ip/Emil/script.js',
    'ip/Emil/style.css',
    'ip/info/index.html',
    'ip/info/script.js',
    'ip/info/style.css',
    'ip/Loading/index.html',
    'ip/Loading/script.js',
    'ip/Loading/style.css',
    'ip/MiSans-woff2/MiSans-Bold.woff2',
    'ip/MiSans-woff2/MiSans-Demibold.woff2',
    'ip/MiSans-woff2/MiSans-ExtraLight.woff2',
    'ip/MiSans-woff2/MiSans-Heavy.woff2',
    'ip/MiSans-woff2/MiSans-Light.woff2',
    'ip/MiSans-woff2/MiSans-Medium.woff2',
    'ip/MiSans-woff2/MiSans-Normal.woff2',
    'ip/MiSans-woff2/MiSans-Regular.woff2',
    'ip/MiSans-woff2/MiSans-Semibold.woff2',
    'ip/MiSans-woff2/MiSans-Thin.woff2',
    'ip/teme/index.html',
    'ip/teme/script.js',
    'ip/teme/style.css',
    'yhmap/areaCoords.js',
    'yhmap/car.png',
    'yhmap/current.png',
    'yhmap/data.js',
    'yhmap/future.png',
    'yhmap/index.html',
    'yhmap/past.png',
    'yhmap/script.js',
    'yhmap/sgcc.png',
    'yhmap/style.css',
    'yhmap/travel.png',
    'yhmap/work.png',
    '����Ϣ����/app.js',
    '����Ϣ����/index.html',
    '����Ϣ����/styles.css'
];
    const statusCodes = [
        { code: 200, color: 'var(--primary)' },
        { code: 304, color: 'var(--primary)' },
        { code: 404, color: 'var(--alert)' },
        { code: 500, color: 'var(--critical)' }
    ];

    const geo = geoData[Math.floor(Math.random()*geoData.length)];
    const now = new Date();
    const timestamp = `${now.getHours().toString().padStart(2,'0')}:` +
                     `${now.getMinutes().toString().padStart(2,'0')}:` +
                     `${now.getSeconds().toString().padStart(2,'0')}.` +
                     `${now.getMilliseconds().toString().padStart(3,'0')}`;
    const status = statusCodes[Math.floor(Math.random()*statusCodes.length)];
    
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    logEntry.innerHTML = `
        <span style="color: var(--secondary)">[${timestamp}]</span>
        <div class="geo-info">
            <span>${geo.region}</span>
            <span class="ip-address">${generateIP(geo.ipRange)}</span>
        </div>
        <span>${methods[Math.floor(Math.random()*methods.length)]} ${endpoints[Math.floor(Math.random()*endpoints.length)]}</span>
        <span style="color: ${status.color}">${status.code}</span>
    `;

    const container = document.getElementById('logContainer');
    container.prepend(logEntry);
    if (container.children.length > 100) container.lastChild.remove();
}

// 系统指标
function updateSystemMetrics() {
    // CPU相关指标
    const cpuUsage = Math.min(100, Math.max(20, 30 + Math.random()*40));
    const cpuTemp = Math.random()*60 + 30;  // 30-90°C
    
    document.getElementById('cpuMetric').textContent = `${cpuUsage.toFixed(1)}%`;
    document.getElementById('cpuBar').style.width = `${cpuUsage}%`;
    document.getElementById('cpuTemp').textContent = `${cpuTemp.toFixed(1)}°C`;
    document.getElementById('cpuTempBar').style.width = `${(cpuTemp/100*100)}%`;

    // 内存指标
    const memUsage = Math.min(100, Math.max(25, 40 + Math.random()*30));
    document.getElementById('memMetric').textContent = `${memUsage.toFixed(1)}%`;
    document.getElementById('memBar').style.width = `${memUsage}%`;

    // GPU温度指标
    const gpuTemp = Math.random()*70 + 40;  // 40-110°C
    document.getElementById('gpuTemp').textContent = `${gpuTemp.toFixed(1)}°C`;
    document.getElementById('gpuTempBar').style.width = `${(gpuTemp/120*100)}%`;

    // 主板电压 (1.0V-1.5V)
    const voltage = 1.0 + Math.random()*0.5;
    document.getElementById('voltage').textContent = `${voltage.toFixed(3)}V`;
    document.getElementById('voltageBar').style.width = `${((voltage-1.0)/0.5*100)}%`;

    // 网络指标（关联数据）
    const bandwidth = (Math.random()*9 + 1).toFixed(1);  // 1-10Gbps
    const packetLoss = (Math.random()*2).toFixed(2);     // 0-2%
    const connections = Math.floor(Math.random()*5000 + 1000);  // 1000-6000
    
    document.getElementById('bandwidth').textContent = `${bandwidth} Gbps`;
    document.getElementById('bandwidthBar').style.width = `${(bandwidth/10*100)}%`;
    document.getElementById('packetLoss').textContent = `${packetLoss}%`;
    document.getElementById('packetLossBar').style.width = `${packetLoss/5*100}%`;
    document.getElementById('connections').textContent = 
        connections.toLocaleString();
    document.getElementById('connectionsBar').style.width = 
        `${(connections/5000*100)}%`;

    // 原有网络吞吐指标（保留）
    const netUsage = (Math.random()*900 + 100).toFixed(1);
    document.getElementById('netMetric').textContent = `${netUsage} Mbps`;
    document.getElementById('netBar').style.width = `${(netUsage/10)}%`;
}

// 初始化调用
updateSystemMetrics();
// 更新运行时间
// 安全事件数据（可动态修改）
const securityEvents = [
    { date: "2025-04", status: "normal", content: "未报告任何事件，运行正常。" },
    { date: "2025-03", status: "normal", content: "未报告任何事件，运行正常。" },
    { date: "2025-02", status: "normal", content: "未报告任何事件，运行正常。" },
    { date: "2025-01", status: "normal", content: "未报告任何事件，运行正常。" },
    { date: "2024-12", status: "critical", content: "检测到异常国家IP并发恶意访问，通过cloudflare安全策略防御访问。" },
    // 示例异常事件
    // { 
    //     date: "2025-03-30", 
    //     status: "critical", 
    //     content: "检测到异常登录尝试(来源: 192.168.1.100)"
    // },
];

// 生成安全事件列表
function renderSecurityTimeline() {
    const container = document.getElementById('securityTimeline');
    container.innerHTML = securityEvents.map(event => `
        <div class="event-item ${event.status === 'critical' ? 'critical' : ''}">
            <div class="event-header">
                <div class="event-date">${formatEventDate(event.date)}</div>
                <div class="event-status"></div>
            </div>
            <div class="event-content">${event.content}</div>
        </div>
    `).join('');

    // 添加点击事件
    document.querySelectorAll('.event-header').forEach(header => {
        header.addEventListener('click', () => {
            const parent = header.parentElement;
            parent.classList.toggle('active');
        });
    });
}

// 日期格式化
function formatEventDate(dateStr) {
    const date = new Date(dateStr);
    return `
        ${date.getFullYear()}年
        ${date.getMonth() + 1}月
    `.replace(/\s+/g, ' '); // 去除换行空格
}

// 初始化调用
renderSecurityTimeline();
// 主循环
setInterval(() => {
    drawMatrix();
    generateLogEntry();
    nodes.forEach(node => {
        node.cpu = Math.min(100, node.cpu + (Math.random() - 0.5)*3);
        node.mem = Math.min(100, node.mem + (Math.random() - 0.5)*2);
        node.status = node.cpu > 85 ? 3 : node.cpu > 70 ? 2 : 1;
    });
    renderNodes();
    updateSystemMetrics();
}, 120);

window.addEventListener('resize', resizeCanvas);
renderNodes();
