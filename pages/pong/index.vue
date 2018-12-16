<template>
<div class="pong-game">
  <PongPaddle :paddlePosition="paddles.a" paddle-id="a" class="playerA" @change="setPaddlePosition" />
  <PongBall :position="ball.position" :velocity="ball.velocity" :paddles="paddles" @reset="resetBall"/>
  <PongPaddle :paddlePosition="paddles.b" paddle-id="b" class="playerB" @change="setPaddlePosition" />
</div>
</template>

<script>
export default {
  name: "PongGame",
  components: {
    PongPaddle: () => import('~/components/pong/PongPaddle.vue'),
    PongBall: () => import('~/components/pong/PongBall.vue')
  },
  data() {
    return {
      paddles: {
        a: 50,
        b: 50
      },
      ball: {
        position: {
          x: 0.3,
          y: 0.5
        },
        velocity: {
          x: 0.005,
          y: 0.005 * 0.5625
        }
      }
    }
  },
  methods: {
    setPaddlePosition({
      id,
      val
    }) {
      this.paddles[id] = val;
    },
    resetBall({position}) {
      if (position.y <= 0) {
        console.log("Point for Player A!");
        this.initBall();
      } else if (position.y >= 1) {
        console.log("Point for Player B!");
        this.initBall();
      }
    },
    initBall() {
      this.ball.position.x = 0.3;
      this.ball.position.y = 0.5;
      this.ball.velocity.x = 0.005;
      this.ball.velocity.y = 0.005 * 0.5625;
    }
  }
}
</script>

<style>
body {
  background-color: white;
}

.playerA {
  position: absolute;
  top: 0;
}

.playerB {
  position: absolute;
  bottom: 0;
}
</style>
