<template>
<div class="pong-game">
  <PongPaddle />
  <!-- <PongBall /> -->
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

</style>
