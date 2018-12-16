<template>
<div class="pong-game">
  <PongPaddle :paddlePostion="paddles.a" paddle-id="a" class="playerA" />
  <PongBall />
  <PongPaddle :paddlePostion="paddles.b" paddle-id="b" class="playerB" @change="setPaddlePosition"/>
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
    setPaddlePosition({id,xCoord}) {
      console.log(id,xCoord)
      this.paddles[id] = xCoord;
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
