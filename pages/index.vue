<template>
<section class="container">
  <div class="logo-wrap">
    <img class="wap-logo" src="@/assets/wap-logo.png" />
    <h2>Podcasting Triathlon</h2>
  </div>
  <div class="btn-wrap">
    <nuxt-link to="/character-selection">
    <UiButton class="start-btn">Start</UiButton>
    </nuxt-link>
    <UiButton>Enable Fullscreen</UiButton>

  </div>
</section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo,
    UiButton: () =>
      import ('~/components/UiButton.vue')

  },
  methods: {
    enableFullscreen() {
      var doc = window.document;
      var docEl = doc.documentElement;

      var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
      var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

      if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
      } else {
        cancelFullScreen.call(doc);
      }
    }
  },
  mounted() {
    
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
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
}

.btn-wrap {
  display: flex;
  flex-direction: column;
}

.start-btn {
  margin-bottom: 10px;
}

.wap-logo {
  max-width: 80%;
}

h2 {
  text-transform: capitalize;
}

</style>
