<template>
<div class="slider-game">
  <levelbar />
  <waveform ref="waveform" />
  <mixer />
  <button @click="startGame">Start</button>
</div>
</template>

<script>

export default {
  name: "SliderGame",
  data() {
    return {

    }
  },
  components: {
    Waveform: () => import('~/components/slider/Waveform.vue'),
    Levelbar: () => import('~/components/slider/Levelbar.vue'),
    Mixer: () => import('~/components/slider/Mixer.vue')
  },
  methods: {
    startGame() {
      this.$refs.waveform.start();
    }
  }
}
</script>

<style>
body {
  background-color: white;
}

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
  'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
