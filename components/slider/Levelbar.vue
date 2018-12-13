<template lang="html">
<div class="levelbar">
  <div class="led" v-for="led of ledCount" :style="ledStyles(led)" />
</div>
</template>

<script>
import anime from 'animejs'

export default {
  name: "Levelbar",
  data() {
    return {
      ledCount: 30,
    }
  },
  methods: {
    ledStyles(i) {

      let isLit = i / this.ledCount <= this.level;

      let color = 'lime';

      if (i >= 25) {
        color = 'red';
      } else if (i >= 20) {
        color = 'yellow'
      }

      return {
        opacity: isLit ? 0.9 : 0.3,
        backgroundColor: color
      }
    }
  },
  props: {
    level: Number
  }
}
</script>

<style lang="scss" scoped>
.levelbar {
    background-color: black;
    color: white;
    display: flex;
    justify-content: space-between;

}

.led {
    background-color: lime;
    height: 5px;
    flex-grow: 1;
    margin: 1px;
    display: inline-block;
    transition: 0.1s opacity;
}
</style>
