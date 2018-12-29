<template>
<div class="game-wrap" :style="{height: windowHeight + 'px'}">
  <nuxt/>
</div>
</template>

<script>
import {
  enableFullscreen
} from '@/assets/js/fullscreen.js'

import {
  isIOS
} from 'mobile-device-detect';


export default {
  data() {
    return {
      windowHeight: 0,
      isIOS: isIOS
    }
  },
  methods: {
    enterFullscreen() {
      enableFullscreen();
    }
  },

  mounted() {

    window.addEventListener('touchmove', function(event) {

      if (event.scale && event.scale !== 1) {
        event.preventDefault();
      }


    }, false);

    setInterval(() => {
      this.windowHeight = window.innerHeight
    }, 1000);

    this.windowHeight = window.innerHeight

  }
}
</script>

<style lang="scss">
* {
    user-select: none;
}

html {
    font-size: 22px;
    font-family: 'Amatic SC', cursive;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    overflow: hidden;
    -webkit-overflow-scrolling: auto;

}

h2 {
    color: white;
    font-size: 50px;
    text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.1);

    @media (max-width: 600px) {
        font-size: 13vw;
    }
}

body {
    overflow: hidden;
    -webkit-overflow-scrolling: auto;
}

* {
    touch-action: none;
}

.fullscreen {
    overflow: hidden;
    -webkit-overflow-scrolling: auto;

    position: fixed;
    z-index: 2;
    width: 30px;
    height: 30px;
    background-image: url("~assets/fullscreen.svg");
    background-size: cover;
    background-color: transparent;
    border: 0;
    padding: 0;
    bottom: 0;
    left: 0;
}

.game-wrap {
    height: 85vh;
    overflow: hidden;
    position: fixed;
    width: 100vw;
    left: 50%;
    transform: translateX(-50%);
    overflow: hidden;
    max-width: 70vh;
    background-color: #57bcc6;

}

*,
*:after,
*:before {
    box-sizing: border-box;
    margin: 0;
}
</style>
