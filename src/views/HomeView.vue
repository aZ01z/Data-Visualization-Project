<template>
  <title>古建新说</title>
  <div class="top section">
    <div class="title">
      <h1>古建新说</h1>
      <h2>中国古代建筑文化数据可视化</h2>
    </div>
  </div>

  <!-- ref绑定元素 -->
  <div class="picture" ref="pictureRef">
    <img src="../image/新对话2.png" ref="leftImgRef" id="left">
    <img src="../image/新对话.png" ref="rightImgRef" id="right">
  </div>

  <div class="middle section" id="main">
    <div class="choice">
      <h2>内容总览</h2>
      <h3>阅览我们的四个模块，我们将从数据总览、建筑细则、礼制规范到古建保护与展望，全方位解析中国古建筑文化，系统呈现中国古建筑的数据、细节、礼制与现状。</h3>
      <hr>
    </div>

    <!-- 卡片展示区 -->
    <div class="cards-section">
      <router-link to="/map" class="card-link">
        <div class="card">
          <img src="../image/数据.jpg" alt="数据总览" />
          <h5>数据总览</h5>
          <p>本版面为中国古代建筑数据总览，通过具体数据、热力地图发布等，系统展现古建的地域分布、类型占比与文化脉络。 &emsp;&emsp;&emsp;</p>
        </div>
      </router-link>


      <router-link to="/categorize" class="card-link">
        <div class="card">
          <img src="../image/3D长城.jpg" alt="建筑细则" />
          <h5>建筑细则</h5>
          <p>本版面聚焦中国古代四类建筑，通过分类图谱、材料占比图与桑基图，系统解析其分类体系、材料构成与营造技术脉络。 &emsp;&emsp;&emsp;</p>
        </div>
      </router-link>


      <router-link to="/culture" class="card-link">
        <div class="card">
          <img src="../image/3D天坛.jpg" alt="建筑与礼制" />
          <h5>建筑与礼制</h5>
          <p>本版面以建筑与礼制为核心，通过屋顶等级金字塔、屋顶解析、八大流派手风琴与出现时间轴，系统呈现中国古建筑的等级制度与地域文化。</p>
        </div>
      </router-link>


      <router-link to="/future" class="card-link">
        <div class="card">
          <img src="../image/3D卷轴.png" alt="建筑历史演变" />
          <h5>古建保护及展望</h5>
          <p>本版面通过可视化我国文物保护现状，以及通过三种预测模型预测未来十年文保资金预算趋势，完整呈现古建保护的现状与发展展望。</p>
        </div>
      </router-link>
    </div>
  </div>

  <div class="bottom section" id="last">
    <!-- From Uiverse.io by jaykdoe -->
    <div class="container">
      <div id="stars"></div>
      <h6 class="first">榫卯咬合，凝结着古人的智慧匠心。</h6>
      <h6 class="second">每一座古建，都是在大地上书写的立体诗篇。</h6>
      <h6 class="third">古建是时间的容器，装得下整个王朝,每一块砖石，都是民族文化的基因片段。</h6>
      <h6 class="forth">一座古桥，连接的不仅是水陆，更是人心。</h6>
      <h6 class="sixth">檐下春秋，墙上山河。</h6>
      <h6 class="fifth">飞檐翘角，藏着东方千年的审美韵律。</h6>
      <h6 class="sixth1">木石藏史，岁月留声。</h6>
      <h6 class="seventh">宫殿城阙，象征着家国天下的宏大秩序。青砖黛瓦，诉说着岁月的沉静力量。</h6>
      <h6 class="eighth">古建是文化的纪念碑，无需碑文也自有史诗。</h6>
      <h6 class="ninth">一檐藏古今，一院纳天地。</h6>
      <h6 class="tenth">一檐一角见风骨，一庭一院藏乾坤。</h6>
      <div id="stars2"></div>
      <div id="stars3"></div>
    </div>
  </div>
</template>

<script setup>
import '@/assets/base.css'
import { ref, onMounted, onUnmounted } from 'vue'


// 获取波浪元素
const pictureRef = ref(null)
const leftImgRef = ref(null)
const rightImgRef = ref(null)


// 节流函数，优化滚动性能
function throttle(fn, delay = 16) {
  let timer = null
  return function (...args) {
    if (timer) return
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
}


// 滚动处理函数
const handleScroll = throttle(() => {
  // 确保 DOM 存在再执行
  if (!pictureRef.value || !leftImgRef.value || !rightImgRef.value) return

  // 获取滚动距离
  const scrollY = window.scrollY;
  // 封面高度
  const coverHeight = pictureRef.value.offsetHeight;

  // 响应式核心：屏幕越小，位移幅度越小，避免移出可视区域
  const screenScale = Math.min(1, window.innerWidth / 1920)
  // 当滚动距离超过封面高度的1%时，开始触发波浪动画
  if (scrollY > coverHeight * 0.01) {
    // 计算波浪移动的距离（X轴和Y轴同步）
    // moveDistance：移动基数，可调整倍数控制斜向角度
    const moveDistance = Math.min(scrollY - coverHeight * 0.1, coverHeight * 0.8);
    const moveX = moveDistance * 0.8 * screenScale
    const moveY = moveDistance * 0.6 * screenScale

    // 左侧波浪：向左（负X）+ 向下（正Y） 斜后退
    leftImgRef.value.style.transform = `translateX(-${moveX}px) translateY(${moveY}px)`;
    // 右侧波浪：向右（正X）+ 向下（正Y） 斜后退
    rightImgRef.value.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;

    // 可选：添加透明度渐变，让波浪退去时更自然
    const opacity = 1 - moveDistance / (coverHeight * 0.8)
    leftImgRef.value.style.opacity = opacity
    rightImgRef.value.style.opacity = opacity
  } else {
    // 滚动距离不足时，波浪复位
    leftImgRef.value.style.transform = 'translate(0,0)'
    rightImgRef.value.style.transform = 'translate(0,0)'
    leftImgRef.value.style.opacity = 1
    rightImgRef.value.style.opacity = 1
  }
});

// ========== 生命周期：挂载后再绑定事件 ==========
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // 初始化执行一次，避免刚进入页面状态不对
  handleScroll()
  // 窗口尺寸变化时重新计算
  window.addEventListener('resize', handleScroll)
});

// ========== 生命周期：组件销毁时移除监听，防止内存泄漏 ==========
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleScroll)
});

</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
}


.section {
  width: 100%;
}

.top {
  position: relative;
  width: 100%;
  height: 828px;
  background-image: url('../image/3D故宫.png');
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.top::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, transparent 0%, #0a2a43 100%);
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(1px);
}


.title {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 100%;
  z-index: 10;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: clamp(16px, 3vh, 48px);
  /* 响应式间距，最小16px，最大48px */
}

/* 重置默认边距，收紧行高 */
h1,
h2 {
  margin: 0;
  line-height: 1.2;
}

h1 {
  font-family: "SimSun", "FangSong", serif;
  font-weight: 900;
  font-size: clamp(36px, 8vw, 120px);
  color: beige;
}

h2 {
  font-family: "SimSun", "FangSong", serif;
  font-size: clamp(22px, 4vw, 60px);
  color: beige;
}

/* 同一个位置的容器 */
#chart {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 600px;
  z-index: 5;
}


.picture {
  position: fixed;
  width: 100%;
  height: 900px;
  display: flex;
  float: left;
  z-index: 6;
  animation: waveMove 10s linear infinite;
}

.picture img#left {
  width: 96%;
  height: 80%;
  margin-top: -710px;
  object-fit: contain;
  transform-origin: bottom left;
  transition: all 0.6s ease;
  opacity: 1;
}

.picture img#right {
  width: 98%;
  height: 90%;
  margin-top: -780px;
  margin-left: -365px;
  object-fit: contain;
  transform-origin: bottom right;
  transition: all 0.6s ease;
  opacity: 1;
}

@keyframes waveMove {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 1000px 0;
  }
}

/* 视口小于1493px时，取消波浪效果 */
@media (max-width: 1492px) {
  .picture {
    /* 直接隐藏波浪容器 */
    display: none;
  }
}

/* ========== 中间内容区 ========== */
.middle {
  position: relative;
  width: 100%;
  height: auto;
  /* 响应式最小高度：大屏保留呼吸感，小屏自动收缩 */
  min-height: clamp(520px, 78vh, 828px);
  padding-bottom: 60px;
  background: #0a2a43;
  display: grid;
  grid-template-rows: auto auto;
  justify-content: center;
  /* 内容整体靠上，剩余空白留在容器底部 */
  align-content: start;
  /* 精准控制choice和卡片区的垂直间距，替代margin自动分配 */
  row-gap: 12px;
}

.choice {
  height: auto;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 20px 16px;
}

.choice h2 {
  margin: 0 0 8px 0;
  line-height: 1.2;
}

.choice h3 {
  font-size: clamp(16px, 1.5vw, 22px);
  margin: 0 0 16px 0;
  line-height: 1.8;
  color: rgb(212, 209, 206);
  font-family: "SimSun", "FangSong", serif;
}

.choice hr {
  margin: 0 0 16px 0;
}

/* 卡片展示区 */
.cards-section {
  width: 100%;
  margin: 0 auto;
  height: auto;
  max-width: 1200px;
  flex-wrap: wrap;
  /* 核心：小屏自动换行 */
  display: flex;
  gap: 24px;
  justify-content: center;
}


.card {
  /* position: absolute; */
  border-radius: 5px;
  /* width: calc(25% - 18px); 桌面端一行4张 */
  width: 280px;
  height: auto;
  background: #fcfcfc;
  box-shadow: 0 2px 8px rgba(142, 228, 215, 0.89);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  transition: 0.5s;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 16px rgba(121, 99, 219, 0.87);
}

.card img {
  border-radius: 5px 5px 0px 0px;
  width: 100%;
  height: 200px;
  object-fit: cover;
}

p {
  width: 280px;
  padding: 10px 10px 20px 10px;
  color: rgb(16, 16, 16);
  font-size: 14px;
  line-height: 1.6;
}

h5 {
  color: black;
  font-size: 18px;
  margin: 15px 0px 0px 10px;
}

/* ========== 底部文案区 ========== */
.bottom {
  position: relative;
  width: 100%;
  min-height: 828px;
  background: #0a2a43;
  overflow: hidden;
  /* z-index: 10; */
}

.container{
  height: 100%;
  width: 100%;
  background-color: #0a2a43;
  overflow: hidden;
  height: 828px;
  margin-bottom: 0px;
  position: relative;
}

h6 {
  position: absolute;
  line-height: 1.5;
  font-weight: normal;
  white-space: normal;
}

.first {
  font-family: "FangSong", "仿宋", "STFangsong", serif;
  font-size: clamp(20px, 2.5vw, 38px);
  color: rgba(250, 235, 215, 0.32);
  top: 60px;
  left: 40%;
  transform: none;
}

.second {
  font-family: "KaiTi", "楷体", "STKaiti", serif;
  font-size: clamp(28px, 3.5vw, 52px);
  color: antiquewhite;
  top: 120px;
  left: 17%;
}

.third {
  font-family: "SimSun", "宋体", "STSong", serif;
  font-size: clamp(16px, 2vw, 30px);
  color: rgba(250, 235, 215, 0.42);
  top: 200px;
  left: 80px;
  right: 40px;
  white-space: normal;
}

.forth {
  font-family: "SimSun", "宋体", "STSong", serif;
  font-size: clamp(24px, 3vw, 46px);
  color: rgba(250, 235, 215, 0.72);
  top: 260px;
  left: 35%;
}

.fifth {
  font-family: "FangSong", "仿宋", "STFangsong", serif;
  font-size: clamp(20px, 2.5vw, 38px);
  color: rgba(250, 235, 215, 0.32);
  top: 320px;
  left: 28%;
}

.sixth {
  font-family: "KaiTi", "楷体", "STKaiti", serif;
  font-size: clamp(36px, 4.5vw, 64px);
  color: antiquewhite;
  top: 380px;
  left: 150px;
}

.sixth1 {
  font-family: "KaiTi", "楷体", "STKaiti", serif;
  font-size: clamp(28px, 3.5vw, 52px);
  color: antiquewhite;
  top: 390px;
  left: 62%;
}

.seventh {
  font-family: "FangSong", "仿宋", "STFangsong", serif;
  font-size: clamp(20px, 2.5vw, 38px);
  color: rgba(250, 235, 215, 0.45);
  top: 480px;
  left: 80px;
  right: 40px;
  /* white-space: normal; */
}

.eighth {
  font-family: "SimSun", "宋体", "STSong", serif;
  font-size: clamp(28px, 3.5vw, 52px);
  color: antiquewhite;
  top: 550px;
  left: 15%;
  width: 80%;
}

.ninth {
  font-family: "FangSong", "仿宋", "STFangsong", serif;
  font-size: clamp(22px, 2.5vw, 40px);
  color: rgba(250, 235, 215, 0.32);
  top: 660px;
  left: 130px;
}

.tenth {
  font-family: "KaiTi", "楷体", "STKaiti", serif;
  font-size: clamp(24px, 3vw, 42px);
  color: rgba(250, 235, 215, 0.82);
  top: 650px;
  right: 80px;
}

/* ========== 平板端适配（768px ~ 1200px） ========== */
@media (max-width: 1200px) {
  .middle {
    row-gap: 8px;
  }

  .choice {
    padding-top: 28px;
  }
}

/* ========== 移动端适配（<768px） ========== */
@media (max-width: 768px) {
  .top {
    height: 80vh;
    min-height: 500px;
  }

  .title {
    gap: 12px;
  }

  .picture {
    display: none;
  }

  .card {
    width: 100%;
    /* 一行1张卡片 */
    width: 360px;
  }

  .choice {
    padding-top: 40px;
  }

  .middle {
    min-height: auto;
    padding-bottom: 60px;
  }

  /* 底部文案改为流式排布，避免重叠 */
  .bottom {
    min-height: auto;
    padding: 40px 0;
  }

  h6 {
    position: relative;
    top: auto !important;
    left: auto !important;
    right: auto !important;
    bottom: auto !important;
    width: 100% !important;
    margin-bottom: 20px;
    text-align: center;
  }
}

@media (max-width: 1200px) {
  .middle {
    row-gap: 8px;
  }

  .choice {
    padding-top: 28px;


  }
}
</style>