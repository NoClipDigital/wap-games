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
        x: 0.5,
        y: 0.5
      },
      velocity: {
        x: 0.01,
        y: 0.01 * 0.5625
      },
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

        if (newPositionx >= 1 || newPositionx <= 0) {
          this.velocity.x *= -1
        };
        // Remove after testing because it will never bounce off the short ends.
        if (newPositiony >= 0.95 || newPositiony <= 0.05) {
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
      let left = this.position.x * 100 + '%';
      let top = this.position.y * 100 + '%';

      return {
        left, top
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
    height: 20px;
    width: 20px;
    background-color: red;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
</style>
