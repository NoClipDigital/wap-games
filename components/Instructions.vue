<template lang="html">
<div class="instructions">

  <div class="top-half half">
    <slot />
  </div>

  <div class="bottom-half half">
    <slot />
  </div>

  <div class="banner">
    <UiButton @click.native="$emit('start')">Start</UiButton>
  </div>

</div>
</template>

<script>
export default {
  name: "Instructions",
  components: {
    UiButton: () =>
      import ('~/components/UiButton.vue')
  }

}
</script>

<style lang="scss" scoped>

.instructions {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 5;
}

.half {
    position: absolute;
    width: 100%;
    height: 50%;
    background-color: rgba(#57bcc6, 0.8);
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    font-weight: bold;
    padding: 10%;
    text-align: center;
}

.banner {
    position: absolute;
    top: 50%;
    width: 100%;
    transform: translateY(-50%);
    text-align: center;
}

.top-half {
    top: 0;
    transform: rotate(180deg);
}

.bottom-half {
    bottom: 0;
}
</style>
