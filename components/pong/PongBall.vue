<template lang="html">
<div class="ball" :style="ballStyles">

</div>
</template>

<script>
import anime from 'animejs'

export default {
  name: "PongBall",
  data() {
    return {
      position: {
        x: 0.3,
        y: 0.5
      },
      velocity: {
        x: 0.005,
        y: 0.005 * 0.5625
      },
      wall: {
        top: 0.9,
        right: 0.96,
        bottom: 0.1,
        left: 0.04
      }
    }
  },
  props: {
    //  player: ;
  },
  methods: {
    // Ball Logic.
    shouldIBounce() {
      return false;
    },
    step(timestamp) {
      // doMaths();
      // console.log('timestamp',timestamp)
      // if (!complete) {
      let newPositionx =
        this.position.x + this.velocity.x;
      let newPositiony =
        this.position.y + this.velocity.y;
      // If ball hits long walls, change direction.
      if (newPositionx >= this.wall.right || newPositionx <= this.wall.left) {
        this.velocity.x *= -1
      };
      // Remove after testing because it will never bounce off the short ends.
      if (newPositiony >= this.wall.top || newPositiony <= this.wall.bottom) {
        this.velocity.y *= -1
      };

      this.position.x = newPositionx;
      this.position.y = newPositiony;
      window.requestAnimationFrame(this.step);
      // }
    }
  },
  computed: {
    ballStyles() {
      let left = this.position.x * 100 + 'vw';
      let top = this.position.y * 100 + 'vh';

      return {
        left,
        top
      }
    }
  },
  mounted() {
    window.requestAnimationFrame(this.step);
  }
}
</script>

<style lang="scss" scoped>
.ball {
    /* Dimensions in same units as paddle */
    height: 4vh;
    width: 4vh;
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 50%;
}
</style>
