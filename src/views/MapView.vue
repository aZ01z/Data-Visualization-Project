<template>
    <div class="top">
        <div class="topTitle">
            <router-link to="/home" class="home-link">
                <button>首页</button>
            </router-link>
            <h1>中国古代建筑相关数据总览</h1>
        </div>

        <div class="platform">

            <div class="leftPart">
                <div class="leftTop">
                    <h2>各类建筑占比</h2>
                    <div class="pieChart"></div>

                    <h2>国保古建细则</h2>
                    <div class="lips">
                        <div class="lipstotal">
                            <i class="iconfont icon-zongshu"></i>
                            <div class="num">
                                <li>总数</li>
                                <li>2176</li>
                            </div>
                        </div>
                        <div class="lipsleft">
                            <i class="iconfont icon-lishiminju"></i>
                            <div class="num1">
                                <li>民居</li>
                                <li>328</li>
                            </div>
                        </div>
                        <div class="lipsright">
                            <i class="iconfont icon-qitazhongyaobuwei"></i>
                            <div class="num2">
                                <li>官衙</li>
                                <li>78</li>
                            </div>
                        </div>
                        <div class="lipsbottom">
                            <i class="iconfont icon-bridge"></i>
                            <div class="num3">
                                <li>桥梁</li>
                                <li>95</li>
                            </div>
                        </div>
                        <div class="lipslast">
                            <i class="iconfont icon-city-gate"></i>
                            <div class="num4">
                                <li>皇宫</li>
                                <li>20</li>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="chart"></div>

            <div class="rightPart">
                <h2>建筑著作</h2>
                <div class="policy">
                    <div class="container">
                        <div class="header-row">
                            <span>建筑著作</span>
                            <span>年份</span>
                        </div>
                        <a href="https://baike.baidu.com/item/%E5%91%A8%E7%A4%BC%C2%B7%E8%80%83%E5%B7%A5%E8%AE%B0%C2%B7%E5%8C%A0%E4%BA%BA/18164579"
                            target="_blank">
                            <div class="rank-item">
                                <span class="publisher-name">《周礼·考工记·匠人》</span>
                                <span class="score">春秋战国</span>
                            </div>
                        </a>
                        <hr>
                        <a href="https://baike.baidu.com/item/%E6%9C%A8%E7%BB%8F/2975952" target="_blank">
                            <div class="rank-item">
                                <span class="publisher-name">《木经》</span>
                                <span class="score">北宋</span>
                            </div>
                        </a>
                        <hr>
                        <a href="https://baike.baidu.com/item/%E8%90%A5%E9%80%A0%E6%B3%95%E5%BC%8F/1126314"
                            target="_blank">
                            <div class="rank-item">
                                <span class="publisher-name">《营造法式》</span>
                                <span class="score">北宋</span>
                            </div>
                        </a>
                        <hr>
                        <a href="https://baike.baidu.com/item/%E6%B2%B3%E9%98%B2%E9%80%9A%E8%AE%AE/3206455"
                            target="_blank">
                            <div class="rank-item">
                                <span class="publisher-name">《河防通议》</span>
                                <span class="score">北宋</span>
                            </div>
                        </a>
                        <hr>
                        <a href="https://baike.baidu.com/item/%E9%B2%81%E7%8F%AD%E7%BB%8F%E5%8C%A0%E5%AE%B6%E9%95%9C/5383839"
                            target="_blank">
                            <div class="rank-item">
                                <span class="publisher-name">《鲁班经匠家镜》</span>
                                <span class="score">明</span>
                            </div>
                        </a>
                        <hr>
                        <a href="https://baike.baidu.com/item/%E5%9B%AD%E5%86%B6/2848352" target="_blank">
                            <div class="rank-item">
                                <span class="publisher-name">《园冶》</span>
                                <span class="score">明</span>
                            </div>
                        </a>
                        <hr>
                        <a href="https://baike.baidu.com/item/%E5%B7%A5%E7%A8%8B%E5%81%9A%E6%B3%95%E5%88%99%E4%BE%8B/55524395"
                            target="_blank">
                            <div class="rank-item">
                                <span class="publisher-name">《工程做法则例》</span>
                                <span class="score">清</span>
                            </div>
                        </a>
                        <hr>
                    </div>
                </div>

                <h2>相关名词</h2>
                <div class="cloudChart"></div>
            </div>

            <div class="bottom">
            </div>
        </div>

    </div>


    <!-- 自定义点击提示框 -->
    <div class="province-tip" id="provinceTip"></div>


</template>

<script setup>
import * as echarts from 'echarts'

// 中上地图
(function () {
    const chartDom = document.querySelector(".chart");
    const myChart = chartDom ? echarts.init(chartDom) : null;

    if (myChart) {
        window.addEventListener('resize', function () {
            myChart.resize();
        });
    }

    const provinceCoordinates = {
        "北京市": [116.46, 39.92],
        "天津市": [117.20, 39.13],
        "上海市": [121.48, 31.23],
        "重庆市": [106.55, 29.57],
        "河北省": [114.48, 38.03],
        "山西省": [112.55, 37.87],
        "辽宁省": [123.43, 41.80],
        "吉林省": [125.35, 43.88],
        "黑龙江省": [126.63, 45.75],
        "江苏省": [118.78, 32.06],
        "浙江省": [120.16, 30.27],
        "安徽省": [117.28, 31.86],
        "福建省": [119.30, 26.08],
        "江西省": [115.89, 28.68],
        "山东省": [117.00, 36.67],
        "河南省": [113.65, 34.76],
        "湖北省": [114.31, 30.60],
        "湖南省": [113.00, 28.21],
        "广东省": [113.27, 23.13],
        "海南省": [110.35, 20.02],
        "四川省": [104.06, 30.67],
        "贵州省": [106.71, 26.58],
        "云南省": [102.72, 25.04],
        "陕西省": [108.95, 34.27],
        "甘肃省": [103.82, 36.06],
        "青海省": [101.78, 36.62],
        "台湾省": [121.53, 25.05],
        "内蒙古自治区": [111.75, 40.84],
        "广西壮族自治区": [108.33, 22.82],
        "西藏自治区": [91.11, 29.97],
        "宁夏回族自治区": [106.27, 38.47],
        "新疆维吾尔自治区": [87.62, 43.82],
        "香港特别行政区": [114.17, 22.28],
        "澳门特别行政区": [113.54, 22.19]
    };

    const toolTipData = [
        { name: '北京市', value: [{ name: "皇宫", value: 14 }, { name: "民居", value: 10 }, { name: "桥梁", value: 2 }, { name: "官衙", value: 7 }] },
        { name: '天津市', value: [{ name: "皇宫", value: 0 }, { name: "民居", value: 3 }, { name: "桥梁", value: 0 }, { name: "官衙", value: 0 }] },
        { name: '河北省', value: [{ name: "皇宫", value: 1 }, { name: "民居", value: 3 }, { name: "桥梁", value: 10 }, { name: "官衙", value: 21 }] },
        { name: '辽宁省', value: [{ name: "皇宫", value: 1 }, { name: "民居", value: 0 }, { name: "桥梁", value: 1 }, { name: "官衙", value: 0 }] },
        { name: '山西省', value: [{ name: "皇宫", value: 0 }, { name: "民居", value: 32 }, { name: "桥梁", value: 3 }, { name: "官衙", value: 19 }] },
        { name: '内蒙古自治区', value: [{ name: "皇宫", value: 0 }, { name: "民居", value: 5 }, { name: "桥梁", value: 0 }, { name: "官衙", value: 2 }] },
        { name: '吉林省', value: [{ name: "皇宫", value: 0 }, { name: "民居", value: 1 }, { name: "桥梁", value: 0 }, { name: "官衙", value: 1 }] },
        { name: '黑龙江省', value: [{ name: "皇宫", value: 0 }, { name: "民居", value: 0 }, { name: "桥梁", value: 0 }, { name: "官衙", value: 0 }] },
        { name: '上海市', value: [{ name: "皇宫", value: 0 }, { name: "民居", value: 1 }, { name: "桥梁", value: 0 }, { name: "官衙", value: 0 }] },
        { name: '陕西省', value: [{ name: "皇宫", value: 0 }, { name: "民居", value: 5 }, { name: "桥梁", value: 2 }, { name: "官衙", value: 1 }] },
        { name: '甘肃省', value: [{ name: "皇宫", value: 0 }, { name: "民居", value: 5 }, { name: "桥梁", value: 0 }, { name: "官衙", value: 3 }] },
        { name: '安徽省', value: [{ name: "皇宫", value: 0 }, { name: "民居", value: 24 }, { name: "桥梁", value: 5 }, { name: "官衙", value: 0 }] },
        { name: '福建省', value: [{ name: "皇宫", value: 0 }, { name: "民居", value: 26 }, { name: "桥梁", value: 7 }, { name: "官衙", value: 0 }] },
        { name: '浙江省', value: [{ name: "皇宫", value: 0 }, { name: "民居", value: 41 }, { name: "桥梁", value: 22 }, { name: "官衙", value: 0 }] },
        { name: '福建省', value: [{ name: "皇宫", value: 0 }, { name: "民居", value: 3 }, { name: "桥梁", value: 3 }, { name: "官衙", value: 2 }] },
        { name: '江西省', value: [{ name: "皇宫", value: 0 }, { name: "民居", value: 12 }, { name: "桥梁", value: 8 }, { name: "官衙", value: 2 }] },
        { name: '江苏省', value: [{ name: "皇宫", value: 1 }, { name: "民居", value: 40 }, { name: "桥梁", value: 8 }, { name: "官衙", value: 3 }] },
        { name: '山东省', value: [{ name: "皇宫", value: 1 }, { name: "民居", value: 7 }, { name: "桥梁", value: 2 }, { name: "官衙", value: 2 }] },
        { name: '河南省', value: [{ name: "皇宫", value: 0 }, { name: "民居", value: 8 }, { name: "桥梁", value: 5 }, { name: "官衙", value: 4 }] },
        { name: '云南省', value: [{ name: "皇宫", value: 1 }, { name: "民居", value: 13 }, { name: "桥梁", value: 5 }, { name: "官衙", value: 4 }] },
        { name: '西藏自治区', value: [{ name: "皇宫", value: 2 }, { name: "民居", value: 2 }, { name: "桥梁", value: 0 }, { name: "官衙", value: 0 }] },
        { name: '广东省', value: [{ name: "皇宫", value: 0 }, { name: "民居", value: 14 }, { name: "桥梁", value: 1 }, { name: "官衙", value: 2 }] },
        { name: '重庆市', value: [{ name: "皇宫", value: 0 }, { name: "民居", value: 1 }, { name: "桥梁", value: 0 }, { name: "官衙", value: 0 }] },
        { name: '四川省', value: [{ name: "皇宫", value: 0 }, { name: "民居", value: 12 }, { name: "桥梁", value: 3 }, { name: "官衙", value: 3 }] },
        { name: '湖北省', value: [{ name: "皇宫", value: 0 }, { name: "民居", value: 12 }, { name: "桥梁", value: 0 }, { name: "官衙", value: 0 }] },
        { name: '湖南省', value: [{ name: "皇宫", value: 0 }, { name: "民居", value: 24 }, { name: "桥梁", value: 5 }, { name: "官衙", value: 0 }] },
        { name: '贵州省', value: [{ name: "皇宫", value: 0 }, { name: "民居", value: 16 }, { name: "桥梁", value: 3 }, { name: "官衙", value: 1 }] },
        { name: '广西壮族自治区', value: [{ name: "皇宫", value: 0 }, { name: "民居", value: 7 }, { name: "桥梁", value: 3 }, { name: "官衙", value: 1 }] },
        { name: '海南省', value: [{ name: "皇宫", value: 0 }, { name: "民居", value: 2 }, { name: "桥梁", value: 0 }, { name: "官衙", value: 2 }] },
        { name: '青海省', value: [{ name: "皇宫", value: 0 }, { name: "民居", value: 1 }, { name: "桥梁", value: 0 }, { name: "官衙", value: 0 }] },
        { name: '宁夏回族自治区', value: [{ name: "皇宫", value: 0 }, { name: "民居", value: 1 }, { name: "桥梁", value: 0 }, { name: "官衙", value: 0 }] },
        { name: '新疆维吾尔自治区', value: [{ name: "皇宫", value: 0 }, { name: "民居", value: 0 }, { name: "桥梁", value: 0 }, { name: "官衙", value: 0 }] },
        { name: '香港特别行政区', value: [{ name: "皇宫", value: 0 }, { name: "民居", value: 0 }, { name: "桥梁", value: 0 }, { name: "官衙", value: 0 }] },
        { name: '澳门特别行政区', value: [{ name: "皇宫", value: 0 }, { name: "民居", value: 0 }, { name: "桥梁", value: 0 }, { name: "官衙", value: 0 }] },
        { name: '台湾省', value: [{ name: "皇宫", value: 0 }, { name: "民居", value: 0 }, { name: "桥梁", value: 0 }, { name: "官衙", value: 0 }] },
    ];

    const cityValues = {
        "北京市": 81, "天津市": 8, "上海市": 5, "重庆市": 10,
        "河北省": 144, "山西省": 421, "辽宁省": 39, "吉林省": 6,
        "黑龙江省": 3, "江苏省": 107, "浙江省": 152, "安徽省": 89,
        "福建省": 82, "江西省": 67, "山东省": 57, "河南省": 158,
        "湖北省": 47, "湖南省": 80, "广东省": 54, "海南省": 14,
        "四川省": 141, "贵州省": 39, "云南省": 81, "陕西省": 100,
        "甘肃省": 53, "青海省": 23, "台湾省": 0,
        "内蒙古自治区": 34, "广西壮族自治区": 25, "西藏自治区": 44,
        "宁夏回族自治区": 16, "新疆维吾尔自治区": 13,
        "香港特别行政区": 0, "澳门特别行政区": 0
    };

    const provinceLinks = {
        "陕西省": './ShanxiView.vue',
    };

    function getMapData() {
        const data = [];
        for (const province in cityValues) {
            if (provinceCoordinates[province]) {
                data.push({ name: province, value: [...provinceCoordinates[province], cityValues[province]] });
            }
        }
        return data;
    }

    function getTooltipContent(provinceName) {
        let html = `${provinceName}：<br>`;
        const targetProvince = toolTipData.find(item => item.name === provinceName);
        if (targetProvince && Array.isArray(targetProvince.value)) {
            targetProvince.value.forEach(item => {
                html += `${item.name}：${item.value}<br>`;
            });
        }
        return html;
    }

    if (myChart) {
        fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json')
            .then(res => res.json())
            .then(geoJson => {
                echarts.registerMap('china', geoJson);

                const option = {
                    backgroundColor: '#0f172a00',
                    tooltip: {
                        trigger: 'item',
                        formatter: function (params) {
                            // 悬浮到省份区域 / 光点 都显示信息
                            return getTooltipContent(params.name);
                        },
                        textStyle: { color: '#fff' },
                        backgroundColor: '#333',
                        borderColor: '#666',
                        borderWidth: 1,
                        // 让tooltip跟随鼠标，更流畅
                        triggerOn: 'mousemove',
                        transitionDuration: 0
                    },
                    geo: {
                        show: true,
                        map: 'china',
                        zoom: 1.6,
                        center: [105.0000, 36.0000],
                        label: { show: true, fontSize: 12, color: '#fff', fontWeight: '500' },
                        itemStyle: {
                            normal: {
                                borderColor: 'rgba(147, 235, 248, 1)',
                                borderWidth: 1,
                                areaColor: {
                                    type: 'radial', x: 0.5, y: 0.5, r: 0.8,
                                    colorStops: [
                                        { offset: 0, color: 'rgba(147,235,248,0)' },
                                        { offset: 1, color: 'rgba(147,235,248,.2)' }
                                    ]
                                },
                                shadowColor: 'rgba(128,217,248,1)',
                                shadowOffsetX: -2, shadowOffsetY: 2, shadowBlur: 10
                            },
                            emphasis: {
                                areaColor: '#389BB7',
                                borderWidth: 0,
                                label: { color: '#fff', fontSize: 14 }
                            }
                        },
                        //开启geo鼠标悬浮触发tooltip
                        tooltip: {
                            show: true
                        }
                    },
                    series: [
                        {
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            data: getMapData(),
                            symbolSize: val => val[2] * 0.06,
                            showEffectOn: 'render',
                            rippleEffect: { period: 15, scale: 4, brushType: 'fill' },
                            hoverAnimation: true,
                            itemStyle: { color: '#FA8C16', shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.3)' },
                            label: { show: false },
                            geoIndex: 0,
                            triggerEvent: true
                        },
                        {
                            type: 'map',
                            map: 'china',
                            geoIndex: 0,
                            data: [],
                            itemStyle: {
                                normal: { areaColor: 'transparent', borderColor: 'transparent' },
                                emphasis: { areaColor: 'transparent' }
                            },
                            label: { show: false },
                            roam: false,
                            triggerEvent: true
                        }
                    ]
                };

                myChart.setOption(option);

                // 点击跳转到对应链接
                myChart.on('click', function (params) {
                    const provinceName = params.name;
                    if (provinceName && provinceLinks[provinceName]) {
                        window.open(provinceLinks[provinceName], '_blank');
                    }
                });

            })
            .catch(err => console.error('地图数据加载失败:', err));
    }
})();







//中下折线图
(function () {
    var myChart = echarts.init(document.querySelector('.bottom'));
    // 严格按Excel顺序的34个省份（两页各17个）
    var provinceData = [
        "山西", "河南", "浙江", "河北", "四川", "江苏", "陕西", "安徽", "福建", "北京",
        "云南", "湖南", "江西", "山东", "广东", "甘肃", "湖北", // 第1页（17个）
        "西藏", "辽宁", "贵州", "内蒙古", "广西", "青海", "宁夏", "海南", "新疆", "重庆",
        "天津", "吉林", "上海", "黑龙江", "香港", "澳门", "台湾"  // 第2页（17个）
    ];

    var bridgeData = [
        3, 5, 22, 10, 3, 8, 2, 5, 7, 2, 5, 5, 8, 2, 1, 0, 0,
        0, 1, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ];
    var palaceData = [
        0, 0, 0, 1, 0, 1, 0, 0, 0, 14, 1, 0, 0, 1, 0, 0, 0,
        2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ];
    var residenceData = [
        32, 8, 41, 3, 12, 40, 5, 24, 26, 10, 13, 24, 12, 7, 14, 5, 12,
        2, 0, 16, 5, 7, 1, 1, 2, 0, 1, 3, 1, 1, 0, 0, 0, 0
    ];
    var governmentData = [
        19, 4, 0, 21, 3, 3, 1, 0, 0, 7, 4, 0, 2, 2, 2, 3, 0,
        0, 0, 1, 2, 1, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0
    ];

    var option = {
        title: {
            text: '中国各省份四类古建筑分布情况',
            textStyle: { fontWeight: 'normal', fontSize: 16, color: '#F1F1F3' },
            left: '6%',
            top: '2%'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { lineStyle: { color: '#bccaee' } }
        },
        legend: {
            icon: 'rect', itemWidth: 14, itemHeight: 5, itemGap: 13,
            data: ['桥梁', '皇宫', '民居', '官衙'],
            right: '4%',
            top: '4%',
            textStyle: { fontSize: 12, color: '#F1F1F3' }
        },
        grid: {
            left: '1%', right: '2%', bottom: '12%', containLabel: true
        },
        //滑动条
        dataZoom: [
            {
                type: 'inside',
                xAxisIndex: 0,
                start: 0,
                end: 50,
                zoomLock: true,      // 禁止缩放
                minSpan: 50,         // 强制最小跨度=50%（17个）
                maxSpan: 50,         // 强制最大跨度=50%（17个）
                moveOnMouseMove: true,
                zoomOnMouseWheel: false, // 滚轮无法缩放
                moveOnMouseWheel: false,
                bottom: '5%',
                left: '3.5%'
            },
            {
                type: 'slider',
                show: true,
                xAxisIndex: 0,
                start: 0,
                end: 50,
                zoomLock: true,      // 锁定滑块大小
                minSpan: 50,         // 强制滑块最小宽度=50%
                maxSpan: 50,         // 强制滑块最大宽度=50%
                height: 10,
                bottom: '3%',
                textStyle: { color: '#F1F1F3' },
                handleStyle: { color: '#bccaee', borderColor: '#bccaee' },
                fillerColor: 'rgba(188,202,238,0.4)',
                borderColor: '#dfe5f1',
                bottom: '5%',
                left: '3.5%'
            }
        ],
        xAxis: [{
            type: 'category',
            boundaryGap: false, //关闭两边空白，贴边显示
            axisLine: { lineStyle: { color: '#dfe5f1' } },
            axisLabel: {
                color: '#F1F1F3',
                interval: 0, // 强制显示所有省份标签
                fontSize: 12
            },
            data: provinceData
        }],
        yAxis: [{
            type: 'value', name: '单位（个）',
            axisTick: { show: false },
            axisLine: { lineStyle: { color: '#dfe5f1' } },
            axisLabel: { margin: 10, color: '#F1F1F3', fontSize: 14 },
            splitLine: { lineStyle: { color: '#dfe5f1' } }
        }],
        series: [
            {
                name: '桥梁', type: 'line', smooth: true, symbol: 'circle', symbolSize: 5, showSymbol: false,
                lineStyle: { normal: { width: 1 } },
                areaStyle: { normal: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgb(138,189,27)' }, { offset: 0.8, color: 'rgba(137,189,27,0)' }]), shadowColor: 'rgba(0,0,0,0.1)', shadowBlur: 10 } },
                itemStyle: { normal: { color: 'rgb(138,189,27)', borderColor: 'rgba(137,189,2,0.27)', borderWidth: 12 } },
                data: bridgeData
            },
            {
                name: '皇宫', type: 'line', smooth: true, symbol: 'circle', symbolSize: 5, showSymbol: false,
                lineStyle: { normal: { width: 1 } },
                areaStyle: { normal: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgb(0,134,212)' }, { offset: 0.8, color: 'rgba(0,136,212,0)' }]), shadowColor: 'rgba(0,0,0,0.1)', shadowBlur: 10 } },
                itemStyle: { normal: { color: 'rgb(0,136,212)', borderColor: 'rgba(0,136,212,0.2)', borderWidth: 12 } },
                data: palaceData
            },
            {
                name: '民居', type: 'line', smooth: true, symbol: 'circle', symbolSize: 5, showSymbol: false,
                lineStyle: { normal: { width: 1 } },
                areaStyle: { normal: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgb(219,50,50)' }, { offset: 0.8, color: 'rgba(219,50,51,0)' }]), shadowColor: 'rgba(0,0,0,0.1)', shadowBlur: 10 } },
                itemStyle: { normal: { color: 'rgb(219,50,51)', borderColor: 'rgba(219,50,51,0.2)', borderWidth: 12 } },
                data: residenceData
            },
            {
                name: '官衙', type: 'line', smooth: true, symbol: 'circle', symbolSize: 5, showSymbol: false,
                lineStyle: { normal: { width: 1 } },
                areaStyle: { normal: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgb(173,29,230)' }, { offset: 0.8, color: 'rgba(173,29,230,0)' }]), shadowColor: 'rgba(0,0,0,0.1)', shadowBlur: 10 } },
                itemStyle: { normal: { color: 'rgb(173,29,230)', borderColor: 'rgba(151,50,219,0.2)', borderWidth: 12 } },
                data: governmentData
            }
        ]
    };
    myChart.setOption(option);
    window.addEventListener('resize', function () { myChart.resize(); });
})();




//左上饼图
(function () {
    var myChart = echarts.init(document.querySelector('.pieChart'))
    if (myChart) {
        window.addEventListener('resize', function () {
            myChart.resize();
        });
    }

    var img = 'data:image/png;base64,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';

    var trafficWay = [{
        name: '桥梁',
        value: 95
    }, {
        name: '皇宫',
        value: 20
    }, {
        name: '民居',
        value: 328
    }, {
        name: '官衙',
        value: 78
    }];

    var data = [];
    var color = ['#0099ff', '#eee762', '#e0b124', '#ff6a00']
    for (var i = 0; i < trafficWay.length; i++) {
        data.push({
            value: trafficWay[i].value,
            name: trafficWay[i].name,
            itemStyle: {
                normal: {
                    borderWidth: 5,
                    shadowBlur: 20,
                    borderColor: color[i],
                    shadowColor: color[i]
                }
            }
        }, {
            value: 2,
            name: '',
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    },
                    color: 'rgba(0, 0, 0, 0)',
                    borderColor: 'rgba(0, 0, 0, 0)',
                    borderWidth: 0
                }
            }
        });
    }
    var seriesOption = [{
        name: '',
        type: 'pie',
        clockWise: false,
        radius: [65, 69],
        hoverAnimation: false,
        itemStyle: {
            normal: {
                label: {
                    show: true,
                    position: 'outside',
                    color: '#ddd',
                    formatter: function (params) {
                        var percent = 0;
                        var total = 0;
                        for (var i = 0; i < trafficWay.length; i++) {
                            total += trafficWay[i].value;
                        }
                        percent = ((params.value / total) * 100).toFixed(0);
                        if (params.name !== '') {
                            return params.name + '\n' + '\n' + '占百分比：' + percent + '%';
                        } else {
                            return '';
                        }
                    },
                },
                labelLine: {
                    length: 1,
                    length2: 2,
                    show: true,
                    color: '#00ffff'
                }
            }
        },
        data: data
    }];
    option = {
        backgroundColor: '#0a2e5d00',
        color: color,
        graphic: {
            elements: [{
                type: "image",
                z: 3,
                style: {
                    image: img,
                    width: 100,
                    height: 100
                },
                left: 'center',
                top: 'center',
                position: [100, 100]
            }]
        },
        tooltip: {
            show: false
        },
        legend: {
            icon: "circle",
            orient: 'horizontal',
            x: 'left',
            data: ['桥梁', '皇宫', '民居', '官衙'],
            left: 45,
            top: 15,
            align: 'right',
            textStyle: {
                color: "#fff"
            },
            itemGap: 20
        },
        toolbox: {
            show: false
        },
        series: seriesOption
    }
    myChart.setOption(option);
})();








//右下图
(function () {
    var myChart = echarts.init(document.querySelector('.cloudChart'))
    if (myChart) {
        window.addEventListener('resize', function () {
            myChart.resize();
        });
    }
    var chartdata = [
        { name: '天人合一', size: 50 },
        { name: '中轴对称', size: 65 },
        { name: '营造哲学', size: 70 },
        { name: '礼治秩序', size: 60 },
        { name: '前朝后寝', size: 50 },
        { name: '画栋雕梁', size: 80 },
        { name: '斗拱彩画', size: 88 },
        { name: '天井', size: 40 },
        { name: '庭院', size: 50 },
        { name: '藏风聚气', size: 85 },
        { name: '对景', size: 70 },
        { name: '格扇', size: 65 }
    ];
    var color = ['#6DFFA1', '#56C7F6', '#F9F08A', '#6d85ff', '#d156f6', '#de2d2d', '#cb900f', '#f6ae56', '#bd6666', '#da7cdb', '#101dd4', '#166c4b'];
    var data = []

    chartdata.map((item, index) => {
        data.push(
            {
                name: item.name,
                value: 111,
                symbolSize: item.size,
                draggable: true,
                label: {
                    normal: {
                        textStyle: {
                            fontSize: 12,
                            color: '#fff',
                        },
                    },
                },
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                            {
                                offset: 0.2,
                                color: 'rgba(27, 54, 72, 0.2)',
                            },
                            {
                                offset: 0.8,
                                color: color[index],
                            },
                        ]),
                        opacity: 1,
                        borderWidth: 1,
                        borderColor: color[index],
                        shadowBlur: 7,
                        symbolOffset: 0.1,
                        shadowColor: color[index],
                    },
                },
            },
        )
    })

    var option = {
        backgroundColor: '#16222e00',
        animationDurationUpdate: function (idx) {
            return idx * 100;
        },
        tooltip: {
            trigger: 'item',
            formatter: function (params, ticket, callback) {
                return params.data.tips || params.name;
            },
        },
        animationEasingUpdate: 'bounceIn',
        itemStyle: {
            // color: 'red',
        },
        cursor: 'pointer',
        series: [
            {
                type: 'graph',
                layout: 'force',
                cursor: 'pointer',
                force: {
                    repulsion: 130,
                    edgeLength: 100,
                    gravity: 0.1,
                    constraint: true,
                },
                roam: true,
                label: {
                    normal: {
                        show: true,
                    },
                },

                data,
            },
        ],
    };
    myChart.setOption(option);
})();
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    list-style: none;
}

.top {
    width: 100%;
    background-color: #051b4a;
    height: 828px;
}

.topTitle {
    width: 99.85%;
    height: 60px;
    display: flex;
    align-items: center;
    color: rgb(229, 226, 223);
    margin-bottom: 6px;
    border: solid 1px rgba(21, 90, 174, 0.63);
    border-radius: 2px;
}

button {
    border-style: none;
    border: solid .0125rem rgba(128, 168, 215, 0.863);
    height: 40px;
    width: 80px;
    background-color: rgba(240, 248, 255, 0);
    border-radius: 5px;
    color: #b9c7d1;
    margin-left: 10px;
    margin-right: 480px;
    cursor: pointer;
}

.platform {
    width: 100%;
    height: 760px;
    display: flex;
    float: left;
    justify-content: space-between;
}

.chart {
    position: relative;
    width: 49%;
    height: 65%;
    background: #051b4a;
    border: solid 1px rgba(21, 90, 174, 0.63);
}

.leftPart {
    margin-left: 8px;
    margin-top: 0px;
    width: 24%;
    height: 99%;
}

.leftTop {
    height: 98%;
}

.pieChart {
    border: solid 1px rgba(21, 90, 174, 0.63);
    height: 280px;
    margin-bottom: 6px;
}

h2 {
    display: flex;
    align-items: center;
    color: #ffffffe2;
    border: solid 1px rgba(21, 90, 174, 0.63);
    height: 40px;
}


.policy {
    height: 300px;
    border: solid 1px rgba(21, 90, 174, 0.63);
    position: relative;
    margin-bottom: 6px;
}

.container {
    width: 300px;
    padding: 20px;
    position: relative;
    overflow: hidden;
}

.container::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}


.header-row {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #1a3a7a;
    margin-top: -15px;
}

.header-row span {
    font-size: 18px;
    color: #66ccff;
}

.rank-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
    border-bottom: 1px solid #152a5a;
    cursor: pointer;
    transition: all 0.3s ease;
}

.rank-item:hover {
    background-color: rgba(26, 58, 122, 0.3);
    transform: translateX(5px);
}

.rank-item:last-child {
    border-bottom: none;
}

.publisher-name {
    flex: 1;
    padding: 0 px;
    color: #e0f0ff;
}

.score {
    color: #66ccff;
    font-weight: bold;
}

a {
    text-decoration: none;
    color: inherit;
    display: block;
    width: 100%;
}

.rightPart {
    margin-right: 8px;
    width: 24%;
    height: 99%;
}

hr {
    border: solid .2px rgba(21, 90, 174, 0.63);
}

.lips {
    height: 379px;
    border: solid 1px rgba(21, 90, 174, 0.63);

}

.lipstotal {
    height: 30%;
    width: 80%;
    margin-top: 20px;
    margin-left: 40px;
}

.lipsleft {
    height: 25%;
    width: 47%;
    margin-top: 30px;
    margin-left: 6px;
}

.lipsright {
    height: 25%;
    width: 47%;
    margin-top: -100px;
    padding-top: 10px;
    margin-left: 180px;
}

.lipsbottom {
    height: 25%;
    width: 47%;
    margin-top: 20px;
    margin-left: 6px;
}

.lipslast {
    height: 25%;
    width: 47%;
    margin-top: -95px;
    margin-left: 180px;
}

.icon-zongshu {
    width: 50%;
    height: 100%;
    color: #4dbf84;
    font-size: 75px;
    text-shadow: 0 0 5px #66ccff88,
        0 0 10px #66ccff8e;
    font-size: 120px;
}

.num {
    margin-left: 50%;
    margin-top: -100px;
    height: 100%;
    width: 50%;
    color: rgb(200, 205, 207);
}

.num li:nth-child(1) {
    font-family: "KaiTi", "楷体", "STKaiti", serif;
    font-size: 42px;

}

.num li:nth-child(2) {
    font-family: "KaiTi", "楷体", "STKaiti", serif;
    font-size: 30px;
    margin-left: 10px;
}


.icon-lishiminju {
    width: 50%;
    height: 100%;
    color: rgb(176, 125, 30);
    font-size: 80px;
    text-shadow: 0 0 5px #66ccff88,
        0 0 10px #66ccff8e;
    font-size: 70px;
}

.num1 {
    margin-left: 57%;
    margin-top: -70px;
    height: 100%;
    width: 50%;
    color: rgb(200, 205, 207);
}

.num1 li:nth-child(1) {
    font-family: "KaiTi", "楷体", "STKaiti", serif;
    font-size: 32px;
}

.num1 li:nth-child(2) {
    font-family: "KaiTi", "楷体", "STKaiti", serif;
    font-size: 30px;
    margin-left: 8px;
}


.icon-qitazhongyaobuwei {
    width: 50%;
    height: 100%;
    color: rgb(208, 83, 20);
    font-size: 80px;
    text-shadow: 0 0 5px #66ccff88,
        0 0 10px #66ccff8e;
    font-size: 70px;
}

.num2 {
    margin-left: 57%;
    margin-top: -70px;
    height: 100%;
    width: 50%;
    color: rgb(200, 205, 207);
}

.num2 li:nth-child(1) {
    font-family: "KaiTi", "楷体", "STKaiti", serif;
    font-size: 32px;
}

.num2 li:nth-child(2) {
    font-family: "KaiTi", "楷体", "STKaiti", serif;
    font-size: 30px;
    margin-left: 15px;
}

.icon-bridge {
    width: 50%;
    height: 100%;
    color: rgb(20, 158, 208);
    font-size: 80px;
    text-shadow: 0 0 5px #66ccff88,
        0 0 10px #66ccff8e;
    font-size: 70px;
}

.num3 {
    margin-left: 57%;
    margin-top: -70px;
    height: 100%;
    width: 50%;
    color: rgb(200, 205, 207);
}

.num3 li:nth-child(1) {
    font-family: "KaiTi", "楷体", "STKaiti", serif;
    font-size: 32px;
}

.num3 li:nth-child(2) {
    font-family: "KaiTi", "楷体", "STKaiti", serif;
    font-size: 30px;
    margin-left: 15px;
}

.icon-city-gate {
    width: 50%;
    height: 100%;
    color: rgb(208, 205, 20);
    font-size: 80px;
    text-shadow: 0 0 5px #66ccff88,
        0 0 10px #66ccff8e;
    font-size: 70px;
}

.num4 {
    margin-left: 57%;
    margin-top: -70px;
    height: 100%;
    width: 50%;
    color: rgb(200, 205, 207);
}

.num4 li:nth-child(1) {
    font-family: "KaiTi", "楷体", "STKaiti", serif;
    font-size: 32px;
}

.num4 li:nth-child(2) {
    font-family: "KaiTi", "楷体", "STKaiti", serif;
    font-size: 30px;
    margin-left: 15px;
}


.cloudChart {
    height: 359px;
    border: solid 1px rgba(21, 90, 174, 0.63);
}

.bottom {
    position: absolute;
    margin-left: 25.4%;
    width: 49%;
    height: 250px;
    margin-top: 501px;
    border: solid 1px rgba(21, 90, 174, 0.63);
    float: left;
}
</style>