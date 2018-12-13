<template lang="html">
<div class="waveform">
  <div class="wave-container" :style="{width:  + 'px'}">
    <div class="bar" v-for="(bar, i) of bars" :style="barStyles(bar, i)"></div>
  </div>
</div>
</template>

<script>
import anime from 'animejs'

export default {
  name: "Waveform",
  data() {
    return {
      bars: [],
      progress: 0,
      config: {
        randomness: 1,
        noOfBars: 100,
        speed: 5,
        randomness: 0.5,
        barWidth: 5,
        barGap: 2
      }
    }
  },
  methods: {
    barStyles(bar, i) {
      //
      let progressOffset = (this.$el.offsetWidth) * (1 - this.progress);
      let widthOffset = this.waveWidth * -this.progress;
      let barOffset = (i * (this.config.barGap + this.config.barWidth));
      let leftPos = widthOffset + progressOffset + barOffset;
      let isHalfway = leftPos < (this.$el.offsetWidth / 2);

      return {
        backgroundColor: isHalfway ? 'yellow' : 'white',
        height: (100 * bar) + '%',
        left: leftPos + 'px',
        marginRight: this.config.barGap + 'px',
        top: '50%',
        transform: `translateY(-50%)`,
        width: this.config.barWidth + 'px'
      }

    },
    startAnimation() {
      var JSobject = anime({
        targets: this,
        progress: 1,
        easing: 'linear',
        duration: 20 * 1000
        // update: function() {
          // var el = document.querySelector('#JSobject pre');
          // el.innerHTML = JSON.stringify(obj);
        // }
      });
    },
    generateWave() {
      let bars = [];

      for (var i = 0; i < this.config.noOfBars; i++) {
        bars.push(Math.random());
      }

      this.bars = bars;
    },

    blurWave() {
      for (var i = 1; i < this.bars.length; i++) {
        let prev = this.bars[i - 1];
        let current = this.bars[i];

        this.bars[i] = (prev + (current * this.config.randomness)) / (this.config.randomness + 1);
      }
    }
  },
  computed: {
    waveWidth() {
      return this.config.noOfBars * (this.config.barWidth + this.config.barGap);
    }
  },
  mounted() {
    console.dir(this.$el);
    this.generateWave();
    this.blurWave();
    this.startAnimation();
  },
}
</script>

<style lang="scss">
.wave-container {
    height: 10vh;
    position: relative;
    white-space: nowrap;
}

.bar {
    background-color: white;
    position: absolute;
}
</style>
