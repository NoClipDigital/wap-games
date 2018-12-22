<template>
<div class="game-selection">
  <h2>Select a game:</h2>
  <div class="btn-wrap">
    <nuxt-link to="pong">
      <UiButton class="game-btn">Podcast Pong</UiButton>
    </nuxt-link>
    <nuxt-link to="slider">
      <UiButton class="game-btn">Slider Rider</UiButton>
    </nuxt-link>
    <nuxt-link to="fruit">
      <UiButton class="game-btn">Low Hanging Fruit</UiButton>
    </nuxt-link>
  </div>
</div>
</template>

<script>
export default {
  name: "GameSelect",
  data() {
    return {

    }
  },
  components: {
    UiButton: () =>
      import ('@/components/UiButton')
  }
}
</script>

<style lang="scss" scoped>
h2 {
    color: white;
}

.game-btn {
  margin-bottom: 10px;
}

.btn-wrap {
    display: flex;
    flex-direction: column;
}
</style>
