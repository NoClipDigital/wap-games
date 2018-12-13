<template>
<div class="pong-game">
  <PongPaddle />
</div>
</template>

<script>

export default {
  name: "PongGame",
  components: {
    PongPaddle: () => import('~/components/pong/PongPaddle.vue')
  },
}

</script>

<style>
body {
  background-color: white;
}

</style>
