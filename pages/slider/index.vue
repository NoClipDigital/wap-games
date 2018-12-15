<template>
<div class="slider-game">

  <div class="top-half half">
    <levelbar :level="levelVal('a')" />
    <mixer @change="setMixerVal" mixer-id="a" :reverse="true" /> Accuracy: {{ Math.floor(100 - score.a)}}%
  </div>

  <button class="start-btn" @click="startGame">Start</button>
  <waveform class="waveform" @update="setAudioVal" ref="waveform" />

  <div class="bottom-half half">
    Accuracy: {{ Math.floor(100 - score.b)}}%
    <levelbar :level="levelVal('b')" />
    <mixer @change="setMixerVal" mixer-id="b" />
  </div>

</div>
</template>

<script>
export default {
  name: "SliderGame",
  data() {
    return {
      mixerVal: {
        a: 0,
        b: 0
      },
      audioVal: 0,
      score: {
        a: 0,
        b: 0
      },
      delta: {
        a: 0,
        b: 0
      }
    }
  },
  components: {
    Waveform: () =>
      import ('~/components/slider/Waveform.vue'),
    Levelbar: () =>
      import ('~/components/slider/Levelbar.vue'),
    Mixer: () =>
      import ('~/components/slider/Mixer.vue')
  },
  computed: {

  },
  methods: {
    levelVal(id) {
      // let difficulty = 0.1;
      // let multiplier = (this.mixerVal[id]) + (0.5 * (1 - difficulty));
      return this.audioVal * (0.5 + this.mixerVal[id]);
    },
    resetVals() {
      this.mixerVal = {
        a: 0,
        b: 0
      };
      this.audioVal = 0;
      this.score = {
        a: 0,
        b: 0
      };
      this.delta = {
        a: 0,
        b: 0
      };
    },
    startGame() {
      this.$refs.waveform.start();
      setTimeout(() => {
        this.resetVals();
      }, 10);
    },
    setMixerVal({
      val,
      id
    }) {
      this.mixerVal[id] = val;
    },
    setAudioVal(val) {
      this.audioVal = val;
      this.setScore('a');
      this.setScore('b');
    },
    setScore(id) {
      this.delta[id] = (Math.abs(this.audioVal - (1 - this.mixerVal[id])));
      this.score[id] += this.delta[id];

    }
  }
}
</script>

<style lang="scss" scoped>
.waveform {
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
    height: 10vh;
    width: 100%;
}

.start-btn {
    z-index: 2;
    position: relative;
}

.half {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 40vh;
    position: absolute;
    width: 100%;
}

.bottom-half {
    bottom: 0;
}

.top-half {
    transform: rotate(180deg);
    top: 0;
}
</style>
