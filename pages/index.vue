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
    <UiButton v-if="!isIOS" @click.native="enterFullscreen">Enable Fullscreen</UiButton>

  </div>
</section>
</template>

<script>
import { isIOS } from 'mobile-device-detect';

import Logo from '~/components/Logo.vue'
import {
  enableFullscreen
} from '@/assets/js/fullscreen.js'

export default {
  data() {
    return {
      isIOS: isIOS
    }
  },
  components: {
    Logo,
    UiButton: () =>
      import ('~/components/UiButton.vue')

  },
  methods: {
    enterFullscreen() {
      enableFullscreen();
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
