<template>
    <div class="building-detail">
        <!-- 顶部标题栏 -->
        <div class="title">
            <router-link to="/home">
                <button>
                    首页
                </button>
            </router-link>
            <h1>建筑细则</h1>
        </div>

        <!-- 主内容区 -->
        <div class="main-content">
            <!-- 左侧知识图谱区 -->
            <div class="chart-content">
                <div class="tabs">
                    <div class="tab" :class="{ click: activeTab === 'bridge' }" @click="activeTab = 'bridge'">
                        桥梁
                    </div>
                    <div class="tab" :class="{ click: activeTab === 'house' }" @click="activeTab = 'house'">
                        民居
                    </div>
                    <div class="tab" :class="{ click: activeTab === 'palace' }" @click="activeTab = 'palace'">
                        皇宫
                    </div>
                    <div class="tab" :class="{ click: activeTab === 'yamen' }" @click="activeTab = 'yamen'">
                        官衙
                    </div>
                </div>
                <!-- 图谱滚动包裹层 -->
                <div class="chart-scroll-wrapper">
                    <div ref="leftChartRef" class="tab-contents"></div>
                </div>
            </div>

            <!-- 右侧图表区 -->
            <div class="right-panel">
                <h2>建筑材料占比</h2>
                <div class="chart-scroll-wrapper top-wrapper">
                    <div ref="topChartRef" class="top"></div>
                </div>
                <h2>结构-材料-风格导向图</h2>
                <div class="chart-scroll-wrapper bottom-wrapper">
                    <div ref="bottomChartRef" class="bottom"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import * as echarts from 'echarts'

// 图表容器 DOM 引用
const leftChartRef = ref(null)
const topChartRef = ref(null)
const bottomChartRef = ref(null)

// 当前激活的 Tab 分类
const activeTab = ref('bridge')

// 图表实例（全局管理，便于销毁和重绘）
let leftChart = null
let topChart = null
let bottomChart = null

// ===================== 全量数据 =====================
const allGraphData = {
    // 桥梁数据
    bridge: [
        { parentNode: '桥梁', childNodes: ['梁桥', '拱桥', '索桥', '浮桥', '廊桥'] },
        { parentNode: '梁桥', childNodes: ['泉州洛阳桥', '古汴水梁桥'] },
        { parentNode: '拱桥', childNodes: ['赵州桥', '卢沟桥'] },
        { parentNode: '索桥', childNodes: ['泸定桥', '珠浦桥'] },
        { parentNode: '浮桥', childNodes: ['黄河蒲津浮桥', '长江浮桥'] },
        { parentNode: '廊桥', childNodes: ['泰顺廊桥', '闽浙木拱廊桥 '] }
    ],
    // 民居数据
    house: [
        { parentNode: '民居', childNodes: ['合院式', '天井式', '窑洞式', '干栏式', '碉楼式', '毡帐式'] },
        { parentNode: '合院式', childNodes: ['北京四合院', '山西大院'] },
        { parentNode: '天井式', childNodes: ['江南民居', '徽派民居'] },
        { parentNode: '窑洞式', childNodes: ['靠崖窑', '地坑窑'] },
        { parentNode: '干栏式', childNodes: ['乾清宫', '坤宁宫'] },
        { parentNode: '碉楼式', childNodes: ['福建土楼', '羌族碉楼'] },
        { parentNode: '毡帐式', childNodes: ['蒙古包', '帐篷'] }
    ],
    // 皇宫数据
    palace: [
        { parentNode: '皇宫', childNodes: ['外朝', '内廷', '祭祀'] },
        { parentNode: '外朝', childNodes: ['太和殿', '武英殿', '午门'] },
        { parentNode: '内廷', childNodes: ['乾清宫', '坤宁宫'] },
        { parentNode: '祭祀', childNodes: ['天坛', '地坛'] }
    ],
    // 官衙数据
    yamen: [
        { parentNode: '官衙', childNodes: ['中央', '地方', '司法/监狱', '驿站', '工程建筑', '礼制建筑'] },
        { parentNode: '中央', childNodes: ['御史台', '大理寺', '翰林院'] },
        { parentNode: '地方', childNodes: ['州衙', '县衙'] },
        { parentNode: '司法/监狱', childNodes: ['府县牢狱', '申明亭', '旌善亭'] },
        { parentNode: '驿站', childNodes: ['驿', '站', '铺'] },
        { parentNode: '工程建筑', childNodes: ['太和殿', '乾清宫', '坤宁宫'] },
        { parentNode: '礼制建筑', childNodes: ['社稷坛', '风云雷雨坛', '先贤祠'] }
    ]
}

// ===================== 左侧：知识图谱（关系图） =====================
function initLeftChart(type) {
    if (!leftChartRef.value) return
    if (leftChart) leftChart.dispose()
    leftChart = echarts.init(leftChartRef.value)

    const graphData = allGraphData[type]
    const listdata = []
    const linksdata = []
    let nodeId = 0
    const level1Nodes = []

    function setNodeData(nodeArr, level) {
        const size = 70
        for (let i = 0; i < nodeArr.length; i++) {
            listdata.push({
                id: nodeId++,
                category: level,
                name: nodeArr[i],
                symbolSize: size,
                draggable: true,
                itemStyle: {
                    color:
                        level === 0 ? 'rgb(124, 168, 250)' :
                            level === 1 ? 'rgb(136, 181, 136)' :
                                'rgb(230, 211, 106)',
                    borderColor:
                        level === 0 ? 'rgba(100, 149, 237, 1)' :
                            level === 1 ? 'rgba(144, 238, 144, 1)' :
                                'rgba(255, 215, 0, 1)',
                    borderWidth: 1
                }
            })
        }
    }

    function setLinkData(sourceIdList, targetId) {
        for (let i = 0; i < sourceIdList.length; i++) {
            linksdata.push({
                source: sourceIdList[i],
                target: targetId,
                lineStyle: { normal: { color: 'source', opacity: 0.8 } }
            })
        }
    }

    for (let i = 1; i < graphData.length; i++) {
        const parentName = graphData[i].parentNode
        setNodeData([parentName], 1)
        level1Nodes.push(nodeId - 1)

        const childNames = graphData[i].childNodes
        setNodeData(childNames, 2)

        const childIdList = []
        for (let n = nodeId - childNames.length; n < nodeId; n++) {
            childIdList.push(n)
        }
        setLinkData(childIdList, nodeId - childNames.length - 1)
    }

    setNodeData([graphData[0].parentNode], 0)
    setLinkData(level1Nodes, nodeId - 1)

    const option = {
        tooltip: { formatter: '{b}' },
        backgroundColor: 'transparent',
        legend: {
            show: true,
            data: [
                { name: '父节点', icon: 'circle' },
                { name: '层级二', icon: 'circle' },
                { name: '层级三', icon: 'circle' }
            ],
            textStyle: { color: '#e9e5e2' },
            type: 'scroll',
            orient: 'horizontal',
            left: 10,
            top: 20,
            bottom: 20,
            itemWidth: 50,
            itemHeight: 10
        },
        animationDuration: 0,
        animationEasingUpdate: 'quinticInOut',
        series: [{
            name: '知识图谱',
            type: 'graph',
            layout: 'force',
            force: {
                repulsion: 400,
                gravity: 0.1,
                edgeLength: 80,
                layoutAnimation: true
            },
            data: listdata,
            links: linksdata,
            categories: [
                {
                    name: '父节点', symbol: 'circle',
                    itemStyle: { color: 'rgba(100, 149, 237, 0.7)', borderColor: 'rgba(100, 149, 237, 1)', borderWidth: 2 }
                },
                {
                    name: '层级二', symbol: 'circle',
                    itemStyle: { color: 'rgba(144, 238, 144, 0.7)', borderColor: 'rgba(144, 238, 144, 1)', borderWidth: 2 }
                },
                {
                    name: '层级三', symbol: 'circle',
                    itemStyle: { color: 'rgba(255, 215, 0, 0.7)', borderColor: 'rgba(255, 217, 0, 0.56)', borderWidth: 2 }
                }
            ],
            roam: true,
            label: {
                normal: { show: true, position: 'bottom', formatter: '{b}', fontSize: 15, fontWeight: 600, color: '#ffffff' }
            },
            lineStyle: { normal: { opacity: 0.9, width: 2.5, curveness: 0 } }
        }]
    }

    leftChart.setOption(option)
}

// ===================== 右上：建筑材料占比仪表盘 =====================
function initTopChart() {
    if (!topChartRef.value) return
    if (topChart) topChart.dispose()
    topChart = echarts.init(topChartRef.value)

    const placeHolderStyle = {
        normal: { label: { show: false }, labelLine: { show: false }, color: 'transparent', borderWidth: 0 },
        emphasis: { color: 'transparent', borderWidth: 0 }
    }

    const gaugeConfigs = [
        {
            center: ['15%', '50%'], titleText: '木材', titleLeft: '15%', value: 45,
            valuePos: ['13%', '45%'], centerText: '45%',
            fillColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#99da69' }, { offset: 1, color: '#01babc' }
            ]),
            borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#01babc' }, { offset: 1, color: '#99da69' }
            ])
        },
        {
            center: ['38%', '50%'], titleText: '石材', titleLeft: '38%', value: 35,
            valuePos: ['36%', '45%'], centerText: '35%',
            fillColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#9f3edd' }, { offset: 1, color: '#4897f6' }
            ]),
            borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#4897f6' }, { offset: 1, color: '#9f3edd' }
            ])
        },
        {
            center: ['62%', '50%'], titleText: '生土', titleLeft: '62%', value: 10,
            valuePos: ['60%', '45%'], centerText: '10%',
            fillColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#f7ba1e' }, { offset: 1, color: '#f2637b' }
            ]),
            borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#f2637b' }, { offset: 1, color: '#f7ba1e' }
            ])
        },
        {
            center: ['85%', '50%'], titleText: '砖瓦', titleLeft: '85%', value: 10,
            valuePos: ['83%', '45%'], centerText: '10%',
            fillColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#36d399' }, { offset: 1, color: '#1e40af' }
            ]),
            borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#1e40af' }, { offset: 1, color: '#36d399' }
            ])
        }
    ]

    const series = []
    const titles = []
    const centerTextList = []

    gaugeConfigs.forEach(config => {
        series.push({
            type: 'pie', hoverAnimation: false,
            radius: ['40%', '59%'], center: config.center,
            startAngle: 225, endAngle: 45,
            labelLine: { normal: { show: false } }, label: { normal: { show: false } },
            data: [
                { value: config.value, itemStyle: { normal: { color: config.fillColor } } },
                { value: 100 - config.value, itemStyle: placeHolderStyle }
            ]
        })
        series.push({
            type: 'pie', hoverAnimation: false,
            radius: ['60%', '61%'], center: config.center,
            startAngle: 225, endAngle: 45,
            labelLine: { normal: { show: false } }, label: { normal: { show: false } },
            data: [
                { value: 75, itemStyle: { normal: { color: config.borderColor } } },
                { value: 25, itemStyle: placeHolderStyle }
            ]
        })
        titles.push({
            text: config.titleText, left: config.titleLeft, top: '69%', textAlign: 'center',
            textStyle: { fontSize: 20, fontWeight: 'bold', color: '#fff' }
        })
        centerTextList.push({
            type: 'text', left: config.valuePos[0], top: config.valuePos[1],
            style: {
                text: config.centerText, font: 'bold 22px "Microsoft YaHei"',
                fill: '#fff', textAlign: 'center', textBaseline: 'middle'
            }
        })
    })

    topChart.setOption({ title: titles, series, graphic: centerTextList })
}

// ===================== 右下：结构-材料-风格桑基图 =====================
function initBottomChart() {
    if (!bottomChartRef.value) return
    if (bottomChart) bottomChart.dispose()
    bottomChart = echarts.init(bottomChartRef.value)

    const option = {
        series: [{
            type: 'sankey',
            left: 20, right: 50, top: 30, bottom: 30,
            nodeWidth: 26, nodeGap: 12, orient: 'horizontal', layoutIterations: 64,
            data: [
                { name: '木结构', itemStyle: { color: '#e69935' } },
                { name: '砖石结构', itemStyle: { color: '#6f7275' } },
                { name: '生土结构', itemStyle: { color: '#934123' } },
                { name: '砖木混合', itemStyle: { color: '#f4d660' } },
                { name: '琉璃瓦', itemStyle: { color: '#60c8f4' } },
                { name: '抬梁式', itemStyle: { color: '#66CDAA' } },
                { name: '穿斗式', itemStyle: { color: '#FFA07A' } },
                { name: '干栏式', itemStyle: { color: '#F0E68C' } },
                { name: '井干式', itemStyle: { color: '#98FB98' } },
                { name: '拱券式', itemStyle: { color: '#F08080' } },
                { name: '筒体式', itemStyle: { color: '#F0E68C' } },
                { name: '窑洞', itemStyle: { color: '#F0E68C' } },
                { name: '版筑夯土', itemStyle: { color: '#98FB98' } },
                { name: '楠木', itemStyle: { color: '#F08080' } },
                { name: '杉木', itemStyle: { color: '#87CEEB' } },
                { name: '松木', itemStyle: { color: '#FFA07A' } },
                { name: '青石', itemStyle: { color: '#F0E68C' } },
                { name: '青砖', itemStyle: { color: '#F08080' } },
                { name: '生土', itemStyle: { color: '#F4A460' } },
                { name: '京派', itemStyle: { color: '#F08080' } },
                { name: '徽派', itemStyle: { color: '#F0E68C' } },
                { name: '苏派', itemStyle: { color: '#F0E68C' } },
                { name: '晋派', itemStyle: { color: '#87CEEB' } },
                { name: '闽派', itemStyle: { color: '#98FB98' } },
                { name: '川派', itemStyle: { color: '#98FB98' } },
                { name: '岭南', itemStyle: { color: '#98FB98' } },
                { name: '藏派', itemStyle: { color: '#98FB98' } },
                { name: '秦汉', itemStyle: { color: '#98FB98' } },
                { name: '唐宋', itemStyle: { color: '#F0E68C' } },
                { name: '明清', itemStyle: { color: '#F08080' } }
            ],
            links: [
                { source: '木结构', target: '抬梁式', value: 4 },
                { source: '木结构', target: '穿斗式', value: 3 },
                { source: '木结构', target: '干栏式', value: 2 },
                { source: '木结构', target: '井干式', value: 1 },
                { source: '砖石结构', target: '拱券式', value: 3 },
                { source: '砖石结构', target: '筒体式', value: 2 },
                { source: '生土结构', target: '窑洞', value: 2 },
                { source: '生土结构', target: '版筑夯土', value: 1 },
                { source: '砖木混合', target: '抬梁式', value: 2 },
                { source: '砖木混合', target: '拱券式', value: 1 },
                { source: '抬梁式', target: '楠木', value: 3 },
                { source: '抬梁式', target: '松木', value: 2 },
                { source: '穿斗式', target: '杉木', value: 3 },
                { source: '干栏式', target: '杉木', value: 2 },
                { source: '井干式', target: '松木', value: 1 },
                { source: '拱券式', target: '青石', value: 2 },
                { source: '拱券式', target: '青砖', value: 2 },
                { source: '筒体式', target: '青砖', value: 2 },
                { source: '窑洞', target: '生土', value: 2 },
                { source: '版筑夯土', target: '生土', value: 1 },
                { source: '楠木', target: '京派', value: 2 },
                { source: '楠木', target: '唐宋', value: 2 },
                { source: '杉木', target: '徽派', value: 2 },
                { source: '杉木', target: '苏派', value: 2 },
                { source: '杉木', target: '川派', value: 1 },
                { source: '松木', target: '晋派', value: 1 },
                { source: '松木', target: '明清', value: 2 },
                { source: '青石', target: '晋派', value: 2 },
                { source: '青砖', target: '明清', value: 2 },
                { source: '青砖', target: '闽派', value: 1 },
                { source: '琉璃瓦', target: '京派', value: 2 },
                { source: '琉璃瓦', target: '藏派', value: 1 },
                { source: '生土', target: '晋派', value: 2 },
                { source: '生土', target: '秦汉', value: 1 }
            ],
            emphasis: { focus: 'adjacency' },
            lineStyle: { color: 'gradient', curveness: 0.5, opacity: 0.7 },
            label: { color: '#FFFFFF', fontSize: 14, fontWeight: '500', distance: 8 },
            itemStyle: { borderWidth: 0, opacity: 0.95 }
        }]
    }

    bottomChart.setOption(option)
}

// ===================== 公共方法 =====================
function handleResize() {
    leftChart && leftChart.resize()
    topChart && topChart.resize()
    bottomChart && bottomChart.resize()
}

watch(activeTab, (newType) => {
    nextTick(() => initLeftChart(newType))
})

onMounted(() => {
    nextTick(() => {
        initLeftChart(activeTab.value)
        initTopChart()
        initBottomChart()
    })
    window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
    leftChart && leftChart.dispose()
    topChart && topChart.dispose()
    bottomChart && bottomChart.dispose()
})
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    list-style: none;
    box-sizing: border-box;
}

.building-detail {
    width: 100vw;
    min-height: 100vh;
    background-color: #051b4a;
}

/* 顶部标题栏：固定高度，作为定位基准 */
.title {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    /* 固定高度，保证按钮垂直居中永远稳定 */
    height: 50px;
    padding: 0 10px;
    border: solid 1px rgba(21, 90, 174, 0.63);
    /* 防止内容溢出 */
    overflow: hidden;
}

h1 {
    color: aliceblue;
    font-size: 33px;
    margin: 0;
    /* 小屏避让左右按钮，避免文字被遮挡 */
    padding: 0 100px;
    white-space: nowrap;
}

/* 首页按钮：标准绝对定位 + 响应式交互 */
.title button {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    border: solid 1px rgba(128, 168, 215, 0.86);
    height: 40px;
    width: 80px;
    background: transparent;
    border-radius: 5px;
    color: #b9c7d1;
    font-size: 16px;
    cursor: pointer;
    margin: 0;
    /* 过渡动画，所有属性变化平滑过渡 */
    transition: all 0.25s ease;
}

/* hover 悬浮响应效果 */
.title button:hover {
    background: rgba(128, 168, 215, 0.15);
    border-color: #5599ff;
    color: #fff;
    box-shadow: 0 0 12px rgba(85, 153, 255, 0.4);
}

/* active 点击按压效果 */
.title button:active {
    transform: translateY(-50%) scale(0.96);
    background: rgba(85, 153, 255, 0.25);
}

/* 主内容区：大屏左右分栏，占满剩余视口高度 */
.main-content {
    display: flex;
    gap: 6px;
    padding: 6px;
    height: calc(100vh - 50px);
    width: 100%;
}

/* 左侧图谱容器 */
.chart-content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    background-color: #051b4a;
    border: solid 1px rgba(21, 90, 174, 0.63);
}

.tabs {
    width: 100%;
    padding: 10px 17px;
    display: flex;
    gap: 10px;
    align-items: center;
    color: aliceblue;
    flex-shrink: 0;
}

.tab {
    flex: 1;
    height: 45px;
    border-radius: 25px;
    background-color: rgba(111, 166, 221, 0);
    border: solid 1px rgba(21, 90, 174, 0.63);
    box-shadow:
        0 0 5px rgba(213, 173, 213, 0.442),
        0 0 10px rgba(213, 173, 213, 0.733);
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "SimSun", "FangSong", serif;
    font-size: 20px;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.tab.click {
    background-color: rgba(111, 166, 221, 0.606);
}

/* 图表滚动容器：横向+纵向滚动，保证内容完整 */
.chart-scroll-wrapper {
    flex: 1;
    width: 100%;
    overflow: auto;
    min-height: 0;
}

/* 左侧图谱最小尺寸，保证节点不挤压 */
.tab-contents {
    min-width: auto;
    min-height: auto;
    width: 100%;
    height: 100%;
}

/* 右侧图表容器 */
.right-panel {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
}

h2 {
    border: solid 1px rgba(21, 90, 174, 0.63);
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    color: aliceblue;
    font-size: 18px;
    font-weight: normal;
    flex-shrink: 0;
}

/* 仪表盘最小尺寸 */
.top {
    min-width: 600px;
    min-height: 220px;
    width: 100%;
    height: 100%;
    border: solid 1px rgba(21, 90, 174, 0.63);
}

/* 桑基图最小尺寸 */
.bottom {
    min-width: auto;
    min-height: auto;
    width: 100%;
    height: 100%;
    border: solid 1px rgba(21, 90, 174, 0.63);
}

/* ========== 小屏响应式：上下堆叠，页面整体可滚动 ========== */
@media (max-width: 900px) {
    .building-detail {
        height: auto;
        overflow-y: auto;
    }

    .main-content {
        flex-direction: column;
        height: auto;
        overflow: visible;
    }

    .chart-content {
        height: auto;
        min-height: unset;
    }

    .chart-scroll-wrapper {
        height: 65vh;
        flex: none;
    }

    .right-panel {
        height: auto;
        gap: 6px;
    }

    .top-wrapper {
        height: 28vh;
        flex: none;
    }

    .bottom-wrapper {
        height: 55vh;
        flex: none;
    }

    h1 {
        font-size: 24px;
    }

    .tab {
        font-size: 16px;
    }

    h1 {
        font-size: 24px;
        padding: 0 85px;
    }
    .title button {
        width: 70px;
        height: 36px;
        font-size: 14px;
        left: 10px;
    }
}

/* 超小屏进一步适配 */
@media (max-width: 600px) {
    h1 {
        font-size: 20px;
        padding: 0 70px;
    }
    .title button {
        width: 60px;
        height: 32px;
        font-size: 13px;
        left: 8px;
    }
}

/* 滚动条美化 */
.chart-scroll-wrapper::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

.chart-scroll-wrapper::-webkit-scrollbar-thumb {
    background: rgba(128, 168, 215, 0.5);
    border-radius: 3px;
}

.chart-scroll-wrapper::-webkit-scrollbar-track {
    background: rgba(21, 90, 174, 0.2);
}
</style>