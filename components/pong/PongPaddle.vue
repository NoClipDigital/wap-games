<template lang="html">
<div class="hit-box">
  <div class="pong-paddle" :style="paddleStyles">
  </div>
</div>
</template>

<script>
import anime from 'animejs'

export default {
  name: "PongPaddle",
  data() {
    return {
        hitBox: 150,
      }
    },
  props: {
  //  player: ;
  },
  methods: {
    trackMove(e) {

      let x = e.touches ? e.touches[0].clientX : e.clientX;
      let offsetX = e.touches ? e.touches[0].target.offsetLeft : e.target.offsetLeft;

      // The X position of your cursor over the element
      let xCoord = x - offsetX;

      let limitedVal = Math.max(Math.min(xCoord, this.hitBoxWidth), 0);

      this.sliderVal = 1 - (limitedVal / this.hitBoxWidth);
    }
  },
  computed: {
    paddleStyles() {
      return {
        left:100 * this.sliderVal + '%'
      }
    },
    hitBoxStyles() {
      return {
        height: this.hitBoxWidth + 'px'
      }
    }
  },
}
</script>

<style lang="scss">
.pong-paddle {
    height: 20px;
    width: 100px;
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.hit-box {
    height: 60px;
    width: 100%;
    background-color: grey;
    position: absolute;
    top: 0%;
    left: 50%;
    transform: translate(-50%,0);
}
</style>
