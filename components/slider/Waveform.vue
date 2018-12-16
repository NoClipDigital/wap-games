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
      animation: undefined,
      currentBar: 0,
      bars: [],
      progress: 0,
      config: {
        randomness: 0.9,
        noOfBars: 100,
        speed: 5,
        randomness: 0.5,
        barWidth: 8,
        barGap: 4
      }
    }
  },
  watch: {
    currentBar() {
      this.$emit('update', this.bars[this.currentBar]);
    }
  },
  methods: {

    start() {
      if(this.animation) {
        this.animation.pause();
      }

      this.resetVals();
      this.generateWave();
      this.processWave();
      this.startAnimation();
    },

    resetVals() {
      this.currentBar = 0;
      this.bars = [];
      this.progress = 0;
    },

    barStyles(bar, i) {
      //
      let progressOffset = (this.$el.offsetWidth) * (1 - this.progress);
      let widthOffset = this.waveWidth * -this.progress;
      let barOffset = (i * (this.config.barGap + this.config.barWidth));
      let leftPos = widthOffset + progressOffset + barOffset;
      let isHalfway = leftPos < (this.$el.offsetWidth / 2);

      if(isHalfway && i > this.currentBar) {
        this.currentBar = i;
      }

      return {
        backgroundColor: isHalfway ? 'yellow' : '#ddd',
        height: (100 * bar) + '%',
        left: leftPos + 'px',
        marginRight: this.config.barGap + 'px',
        top: '50%',
        transform: `translateY(-50%)`,
        width: this.config.barWidth + 'px'
      }
    },

    startAnimation() {
      this.animation = anime({
        targets: this,
        progress: 1,
        easing: 'linear',
        duration: 20 * 1000
      });

      this.animation.complete = () => {
        this.$emit('complete');
      };
    },

    generateWave() {
      let bars = [];

      for (var i = 0; i < this.config.noOfBars; i++) {
        bars.push(Math.random());
      }

      this.bars = bars;
    },

    processWave() {
      for (var i = 1; i < this.bars.length; i++) {
        let prev = this.bars[i - 1];
        let current = this.bars[i];

        let sine = 0.4 - Math.sin(i / 3);

        let newCurrent = (prev * (1 - this.config.randomness)) + (current * this.config.randomness);
        this.bars[i] = Math.min(Math.max(newCurrent + (sine * 0.2), 0), 1);

      }

    }
  },
  computed: {
    waveWidth() {
      return this.config.noOfBars * (this.config.barWidth + this.config.barGap);
    }
  },
  mounted() {

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
    border-radius: 30px;
}
</style>
