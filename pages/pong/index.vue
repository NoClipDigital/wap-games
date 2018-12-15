<template>
<div class="pong-game">
  <PongPaddle class="player1"/>
  <PongBall />
  <PongPaddle class="player2"/>
</div>
</template>

<script>

export default {
  name: "PongGame",
  components: {
    PongPaddle: () => import('~/components/pong/PongPaddle.vue'),
    PongBall: () => import('~/components/pong/PongBall.vue')
  },
}

</script>

<style>
body {
  background-color: white;
}
.player1 {
  position: absolute;
  top: 0;
}
.player2 {
  position: absolute;
  bottom: 0;
}
</style>
