<template lang="html">
<div class="mixer" :style="mixerStyles" @mousemove="trackMove" @touchmove="trackMove">

  <div class="knob" :style="knobStyles"/>
  {{sliderVal}}
</div>
</template>

<script>
import anime from 'animejs'

export default {
  name: "Mixer",
  data() {
    return {
      mixerHeight: 150,
      sliderVal: 0.5
    }
  },
  computed: {
    mixerStyles() {
      return {
        height: this.mixerHeight + 'px'
      }
    },
    knobStyles() {
      return {
        bottom: 100 * this.sliderVal + '%'
      }
    }
  },
  methods: {
    trackMove(e) {

      let y = e.touches ? e.touches[0].clientY : e.clientY;
      let offsetY = e.touches ? e.touches[0].target.offsetTop : e.target.offsetTop;

      // The Y position of your cursor over the element
      let yCoord = y - offsetY;

      let limitedVal = Math.max(Math.min(yCoord, this.mixerHeight), 0);

      this.sliderVal = 1 - (limitedVal / this.mixerHeight);
    }
  }
}
</script>

<style lang="scss" scoped>
.mixer {
    background-color: grey;
    height: 150px;
    width: 10%;
    position: relative;
}

.knob {
    background-color: #eee;
    border-radius: 3px;
    height: 10px;
    pointer-events: none;
    position: absolute;
    transform: translateY(50%);
    width: 20px;
}
</style>
