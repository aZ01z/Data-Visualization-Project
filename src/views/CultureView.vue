<template>
    <div class="building-ritual">
        <!-- 顶部标题栏 -->
        <div class="title">
            <router-link to="/home">
                <button>首页</button>
            </router-link>
            <h1>建筑与礼制</h1>
        </div>

        <!-- 主内容区 -->
        <div class="main-content">
            <!-- 上半部分：左图文 + 漏斗图 + 右图文 -->
            <div class="upper-section">
                <!-- 左上：阶级说明（上文字下图片） -->
                <div class="card info-card left-info">
                    <div class="info-text on">
                        <h4>{{ activeClass }}</h4>
                        <p>{{ currentClassInfo.topDesc }}</p>
                    </div>
                    <div class="info-img under">
                        <img :src="currentClassInfo.topImg" alt="屋顶形制" />
                    </div>
                </div>

                <!-- 中间：阶级漏斗图 -->
                <div class="card chart-card funnel-card">
                    <div class="chart-scroll-wrapper">
                        <div ref="funnelChartRef" class="chart-container"></div>
                    </div>
                </div>

                <!-- 右上：阶级说明（上图片下文字） -->
                <div class="card info-card right-info">
                    <div class="info-img on">
                        <img :src="currentClassInfo.bottomImg" alt="建筑规制" />
                    </div>
                    <div class="info-text under">
                        <h4>{{ activeClass }}</h4>
                        <p>{{ currentClassInfo.bottomDesc }}</p>
                    </div>
                </div>
            </div>

            <!-- 下半部分：手风琴派系 + 竖标题 + 散点图 -->
            <div class="lower-section">
                <!-- 左下：建筑派系手风琴 -->
                <div class="card accordion-card">
                    <div class="accordion-group">
                        <div v-for="item in accordionList" :key="item.name" class="accordion-item"
                            :style="{ backgroundImage: `url(${item.img})` }">
                            <div class="accordion-overlay"></div>
                            <div class="accordion-header">{{ item.name }}</div>
                        </div>
                    </div>
                </div>

                <!-- 中间竖排标题 -->
                <div class="vertical-title">
                    <h2>各派别历史出现时期</h2>
                </div>

                <!-- 右下：派别时期散点图 -->
                <div class="card chart-card scatter-card">
                    <div class="chart-scroll-wrapper">
                        <div ref="scatterChartRef" class="chart-container"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import * as echarts from 'echarts'

// 获取图片完整路径（Vite 官方标准写法）
const getImage = (fileName) => {
    return new URL(`../image/${fileName}`, import.meta.url).href
}

// ===================== DOM 引用 =====================
const funnelChartRef = ref(null)
const scatterChartRef = ref(null)

// ===================== 响应式状态 =====================
const activeClass = ref('皇家')

// ===================== 全量数据 =====================
// 阶级规制数据
const classData = {
    '皇家': {
        topImg: getImage('庑殿顶.jpg'),
        topDesc: '庑殿顶为四面坡、五条脊的形制，由一道正脊与四道垂脊组合而成，也常被称作五脊顶、四阿顶。屋面朝四方缓缓下斜，形态端庄舒展，气度沉稳。推山工艺的运用，使正脊得以延展，垂脊线条更显劲挺，整体轮廓更显巍峨。单檐庑殿顶形制简洁，重檐则在下檐另加脊件，层次更为雄浑。作为古代屋顶形制中等级最高的一种，它多用于宫殿、皇家坛庙及地位尊崇的寺宇正殿，是至高等级与礼制威严的典型体现。',
        bottomImg: getImage('皇.jpg'),
        bottomDesc: '开间与进深是中国古建筑衡量等级与规模的核心标尺，开间指建筑正面横向的柱间数量，进深指纵向的柱间深度。皇家建筑以极致规制彰显皇权至高无上，如故宫太和殿采用面阔11间、进深9间的至尊形制，为古代建筑开间数的巅峰，严格遵循礼制规范，远超民间与官员宅邸的限制。宏大的开间与进深尺度，既营造出威严磅礴的空间气势，又以严格的数字等级强化皇权秩序，是皇家建筑礼序与威仪的核心体现。'
    },
    '王府/重臣': {
        topImg: getImage('歇山顶.jpg'),
        topDesc: '歇山顶上部结构与悬山顶形制相近，山面构件自檩条中心向内回缩一定距离，这一营造技法被称为“收山”。收山能合理缩减悬挑跨度，避免构件外伸过长，有效提升屋架整体的稳固性与受力合理性。歇山顶由一条正脊、四条垂脊与四条戗脊组成，整体造型层次丰富，刚柔相济，在古建屋顶等级中仅次于庑殿顶。它既具备庄重威严的气势，又不失精巧灵动的美感，广泛用于皇家宫殿的次要殿堂祠庙、城楼、府邸等重要建筑。',
        bottomImg: getImage('王.jpg'),
        bottomDesc: '王府与重臣宅邸的规制严格遵循封建礼制，以清代为例，亲王府正殿最高为面阔 7 间，郡王府、贝勒府依次递减，正门、厢房等建筑的开间数也有明确等级划分；唐代《营缮令》规定，五品以上重臣正堂面阔不得超 5 间、进深不超 9 架，品级越低，开间进深的限制越严苛。这类建筑的尺度远低于皇家 11 间的至尊规格，以严谨的数字等级划分阶层，既体现贵族与官员的尊崇，又以礼制强化皇权至上的秩序。'
    },
    '官员/文庙': {
        topImg: getImage('悬山顶.jpg'),
        topDesc: '悬山顶为双坡五脊结构，屋檐向外伸出山墙之外。此屋顶的精髓，集中体现在山面悬挑的精巧构造之上。宋代《营造法式》中对山墙出挑长度有着明确规范，依据屋椽数量制定对应尺寸，体现出严谨的营造法度。看似自由延伸的挑檐，实则是木构受力的精准设计，依靠内部梁架传递荷载，保证结构稳定。外侧又以专用构件防风遮雨，合理疏导水流。这种悬挑而不失稳固的营造技艺，也蕴藏着居安思危、刚柔相济的传统哲学思想。',
        bottomImg: getImage('官.jpg'),
        bottomDesc: '官员宅邸受《营缮令》等制度严格约束：唐代规定三品以上官员正堂面阔不得超过 5 间，五品以下不得超过 3 间，进深、高度也随品级递减，严禁僭越；明清时期，一品至九品官员的厅堂开间、屋顶形制、装饰色彩均有明确等级，绝不可逾制。文庙作为祭祀孔子的礼制建筑，其规制仅次于皇家，通常主殿采用面阔 7 间、进深 5 间的高规格形制，既体现对圣人的尊崇，又恪守 “不僭皇权” 的礼制底线，是古代社会 “礼序尊卑” 在建筑上的直观体现。'
    },
    '百姓': {
        topImg: getImage('硬山顶.jpg'),
        topDesc: '硬山顶整体风格简洁稳重、实用内敛，是典型的民居型屋顶样式。屋面为双坡形式，山墙与屋面齐平，屋檐不向外挑出，山墙直接承托檩条，防火与防风性能突出。造型平直规整，线条简朴无多余装饰，结构坚固易施工，等级低于悬山与歇山。多用在北方四合院、普通民居及祠堂、衙署配房，风格端庄务实，兼具地域适应性与浓厚生活气息，也常搭配简洁砖雕增强装饰性。山墙多做墀头、盘头等雕饰，既加固墙体又添吉祥寓意，整体质朴大气。',
        bottomImg: getImage('百.jpg'),
        bottomDesc: '历代《营缮令》均明确规定，普通民宅正堂开间不得超过 3 间，进深、高度、屋顶形制、装饰色彩等均有严苛限制，严禁使用高等级开间、斗拱、彩画等皇家与官员专属形制，违者以僭越论处。百姓民居以3开间为核心形制，搭配紧凑的进深尺度，既适配日常居住需求，又严格恪守礼制底线，形成了朴素实用、因地制宜的民居风格，是古代 “尊卑有序、贵贱有别” 礼制思想在民间建筑上的直观体现。'
    }
}

// 当前选中阶级的详情
const currentClassInfo = computed(() => classData[activeClass.value])

// 手风琴派系列表
const accordionList = [
    { name: '徽派', img: getImage('徽.jpg') },
    { name: '京派', img: getImage('京.jpg') },
    { name: '川派', img: getImage('川.jpg') },
    { name: '晋派', img: getImage('晋.jpg') },
    { name: '海派', img: getImage('海.jpg') },
    { name: '苏派', img: getImage('苏.jpg') },
    { name: '闽派', img: getImage('闽.jpg') },
    { name: '粤派', img: getImage('粤.jpg') }
]

// 散点图基础数据
const scatterDemo = [
    { z: "京派", x: 5, y: 7, q: 2300 },
    { z: "徽派", x: 4, y: 6, q: 1600 },
    { z: "粤派", x: 7, y: 5, q: 1800 },
    { z: "苏派", x: 1, y: 4, q: 2100 },
    { z: "川派", x: 0, y: 3, q: 1500 },
    { z: "闽派", x: 5, y: 2, q: 1500 },
    { z: "晋派", x: 3, y: 1, q: 1800 },
    { z: "海派", x: 7, y: 0, q: 2000 }
]
const xAxisData = ['秦', '汉', '隋', '唐', '宋', '元', '明', '清']
const yAxisData = ['海派', '晋派', '闽派', '川派', '苏派', '粤派', '徽派', '京派']

// ===================== 图表实例 =====================
let funnelChart = null
let scatterChart = null

// ===================== 漏斗图初始化 =====================
function initFunnelChart() {
    if (!funnelChartRef.value) return
    if (funnelChart) funnelChart.dispose()
    funnelChart = echarts.init(funnelChartRef.value)

    const option = {
        color: ['#efbb1a', '#d77169', '#c14f60', '#953f61', '#72355f'],
        series: [{
            name: '漏斗图',
            type: 'funnel',
            x: '0%',
            y: 35,
            y2: 35,
            width: '100%',
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'ascending',
            gap: 0,
            data: [
                { value: 20, name: '皇家' },
                { value: 40, name: '王府/重臣' },
                { value: 60, name: '官员/文庙' },
                { value: 80, name: '百姓' }
            ].sort((a, b) => a.value - b.value),
            roseType: true,
            label: {
                normal: {
                    formatter: params => params.name,
                    position: 'center'
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 0,
                    shadowBlur: 30,
                    shadowOffsetX: 0,
                    shadowOffsetY: 10,
                    shadowColor: 'rgba(0,0,0,0.5)'
                }
            }
        }]
    }

    funnelChart.setOption(option)

    // 点击切换阶级
    funnelChart.on('click', params => {
        activeClass.value = params.name
    })
}

// ===================== 散点图初始化 =====================
function initScatterChart() {
    if (!scatterChartRef.value) return
    if (scatterChart) scatterChart.dispose()
    scatterChart = echarts.init(scatterChartRef.value)

    // 辅助函数：图例
    function getLegend() {
        return [...new Set(scatterDemo.map(item => item.z))]
    }

    // 辅助函数：坐标轴样式
    function getAxisLine() {
        return { show: false, lineStyle: { color: '#3398DB', width: 2 } }
    }

    // 辅助函数：T型图标
    function getSvgIcon() {
        return "path://M851.968 167.936l0 109.568-281.6 0 0 587.776-116.736 0 0-587.776-281.6 0 0-109.568 679.936 0z"
    }

    // 辅助函数：色系
    function getColorSys() {
        return ['#0ab484', '#1355c7', '#F5A559', '#D62E56', '#9370DB', '#FF6347', '#32CD32', '#FFD700']
    }

    // 辅助函数：渐变色
    function getColors() {
        return [
            new echarts.graphic.LinearGradient(0.4, 0.3, 0, 1, [
                { offset: 0, color: '#8ffdde' }, { offset: 1, color: '#0ab484' }
            ]),
            new echarts.graphic.LinearGradient(0.4, 0.3, 0, 1, [
                { offset: 0, color: '#5790f4' }, { offset: 1, color: '#1355c7' }
            ]),
            new echarts.graphic.LinearGradient(0.4, 0.3, 0, 1, [
                { offset: 0, color: '#f6973d' }, { offset: 1, color: '#F5A559' }
            ]),
            new echarts.graphic.LinearGradient(0.4, 0.3, 0, 1, [
                { offset: 0, color: '#e40036' }, { offset: 1, color: '#D62E56' }
            ]),
            new echarts.graphic.LinearGradient(0.4, 0.3, 0, 1, [
                { offset: 0, color: '#b19cd9' }, { offset: 1, color: '#9370DB' }
            ]),
            new echarts.graphic.LinearGradient(0.4, 0.3, 0, 1, [
                { offset: 0, color: '#ff7f50' }, { offset: 1, color: '#FF6347' }
            ]),
            new echarts.graphic.LinearGradient(0.4, 0.3, 0, 1, [
                { offset: 0, color: '#90ee90' }, { offset: 1, color: '#32CD32' }
            ]),
            new echarts.graphic.LinearGradient(0.4, 0.3, 0, 1, [
                { offset: 0, color: '#fffacd' }, { offset: 1, color: '#FFD700' }
            ])
        ]
    }

    // 辅助函数：生成系列数据
    function getSeriesData() {
        const colorsArr = getColors()
        const colorSys = getColorSys()
        const dataKinds = getLegend()
        const obj = {}
        scatterDemo.forEach(item => {
            !obj[item.z] ? obj[item.z] = [item] : obj[item.z].push(item)
        })

        const result = []
        dataKinds.forEach(name => {
            result.push(obj[name].map(item => [item.x, item.y, item.q]))
        })

        // T型标线数据
        const lineData = []
        xAxisData.forEach((_, idx) => {
            lineData.push([idx, yAxisData.length])
        })
        result.push(lineData)

        const seriesArr = []
        result.forEach((item, ind) => {
            if (ind === result.length - 1) {
                // T型标线
                seriesArr.push({
                    name: '固定T', type: 'scatter', yAxisIndex: 1,
                    symbol: getSvgIcon(), symbolSize: 14,
                    itemStyle: { normal: { color: "#63bef8" } },
                    symbolOffset: [0, '40%'], data: item
                })
            } else {
                // 派系散点
                seriesArr.push({
                    name: dataKinds[ind], type: 'scatter',
                    symbolSize: data => data[2] / 50,
                    itemStyle: {
                        normal: {
                            shadowBlur: 20,
                            shadowColor: colorSys[ind],
                            opacity: 0.8,
                            shadowOffsetY: 4,
                            color: colorsArr[ind]
                        }
                    },
                    data: item
                })
            }
        })
        return seriesArr
    }

    const option = {
        legend: {
            top: 8,
            left: 'center',
            show: true,
            itemWidth: 12,
            itemHeight: 12,
            data: getLegend(),
            textStyle: {
                color: '#fff',
                fontSize: 12,
                padding: [0, 10, 0, 5]
            }
        },
        grid: {
            right: '8%',
            left: '12%',
            bottom: '15%',
            top: '14%'
        },
        xAxis: [{
            type: 'category',
            data: xAxisData,
            axisTick: { show: false, alignWithLabel: true },
            axisLabel: { color: 'rgba(255,255,255,0.9)', fontSize: 14, margin: 15 },
            splitLine: { show: true, lineStyle: { color: 'rgba(255, 255, 255, 0.15)' } },
            axisLine: getAxisLine()
        }],
        yAxis: [
            {
                type: 'category',
                position: 'left',
                data: yAxisData,
                axisLabel: { color: 'rgba(255,255,255,0.9)', fontSize: 14, margin: 15 },
                splitLine: { show: true, lineStyle: { color: 'rgba(255, 255, 255, 0.12)' } },
                axisTick: { lineStyle: { color: '#63bef8', width: 1 } },
                axisLine: getAxisLine()
            },
            {
                type: 'category',
                position: "right",
                data: yAxisData,
                axisLabel: { show: false },
                splitLine: { show: false },
                axisTick: { lineStyle: { color: '#63bef8', width: 1 } },
                axisLine: getAxisLine()
            }
        ],
        series: getSeriesData()
    }

    scatterChart.setOption(option)
}

// ===================== 公共方法 =====================
function handleResize() {
    funnelChart && funnelChart.resize()
    scatterChart && scatterChart.resize()
}

// ===================== 生命周期 =====================
onMounted(() => {
    nextTick(() => {
        initFunnelChart()
        initScatterChart()
    })
    window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
    funnelChart && funnelChart.dispose()
    scatterChart && scatterChart.dispose()
})
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    list-style: none;
    box-sizing: border-box;
}

.building-ritual {
    width: 100%;
    min-height: 100vh;
    background-color: #051b4a;
    overflow-x: hidden;
}

/* 顶部标题栏 */
.title {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    padding: 0 10px;
    border: solid 1px rgba(21, 90, 174, 0.63);
}

h1 {
    color: aliceblue;
    font-size: 33px;
    margin: 0;
}

/* 首页按钮固定在左侧，脱离文档流，不挤占标题空间 */
.title button {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    border: solid 0.0125rem rgba(128, 168, 215, 0.863);
    height: 40px;
    width: 80px;
    background: transparent;
    border-radius: 5px;
    color: #b9c7d1;
    font-size: 16px;
    cursor: pointer;
    margin: 0;
}

/* 主内容区 */
.main-content {
    padding: 6px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

/* 通用卡片样式 */
.card {
    border: solid 1px rgba(21, 90, 174, 0.63);
    background-color: transparent;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

/* ========== 上半部分三列布局 ========== */
.upper-section {
    display: flex;
    gap: 6px;
    height: 460px;
    width: 100%;
}

.info-card {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 4px;
}

.info-text {
    padding: 8px;
    border: solid 1px rgba(166, 230, 232, 0.644);
    overflow-y: auto;
}

.info-text h4 {
    color: #fff;
    margin-bottom: 6px;
    font-size: 16px;
}

.info-text p {
    color: #eee;
    line-height: 1.6;
    font-size: 14px;
}

.info-img {
    flex: 1;
    overflow: hidden;
    border: solid 1px rgba(166, 230, 232, 0.644);
}

.info-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* 漏斗图卡片 */
.funnel-card {
    flex: 1.2;
}

/* 图表滚动容器 */
.chart-scroll-wrapper {
    flex: 1;
    width: 100%;
    overflow: hidden;
    min-height: 0;
}

.chart-container {
    min-height: 280px;
    width: 100%;
    height: 100%;
}

/* ========== 下半部分布局 ========== */
.lower-section {
    display: flex;
    gap: 6px;
    height: 290px;
    width: 100%;
    align-items: stretch;
}

/* 手风琴卡片 */
.accordion-card {
    flex: 2;
}

.accordion-group {
    display: flex;
    width: 100%;
    height: 100%;
    gap: 6px;
    padding: 4px;
    /* 新增：强制子项高度统一拉伸 */
    align-items: stretch;
}

.accordion-item {
    flex: 1;
    height: auto;
    /* 防止子项被意外压缩 */
    flex-shrink: 0;
    border-radius: 6px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    background-size: cover;
    background-position: center;
    border: 1px solid #2a4580;
}

/* 默认最后一项展开 */
.accordion-item:last-child {
    flex: 5;
}

/* hover 交互 */
.accordion-group:hover .accordion-item {
    flex: 1;
}

.accordion-group:hover .accordion-item:hover {
    flex: 5;
    border-color: #5599ff;
}

.accordion-overlay {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 8, 28, 0.445);
    z-index: 1;
}

.accordion-header {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    padding: 0 8px;
    text-align: center;
}

/* 竖排标题 */
.vertical-title {
    width: 36px;
    flex-shrink: 0;
    border: solid 1px rgba(21, 90, 174, 0.63);
    display: flex;
    align-items: center;
    justify-content: center;
}

.vertical-title h2 {
    color: aliceblue;
    font-size: 20px;
    writing-mode: vertical-rl;
    letter-spacing: 4px;
    font-weight: normal;
}

/* 散点图卡片 */
.scatter-card {
    flex: 1.5;
}

/* ========== 响应式适配 ========== */
@media (max-width: 1100px) {
    .upper-section {
        flex-wrap: wrap;
        height: auto;
    }

    .info-card {
        flex: 1 1 45%;
        height: 300px;
    }

    .funnel-card {
        flex: 1 1 100%;
        height: 400px;
    }
}

@media (max-width: 900px) {

    .upper-section,
    .lower-section {
        flex-direction: column;
        height: auto;
    }

    .info-card {
        height: 320px;
    }

    .funnel-card {
        height: 450px;
    }

    .accordion-card {
        height: 300px;
    }

    .vertical-title {
        width: 100%;
        height: 40px;
    }

    .vertical-title h2 {
        writing-mode: horizontal-tb;
        letter-spacing: 2px;
    }

    .scatter-card {
        height: 400px;
    }

    h1 {
        font-size: 24px;
    }

    .accordion-header {
        writing-mode: horizontal-tb;
    }
}

/* 滚动条美化 */
.chart-scroll-wrapper::-webkit-scrollbar,
.info-text::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

.chart-scroll-wrapper::-webkit-scrollbar-thumb,
.info-text::-webkit-scrollbar-thumb {
    background: rgba(128, 168, 215, 0.5);
    border-radius: 3px;
}

.chart-scroll-wrapper::-webkit-scrollbar-track,
.info-text::-webkit-scrollbar-track {
    background: rgba(21, 90, 174, 0.2);
}
</style>