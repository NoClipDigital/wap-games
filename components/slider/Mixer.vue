<template lang="html">
<div class="mixer" :style="mixerStyles" @mousemove="trackMove" @touchmove="trackMove">
  <div class="knob" :style="knobStyles"/>
  <div class="slider-slot" />
</div>
</template>

<script>
import anime from 'animejs'

export default {
  name: "Mixer",
  data() {
    return {
      mixerHeight: 200,
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
        bottom: (90 * this.sliderVal) + 5 + '%'
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
    height: 150px;
    width: 80px;
    position: relative;
}

.knob {

    background-color: #f9bf62;
    border-radius: 50px;
    border: 5px solid #333;
    height: 30px;
    left: 50%;
    pointer-events: none;
    position: absolute;
    transform: translate(-50%, 50%);
    width: 80px;
    z-index: 3;


    &:after {
      content: '';
      width: 30px;
      height: 10px;
      border-radius: 10px;
      position: absolute;
      top: 5px;
      left: 20px;
      background-color: #faddb3;
    }
}

.slider-slot {
  height: 100%;
  width: 20px;
  position: absolute;
  left: 50%;
  top: 50;
  background-color: #333;
  border-radius: 10px;
  transform: translateX(-50%);

}

</style>
