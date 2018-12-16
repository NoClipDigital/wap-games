<template lang="html">
<div class="mixer" :style="mixerStyles" @mousemove="trackMove" @touchmove="trackMove">
  <div class="knob" :style="knobStyles"/>
</div>
</template>

<script>
import anime from 'animejs'

export default {
  name: "Mixer",
  data() {
    return {
      mixerHeight: 150,
      sliderVal: 0
    }
  },
  watch: {
    sliderVal() {
      this.$emit('change', {val: this.sliderVal, id: this.mixerId});
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



      let y = e.targetTouches ? e.targetTouches[0].clientY : e.clientY;
      const rect = e.target.getBoundingClientRect();

      let offsetY = rect.top;

      // The Y position of your cursor over the element
      let yCoord = y - offsetY;

      let limitedVal = Math.max(Math.min(yCoord, this.mixerHeight), 0);
      if(this.reverse) {
        this.sliderVal = (limitedVal / this.mixerHeight);
      }else {
        this.sliderVal = 1 - (limitedVal / this.mixerHeight);
      }
    }
  },
  props: {
    reverse: Boolean,
    mixerId: String
  }
}
</script>

<style lang="scss" scoped>
.mixer {
    background-color: grey;
    height: 150px;
    width: 20px;
    position: relative;
}

.knob {
    background-color: #eee;
    border-radius: 3px;
    height: 20px;
    left: 50%;
    pointer-events: none;
    position: absolute;
    transform: translate(-50%, 50%);
    width: 40px;
}
</style>
