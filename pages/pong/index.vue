<template>
<div class="pong-game">
  <PongPaddle :paddlePosition="paddles.a" paddle-id="a" class="playerA" @change="setPaddlePosition" />
  <PongBall :paddles="paddles" @score="recordScore"/>
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
    recordScore({position}) {
      if (position.y <= 0) {
        console.log("Point for Player A!");
      } else if (position.y >= 1) {
        console.log("Point for Player B!");
      }
    },
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
