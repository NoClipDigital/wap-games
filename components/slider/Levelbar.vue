<template lang="html">
<div class="levelbar">
  <div class="led" v-for="led of ledCount" :style="ledStyles" />

</div>
</template>

<script>
import anime from 'animejs'

export default {
  name: "Mixer",
  data() {
    return {
      ledCount: 30,
      val: 0.4
    }
  },
  methods: {
    ledStyles(i) {

      let isLit = i / this.ledCount >= val;

      return {
        opacity: isLit ? 1 : 0.3
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.levelbar {
  background-color: black;
}

.led {
  background-color: lime;
  width: 5px;
  height: 5px;
  margin-right: 1px;
  display: inline-block;
}

</style>
