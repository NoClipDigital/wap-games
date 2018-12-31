<template>
<div class="slider-game">

  <Instructions v-if="!playing" @start="startGame">
    <p>What does Richie love more than anything on this earth?</p>
    <p>Easy. A nice hot audio signal that never peaks.</p>
    <p>Use the slider to keep the audio levels as close to the centre as possible.</p>
  </Instructions>

  <SliderResults v-if="showResults" :scores="score" />

  <div class="top-half half">
    <levelbar :level="levelVal('a')" />
    <mixer @change="setMixerVal" mixer-id="a" :reverse="true" />
  </div>

  <waveform class="waveform" @complete="triggerResults" @update="setAudioVal" ref="waveform" />

  <div class="bottom-half half">
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

      playing: false,
      showResults: false,
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
      import ('~/components/slider/Mixer.vue'),
    SliderResults: () =>
      import ('~/components/slider/SliderResults.vue'),
    Instructions: () =>
      import ('~/components/Instructions.vue')

  },
  computed: {

  },
  methods: {

    levelVal(id) {
      // let difficulty = 0.1;
      // let multiplier = (this.mixerVal[id]) + (0.5 * (1 - difficulty));
      return this.audioVal * (this.mixerVal[id] * 2);
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
      this.playing = true;
      this.showResults = false;
      this.$refs.waveform.start();
      setTimeout(() => {
        this.resetVals();
      }, 10);
    },
    triggerResults() {
      this.showResults = true;
      setTimeout(() => {
        this.$router.push('/game-selection')
      }, 3000);
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
      this.delta[id] = Math.abs(this.levelVal(id) - 0.5);
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
    background-color: #f9bf62;
    border: 5px solid #333;
    font-family: 'Amatic SC', cursive;
    font-size: 30px;
    font-weight: bold;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
    width: 200px;

    &:active {
        background-color: #faddb3;
    }
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
