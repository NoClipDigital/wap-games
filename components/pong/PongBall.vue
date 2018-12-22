<template lang="html">
<div v-if="playing" class="ball" :style="ballStyles">
</div>

</template>

<script>
import anime from 'animejs'

export default {
  name: "PongBall",
  data() {
    return {
      gameOver: false,
      position: {
        x: 0.3,
        y: 0.5
      },
      velocity: {
        x: 0.005,
        y: 0.005 * 0.5625
      },
      wall: {
        top: 1,
        right: 0.96,
        bottom: 0,
        left: 0.04
      },
      paddleY: {
        a: 0.1,
        b: 0.9
      },
      screenWidth: window.innerWidth
    }
  },
  props: {
    playing: true,
    paddles: {
      type: Object,
      default: function() {
        return {
          a: 0.5,
          b: 0.5
        }
      }
    }
  },
  methods: {
    // Ball Logic.
    step(timestamp) {
      // doMaths();
      // console.log('timestamp',timestamp)
      // if (!complete) {
      let newPositionx = this.position.x + this.velocity.x;
      let newPositiony = this.position.y + this.velocity.y;
      // If ball hits long walls, change direction.
      if (newPositionx >= this.wall.right) {
        newPositionx = this.wall.right;
        this.velocity.x *= -1;
      };
      if (newPositionx <= this.wall.left) {
        newPositionx <= this.wall.left;
        this.velocity.x *= -1;
      };
      // Paddle interaction bounce logic
      let iHitPaddle = ((newPositiony <= this.paddleY.a && newPositiony >= this.paddleY.a - 0.04) && (newPositionx > this.paddles.a - 0.17 && newPositionx < this.paddles.a + 0.17)) ||
        ((newPositiony > this.paddleY.b && newPositiony < this.paddleY.b + 0.04) && (newPositionx > this.paddles.b - 0.17 && newPositionx < this.paddles.b + 0.17));

      if (iHitPaddle && newPositiony <= this.paddleY.a) {
        newPositiony = this.paddleY.a;
        let sign = Math.sign(this.velocity.y);
        let value = Math.abs(this.velocity.y) + 0.001;
        this.velocity.y = -1 * value * sign;
      };

      if (iHitPaddle && newPositiony >= this.paddleY.b) {
        newPositiony = this.paddleY.b;
        let sign = Math.sign(this.velocity.y);
        let value = Math.abs(this.velocity.y) + 0.001;
        this.velocity.y = -1 * value * sign;
      };

      //  Check if the ball is off the screen and tell my Mom.
      if (this.position.y >= this.wall.top || this.position.y <= this.wall.bottom) {
        this.$emit('score', {
          position: this.position
        });
        this.resetBall();
      };

      if (!this.playing) {
        this.gameOver = true;
      }

      if (!this.gameOver) {
        this.position.x = newPositionx;
        this.position.y = newPositiony;
        window.requestAnimationFrame(this.step);
      }
    },
    resetBall() {
      this.position.x = this.getRandom(0.4, 0.6);
      this.position.y = 0.5;
      this.velocity.x = this.getRandom(0.005, 0.01);
      this.velocity.y = this.velocity.x - 0.015;
      this.gameOver = true;

      //  Randomly pick where to chuck the ball
      Math.random() < 0.5 ? this.velocity.y : this.velocity.y *= -1;
      Math.random() < 0.5 ? this.velocity.x : this.velocity.x *= -1;

      setTimeout(() => {
        this.gameOver = false;
        window.requestAnimationFrame(this.step);
      }, 100);
    },
    getRandom(max, min) {
      return Math.random() * (max - min) + min;
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
    this.resetBall();
    this.request = window.requestAnimationFrame(this.step);
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
}
</style>
