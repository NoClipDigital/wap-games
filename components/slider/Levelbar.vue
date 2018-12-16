<template lang="html">
<div class="levelbar">
  <div class="led-wrap" :style="barStyles()">
  <div class="led" v-for="led of ledCount" :style="ledStyles(led)" />
</div>
</div>
</template>

<script>
import anime from 'animejs'

export default {
  name: "Levelbar",
  data() {
    return {
      ledCount: 20,
      barHeight: 200,
      barWidth: 50,
      barGap: 5
    }
  },
  methods: {
    barStyles() {
      return {
        height: this.barHeight + 'px',
        width: this.barWidth + 'px'
      }
    },
    ledStyles(i) {

      i--;

      let isLit = i / this.ledCount < this.level;

      let color = 'lime';

      if (i >= 15) {
        color = 'red';
      } else if (i >= 10) {
        color = 'yellow'
      }

      let ledHeight = this.barHeight / this.ledCount;

      return {
        height: (ledHeight - this.barGap) + 'px',
        bottom: i * ledHeight + 'px',
        opacity: isLit ? 0.9 : 0.3,
        backgroundColor: color
      }
    }
  },
  props: {
    level: Number
  }
}
</script>

<style lang="scss" scoped>
.levelbar {
    background-color: #333;
    overflow: hidden;
    padding: 10px;
    border-radius: 100px;
}

.led-wrap {
    overflow: hidden;
    border-radius: 100px;
    text-align: center;
    display: block;
    position: relative;
}

.led {
    background-color: lime;
    border-radius: 3px;
    display: inline-block;
    left: 0;
    position: absolute;
    transition: 0.1s opacity;
    width: 100%;
}
</style>
