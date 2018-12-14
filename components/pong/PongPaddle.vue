<template lang="html">
<div class="hit-box" :style="hitBoxStyles" @mousemove="trackMove" @touchmove="trackMove">
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
        paddleVal: 50,
        screenWidth: window.innerWidth
      }
    },
  props: {
  //  player: ;
  },
  methods: {
    trackMove(e) {

      let x = e.touches ? e.touches[0].clientX : e.clientX;
      let offsetX =
        e.touches ? e.touches[0].target.offsetLeft : e.target.offsetLeft;

      // The X position of your cursor over the element
      let xCoord = x - offsetX;
      // Convert pixel to percentage
      xCoord = (xCoord / this.screenWidth) * 100;

      this.paddleVal = xCoord;
    }
  },
  computed: {
    paddleStyles() {
      return {
        left: this.paddleVal + '%'
      }
    },
    hitBoxStyles() {
      return {
        width: 100 + '%'
      }
    }
  },
}
</script>

<style lang="scss">
.pong-paddle {
    height: 4vh;
    width: 30vw;
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    pointer-events: none;
    transform: translate(-50%,-50%);
}
.hit-box {
    height: 12vh;
    width: 100%;
    // background-color: grey;
    position: absolute;
    top: 0%;
    left: 0%;
}
</style>
