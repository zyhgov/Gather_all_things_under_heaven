const infoStates = {
  currentIndex: 0,        // 当前显示的信息索引
  displayData: {},         // 存储展示数据
  updateInterval: 2000,    // 信息轮播间隔(ms)
  privacyState: {          // 隐私网络状态
    isVPN: false,
    lastCheck: null,
    retryCount: 0
  },
  fields: [                // 显示字段配置
    { key: 'ip', label: 'IP地址' },
    { key: 'org', label: '运营商' },
    { key: 'city', label: '地理区域' },
    { key: 'loc', label: '坐标定位' },
    { key: 'country', label: '国家代码' },
    { key: 'timezone', label: '时区信息' },
    { key: 'postal', label: '邮政编码' },
    { key: 'asn', label: '网络编号' },
    { key: 'lat', label: '纬度' },
    { key: 'lon', label: '经度' }
  ],

  // 主初始化方法
  async init() {
    try {
      // 创建提示容器
      this.createAlertContainer();
      
      // 首次加载数据
      await this.loadInitialData();
      
      // 启动功能模块
      this.startRotation();
      this.startPrivacyMonitor();
    } catch (error) {
      this.showNetworkAlert('系统初始化失败');
      console.error('初始化错误:', error);
    }
  },

  // 数据加载流程
  async loadInitialData() {
    const data = await this.fetchDataWithRetry();
    if (!data) return;

    // 处理隐私数据
    this.processPrivacyData(data);
    
    // 更新显示数据
    this.updateDisplayData(data);
    
    // 更新国旗显示
    this.updateFlag(data.country);
  },

  // 带重试机制的数据获取
  async fetchDataWithRetry() {
    try {
      const response = await fetch('https://ipinfo.io/json?token=b2a740212238f8 ');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      this.handleDataError(error);
      return null;
    }
  },

  // 处理隐私数据
  processPrivacyData(data) {
    const prevVPNState = this.privacyState.isVPN;
    this.privacyState.isVPN = data?.privacy?.vpn || false;
    this.privacyState.lastCheck = new Date();

    // 状态变化处理
    if (this.privacyState.isVPN !== prevVPNState) {
      this.toggleVPNAlert(this.privacyState.isVPN);
      if (this.privacyState.isVPN) this.forceRefresh();
    }
  },

  // 更新显示数据
  updateDisplayData(data) {
    const locParts = (data.loc || '').split(',');
    const lat = locParts[0] || '未知';
    const lon = locParts[1] || '未知';

    this.displayData = {
      ip: data.ip,
      org: this.formatISP(data.org),
      city: `${data.city}${data.region ? `, ${data.region}` : ''}`,
      loc: data.loc || '未获取坐标',
      country: data.country,
      timezone: data.timezone || '未获取时区',
      postal: data.postal || '未获取邮编',
      asn: data.asn || '未获取编号',
      lat,
      lon
    };
  },

  // 更新国旗显示
  updateFlag(code) {
    const flagEl = document.getElementById('country-flag');
    if (!flagEl) return;

    const normalizedCode = (code || '').toLowerCase();
    flagEl.className = 'fi'; // 重置样式

    if (/^[a-z]{2}$/.test(normalizedCode)) {
      flagEl.classList.add(`fi-${normalizedCode}`);
      flagEl.dataset.country = normalizedCode;
    } else {
      flagEl.style.backgroundImage = 'none';
    }
  },

  // 格式化运营商信息
  formatISP(org) {
    return org ? org.replace(/^AS\d+\s/, '') : '未知运营商';
  },

  // 启动信息轮播
  startRotation() {
    this.rotateDisplay(); // 立即显示
    setInterval(() => this.rotateDisplay(), this.updateInterval);
  },

  // 轮播显示逻辑
  rotateDisplay() {
    const field = this.fields[this.currentIndex];
    const displayText = `${field.label}：${this.displayData[field.key]}`;
    const ipElement = document.getElementById('user-ip');

    // 淡出动画
    ipElement.style.opacity = '0';
    
    setTimeout(() => {
      ipElement.textContent = displayText;
      ipElement.style.opacity = '1';
      this.currentIndex = (this.currentIndex + 1) % this.fields.length;
    }, 300);
  },

  // 启动隐私监控
  startPrivacyMonitor() {
    setInterval(async () => {
      const newData = await this.fetchDataWithRetry();
      if (newData) {
        this.processPrivacyData(newData);
        this.updateDisplayData(newData);
        this.updateFlag(newData.country);
      }
    }, 60000); // 每分钟检测
  },

  // 强制刷新
  async forceRefresh() {
    console.log('触发强制刷新...');
    this.privacyState.retryCount = 0;
    await this.loadInitialData();
  },

  // 错误处理
  handleDataError(error) {
    console.error('数据获取错误:', error);
    if (this.privacyState.retryCount++ < 3) {
      setTimeout(() => this.loadInitialData(), 5000);
    }
    this.showNetworkAlert('网络连接异常，正在重试...');
  },

  // 创建提示容器
  createAlertContainer() {
    const container = document.createElement('div');
    container.id = 'alert-container';
    container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      max-width: 300px;
    `;
    
    container.innerHTML = `
      <div id="vpn-alert" class="alert-banner" style="display:none;"></div>
      <div id="network-alert" class="alert-banner" style="display:none;"></div>
    `;
    document.body.appendChild(container);
  },

  // 显示VPN提示
  toggleVPNAlert(show) {
    const alertEl = document.getElementById('vpn-alert');
    if (!alertEl) return;
    
    alertEl.style.display = show ? 'block' : 'none';
    alertEl.textContent = show ? 
      `⚠️ 检测到隐私网络连接（${new Date().toLocaleTimeString()}）` : '';
  },

  // 显示网络提示
  showNetworkAlert(message) {
    const alertEl = document.getElementById('network-alert');
    if (alertEl) {
      alertEl.style.display = 'block';
      alertEl.textContent = message;
      setTimeout(() => {
        alertEl.style.display = 'none';
      }, 3000);
    }
  }
};

// 动态添加样式
const style = document.createElement('style');
style.textContent = `
  .alert-banner {
    padding: 12px 20px;
    margin-bottom: 8px;
    background: #fff3cd;
    border: 1px solid #ffeeba;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    animation: slideIn 0.3s ease-out;
    font-size: 14px;
    color: #856404;
  }

  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  #country-flag {
    width: 28px;
    height: 21px;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 4px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.08);
    transition: transform 0.3s ease;
  }

  #country-flag:hover {
    transform: scale(1.05);
  }
`;
document.head.appendChild(style);

// 启动程序
document.addEventListener('DOMContentLoaded', () => infoStates.init());