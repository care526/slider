<template>
  <div class="main">
    <div class="btns">
      <van-button
        :disabled="isStart"
        class="transform"
        type="primary"
        @click="start"
        >开始</van-button
      >
      {{ boom }}
      <van-button class="transform" plain type="primary" @click="reset"
        >重置</van-button
      >
    </div>
    <van-slider
      v-model="range"
      range
      vertical
      :min="min"
      :max="max"
      :active-color="activeColor"
      bar-height="14px"
      button-size="50px"
      :disabled="!isStart || isOver"
      @input="onInput"
      @change="onChange"
    />
    <div class="value">
      <span class="transform">{{ range[0] }}</span>
      <span class="transform title">数字💣</span>
      <span class="transform">{{ range[1] }}</span>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";

export default {
  data() {
    return {
      boom: -1,
      isStart: false,
      isOver: false,
      range: [0, 100],
      min: 0,
      max: 100,
      activeColor: "#1989fa",
    };
  },
  methods: {
    randomNum(minNum, maxNum) {
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
    },
    start() {
      this.isStart = true;
      this.boom = this.randomNum(30, 70);
    },
    reset() {
      this.boom = -1;
      this.isStart = false;
      this.isOver = false;
      this.range = [0, 100];
      this.min = 0;
      this.max = 100;
      this.activeColor = "#1989fa";
    },
    onInput() {
      const [min, max] = this.range;

      this.activeColor = "#1989fa";
      if (max - min < 60) {
        this.activeColor = "#ffc069";
      }
      if (max - min < 45) {
        this.activeColor = "#ff9c6e";
      }
      if (max - min < 30) {
        this.activeColor = "#ff4d4f";
      }
      if (max - min < 15) {
        this.activeColor = "#cf1322";
      }
    },
    onChange() {
      const [min, max] = this.range;
      if (min >= this.boom || max <= this.boom) {
        Dialog.alert({ title: "boom，爆炸点是" + this.boom });
        this.isOver = true;
        return;
      }
      if (max - min < 30) {
        this.activeColor = "#ff4d4f";
        let timer = setTimeout(() => {
          [this.min, this.max] = this.range.map((value, index) => {
            if (index === 0) return value - 10 <= 0 ? 0 : value - 8;
            if (index === 1) return value + 10 >= 100 ? 100 : value + 8;
          });
          clearTimeout(timer);
          timer = null;
        }, 160);
      }
    },
  },
};
</script>

<style>
.main {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 100vh;
  padding: 50px;
}
.btns {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 80vh;
}
.value {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-size: 40px;
  height: 80vh;
}
.transform {
  transform: rotateZ(90deg);
}
.title {
  font-size: 24px;
}
</style>
