<template>
  <div class="container">
    <div id="stars"></div>
    <div class="title">
      <router-link to="/home" class="home-link">
        <button>
          首页
        </button>
      </router-link>
      <h1>古建保护及展望</h1>
    </div>

    <div id="stars2"></div>

    <div class="contain">
      <!-- Tab栏 响应式激活 -->
      <div class="tabs">
        <div class="tab" :class="{ active: activeTab === 'now' }" data-type="now" @click="switchTab('now')">
          现状
        </div>
        <div class="tab" :class="{ active: activeTab === 'future' }" data-type="future" @click="switchTab('future')">
          未来
        </div>
        <div class="tab" :class="{ active: activeTab === 'ai' }" data-type="ai" @click="switchTab('ai')">
          AI答疑
        </div>
      </div>

      <!-- ECharts容器ref -->
      <div ref="chartRef" class="list1" v-show="activeTab !== 'ai'"></div>

      <!-- AI聊天面板 -->
      <div class="list2" v-show="activeTab === 'ai'">
        <div class="chat-container">
          <h2>古建新说智能助手</h2>
          <div ref="chatMsgRef" class="chat-messages">
            <!-- 响应式渲染聊天消息 -->
            <div v-for="(item, idx) in msgList" :key="idx" class="message"
              :class="{ 'user-message': item.isUser, 'ai-message': !item.isUser }">
              <div class="message-bubble">{{ item.text }}</div>
            </div>
          </div>
          <div class="chatInput">
            <input ref="inputRef" type="text" id="userInput" placeholder="请输入古建筑相关问题..." v-model="inputText"
              @input="autoHeight" @keydown.prevent.enter="handleSend" @keydown.shift.enter="$event.stopPropagation()" />
            <button class="send-btn" :disabled="loading" @click="handleSend">
              发送
            </button>
          </div>
        </div>
      </div>
    </div>
    <div id="stars3"></div>
  </div>
</template>

<script setup>
import '@/assets/base.css'
import { ref, onMounted, onUnmounted, watch } from 'vue'
// 标准引入echarts
import * as echarts from 'echarts'

// ========== DOM Ref 统一管理 ==========
const chartRef = ref(null)
const starsRef = ref(null)
const stars2Ref = ref(null)
const stars3Ref = ref(null)
const chatMsgRef = ref(null)
const inputRef = ref(null)

// 页面状态
const activeTab = ref('now') // 默认现状面板
let myChart = null
const resizeHandler = ref(null) // 窗口缩放监听

// 聊天相关响应式变量
const inputText = ref('')
const loading = ref(false)
// 聊天消息数组（响应式渲染，替代原生DOM操作）
const msgList = ref([
  {
    text: '你好！我是基于豆包大模型的AI助手，有问题欢迎随时提问~',
    isUser: false
  }
])

// ========== ECharts 渲染函数 ==========
// 现状图表
function renderNowChart() {
  if (myChart) myChart.dispose()
  myChart = echarts.init(chartRef.value)

  const dataAll = [638333, 638333, 638333, 638333, 633299, 589966, 561400, 533230, 499517, 544064]
  let yAxisData = ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016']
  yAxisData = yAxisData.reverse()
  const dataReverse = dataAll.reverse()

  const option = {
    backgroundColor: '#0f375f00',
    title: [
      { text: '不可移动文物各类占比', x: '2%', y: '1%', textStyle: { color: '#fff', fontSize: '14' } },
      { text: '近10年国家文物保护资金投入(万元)', x: '40%', y: '1%', textStyle: { color: '#fff', fontSize: '14' } },
      { text: '单位等级占比', x: '2%', y: '50%', textStyle: { color: '#fff', fontSize: '14' } }
    ],
    grid: [{ x: '50%', y: '7%', width: '45%', height: '90%' }],
    tooltip: { formatter: '{b} ({d}%)' },
    xAxis: [{ gridIndex: 0, axisTick: { show: false }, axisLabel: { show: false }, splitLine: { show: false }, axisLine: { show: false } }],
    yAxis: [{
      gridIndex: 0, interval: 0, data: yAxisData,
      axisTick: { show: false }, axisLabel: { show: true }, splitLine: { show: false },
      axisLine: { show: true, lineStyle: { color: '#6173a3' } }
    }],
    series: [
      {
        name: '不可移动文物各类占比',
        type: 'pie',
        radius: '35%',
        center: ['22%', '25%'],
        color: ['#e0f4ff', '#b3e0ff', '#86c9f4', '#4da8ec', '#3a91d2', '#005fa6'],
        data: [
          { value: 193282, name: '古遗址' },
          { value: 139458, name: '古墓葬' },
          { value: 263885, name: '古建筑' },
          { value: 24422, name: '石窟寺及石刻' },
          { value: 141449, name: '近现代重要史迹和代表性建筑' },
          { value: 4226, name: '其他' }
        ],
        labelLine: { show: true },
        itemStyle: { label: { show: true, formatter: '{b} \n ({d}%)', textStyle: { color: '#B1B9D3' } } }
      },
      {
        name: '单位等级占比',
        type: 'pie',
        radius: '35%',
        center: ['22%', '75%'],
        color: ['#e0f4ff', '#b3e0ff', '#86c9f4', '#4da8ec', '#3a91d2', '#005fa6'],
        labelLine: { show: true },
        data: [
          { value: 0.5, name: '国保' },
          { value: 2.3, name: '省保' },
          { value: 3.7, name: '市保' },
          { value: 13.5, name: '县保' },
          { value: 80, name: '未定级' }
        ],
        itemStyle: { label: { show: true, formatter: '{b} \n ({d}%)', textStyle: { color: '#B1B9D3' } } }
      },
      {
        name: '近10年国家文物保护资金投入(万元)',
        type: 'bar',
        xAxisIndex: 0,
        yAxisIndex: 0,
        barWidth: '45%',
        itemStyle: { color: '#86c9f4' },
        label: { show: true, position: 'right', textStyle: { color: '#9EA7C4' } },
        data: dataReverse,
        tooltip: { formatter: '{b}: {c} 万元' }
      }
    ]
  }
  myChart.setOption(option)
}

// 未来预测图表
function renderFutureChart() {
  if (myChart) myChart.dispose()
  myChart = echarts.init(chartRef.value)

  const category = ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035']
  const barData = [544064, 499517, 533230, 561400, 589966, 633299, 638333, 638333, 638333, 638333, 638333, 638333, 638333, 638333, 638333, 638333, 638333, 638333, 638333, 638333]
  const lineData = [544064, 499517, 533230, 561400, 589966, 633299, 638333, 638333, 638333, 638333, 654210.45, 662149.18, 670087.91, 678026.64, 685965.36, 693904.09, 701842.82, 709781.55, 717720.27, 725659.00]
  const lineChartData = [544064, 499517, 533230, 561400, 589966, 633299, 638333, 638333, 638333, 638333, 678806.90, 694684.36, 710561.82, 726439.29, 742316.75, 758194.21, 774071.68, 789949.14, 805826.61, 821704.07]

  const option = {
    title: {
      text: '未来10年预算投入预测(万元)', x: 50, y: 15,
      textStyle: { color: '#B4B4B4', fontSize: 16, fontWeight: 'normal' }
    },
    tooltip: {
      textStyle: { color: '#fff' },
      trigger: 'axis', backgroundColor: 'rgba(255,255,255,0.1)',
      axisPointer: { type: 'shadow', label: { show: true, backgroundColor: '#7B7DDC' } }
    },
    legend: {
      data: ['Theta Method', 'Holt 线性趋势模型', 'ARIMA(p,d,0)'],
      textStyle: { color: '#B4B4B4' }, top: '7%'
    },
    grid: { x: '12%', width: '82%', y: '12%' },
    xAxis: {
      data: category,
      axisLine: { lineStyle: { color: '#B4B4B4' } },
      axisTick: { show: false }
    },
    yAxis: {
      splitLine: { show: false },
      axisLine: { lineStyle: { color: '#B4B4B4' } },
      axisLabel: { formatter: '{value} ' }
    },
    series: [
      {
        name: 'Holt 线性趋势模型',
        type: 'line',
        smooth: true,
        showAllSymbol: true,
        symbol: 'emptyCircle',
        symbolSize: 10,
        yAxisIndex: 0,
        itemStyle: { color: '#F02FC2' },
        data: lineChartData
      },
      {
        name: 'ARIMA(p,d,0)',
        type: 'bar',
        barWidth: 12,
        itemStyle: {
          barBorderRadius: 5,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#956FD4' },
            { offset: 1, color: '#3EACE5' }
          ])
        },
        data: barData
      },
      {
        name: 'Theta Method',
        type: 'bar',
        barGap: '-100%',
        barWidth: 12,
        z: -12,
        itemStyle: {
          barBorderRadius: 5,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(156,107,211,0.5)' },
            { offset: 0.2, color: 'rgba(156,107,211,0.3)' },
            { offset: 1, color: 'rgba(156,107,211,0)' }
          ])
        },
        data: lineData
      }
    ]
  }
  myChart.setOption(option)
}

// Tab切换逻辑
function switchTab(type) {
  activeTab.value = type
}

// 监听tab切换，自动渲染图表
watch(activeTab, (newVal) => {
  if (newVal === 'now') renderNowChart()
  if (newVal === 'future') renderFutureChart()
})

// 输入框自动高度
function autoHeight() {
  inputRef.value.style.height = 'auto'
  inputRef.value.style.height = inputRef.value.scrollHeight + 'px'
}

// 发送消息
async function handleSend() {
  const q = inputText.value.trim()
  if (!q || loading.value) return
  // 添加用户消息
  msgList.value.push({ text: q, isUser: true })
  inputText.value = ''
  autoHeight()
  loading.value = true
  // 加载提示
  msgList.value.push({ text: '思考中...', isUser: false })
  // 滚动到底部
  setTimeout(() => {
    chatMsgRef.value.scrollTop = chatMsgRef.value.scrollHeight
  }, 0)

  // API配置
  const DOUBAO_API_KEY = ''
  const MODEL_NAME = ''
  const API_URL = ''

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${DOUBAO_API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [
          { role: 'system', content: '你是古建筑保护领域专业助手，回答简洁专业，围绕古建保护、修复、历史、政策作答' },
          { role: 'user', content: q }
        ]
      })
    })
    const data = await res.json()
    // 删除加载提示
    msgList.value.pop()
    if (data.choices?.[0]?.message?.content) {
      msgList.value.push({ text: data.choices[0].message.content, isUser: false })
    } else {
      msgList.value.push({ text: '抱歉，API返回异常，无法获取回复', isUser: false })
    }
  } catch (err) {
    msgList.value.pop()
    msgList.value.push({ text: '网络异常/API权限错误，默认回复：古建筑保护遵循修旧如旧原则，保护历史风貌。', isUser: false })
    console.error(err)
  } finally {
    loading.value = false
    setTimeout(() => {
      chatMsgRef.value.scrollTop = chatMsgRef.value.scrollHeight
    }, 0)
  }
}

// 页面挂载完成
onMounted(() => {
  // 初始化图表
  renderNowChart()
  // 窗口缩放监听
  resizeHandler.value = () => {
    if (myChart) myChart.resize()
  }
  window.addEventListener('resize', resizeHandler.value)
})

// 页面销毁：释放资源，防止内存泄漏
onUnmounted(() => {
  // 销毁echarts实例
  if (myChart) myChart.dispose()
  // 移除缩放监听
  if (resizeHandler.value) {
    window.removeEventListener('resize', resizeHandler.value)
  }
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
}

.container {
  width: 100%;
  min-height: 100vh;
  padding: clamp(10px, 2vh, 20px);
  display: flex;
  flex-direction: column;
  gap: clamp(8px, 1.5vh, 16px);
  overflow: hidden;
}

.title {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: auto;
  min-height: 50px;
  padding: 10px 20px;
  border: solid 1px rgba(21, 90, 174, 0.63);
}

.title button {
  border-style: none;
  border: solid 0.0125rem rgba(128, 168, 215, 0.863);
  height: 40px;
  width: 80px;
  background-color: transparent;
  border-radius: 5px;
  color: #b9c7d1;
  font-size: 16px;
  margin-left: 5px;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.title button:hover {
  background: rgba(134, 201, 244, 0.2);
  color: #fff;
}

h1 {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: aliceblue;
  font-size: clamp(20px, 2.5vw, 33px);
  font-weight: normal;
  white-space: nowrap;
}

.contain {
  flex: 1;
  width: 100%;
  min-height: clamp(500px, 80vh, 762px);
  border: solid 1px rgba(21, 90, 174, 0.63);
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  gap: clamp(10px, 1.5vw, 20px);
  padding: clamp(10px, 1.5vw, 20px);
}

/* ========== 竖向Tab栏 ========== */
.tabs {
  width: clamp(80px, 8vw, 120px);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: clamp(15px, 3vh, 30px);
  padding-top: clamp(10px, 2vh, 20px);
  z-index: 1;
}

.tab {
  font-family: "FangSong", "仿宋", "STFangsong", serif;
  border: solid 1px rgba(21, 90, 174, 0.63);
  width: 100%;
  height: clamp(40px, 6vh, 50px);
  line-height: clamp(40px, 6vh, 50px);
  text-align: center;
  font-size: clamp(16px, 1.8vw, 26px);
  color: #fff;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 0 15px rgba(234, 191, 236, 0.3), inset 0 0 5px rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

/* 选中状态 */
.tab.active {
  cursor: pointer;
  background: #34719ca9;
  transform: scale(1.02);
  box-shadow: 0 0 20px rgba(134, 201, 244, 0.5);
}

/* ========== 图表面板 ========== */
.list1 {
  flex: 1;
  position: relative;
  z-index: 1;
  min-width: 0;
  height: auto;
  min-height: clamp(450px, 75vh, 720px);
  padding-top: 10px;
  border: solid 1px rgba(21, 90, 174, 0.63);
  border-radius: 4px;
}


/* ========== AI聊天面板 ========== */
.list2 {
  flex: 1;
  position: relative;
  z-index: 1;
  min-width: 0;
  height: auto;
  min-height: clamp(450px, 75vh, 720px);
  color: #fff;
  padding: 20px;
  border: solid 1px rgba(21, 90, 174, 0.63);
  border-radius: 4px;
}


.chat-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.chat-container h2 {
  font-size: clamp(18px, 2vw, 24px);
  color: #e0f4ff;
  margin-bottom: 10px;
  font-weight: normal;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  margin: 15px 0;
  padding-right: 10px;
  min-height: 200px;
}

.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: #86c9f4;
  border-radius: 3px;
}

.message {
  margin-bottom: 15px;
  max-width: 80%;
  display: flex;
}

.user-message {
  justify-content: flex-end;
  margin-left: auto;
}

.ai-message {
  justify-content: flex-start;
}

.message-bubble {
  padding: 12px 16px;
  border-radius: 12px;
  line-height: 1.5;
  font-size: clamp(13px, 1.2vw, 15px);
  word-break: break-word;
}

.user-message .message-bubble {
  background: #86c9f4;
  color: #051b4a;
  border-bottom-right-radius: 4px;
}

.ai-message .message-bubble {
  background: rgba(134, 201, 244, 0.2);
  color: #fff;
  border-bottom-left-radius: 4px;
}

/* 输入框容器 */
.chatInput {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  width: 100%;
}

#userInput {
  flex: 1;
  min-width: 150px;
  min-height: 20px;
  max-height: 80px;
  padding: 12px 16px;
  border: 1px solid rgba(134, 201, 244, 0.5);
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  font-size: clamp(13px, 1.2vw, 15px);
  line-height: 1.5;
  outline: none;
  resize: none;
  overflow-y: auto;
}

#userInput::placeholder {
  color: #9EA7C4;
}

.send-btn {
  flex-shrink: 0;
  height: 45px;
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  background: #86c9f4;
  color: #051b4a;
  cursor: pointer;
  white-space: nowrap;
  font-size: clamp(13px, 1.2vw, 15px);
  transition: all 0.3s ease;
}

.send-btn:disabled {
  background: #6173a3;
  cursor: not-allowed;
}

.send-btn:not(:disabled):hover {
  background: #a6d8f7;
}

/* 平板 */
@media (max-width:1200px) {
  .tabs {
    width: 90px;
  }

  .tab {
    font-size: 18px;
  }

  .message {
    max-width: 90%;
  }
}

/* 移动端 */
@media(max-width:768px) {
  .contain {
    flex-direction: column;
    padding: 12px;
    gap: 12px;
  }

  /* Tab改为横向顶部排列 */
  .tabs {
    width: 100%;
    flex-direction: row;
    padding-top: 0;
    gap: 8px;
  }

  .tab {
    flex: 1;
    height: 44px;
    line-height: 44px;
    font-size: 16px;
  }

  .list1,
  .list2 {
    min-height: 500px;
  }

  .title h1 {
    font-size: 18px;
  }

  .title button {
    height: 36px;
    width: auto;
    padding: 0 14px;
    font-size: 14px;
  }

  .message {
    max-width: 95%;
  }

  .send-btn {
    padding: 0 16px;
  }
}
</style>
