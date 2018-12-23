<template>
<div class="game-wrap" :style="{height: windowHeight + 'px'}">
  <!-- <button class="fullscreen" v-if="!isIOS" @click="enterFullscreen"></button> -->
  <nuxt/>
</div>
</template>

<script>
import {
  enableFullscreen
} from '@/assets/js/fullscreen.js'

import { isIOS } from 'mobile-device-detect';


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

    // Disable scrolling.
    document.ontouchmove = (e) => {
    }

    document.addEventListener('touchmove', function(event) {
      // event.preventDefault();
      //
      if (event.scale !== 1) {
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

.fullscreen {
    position: absolute;
    z-index: 2;
    width: 30px;
    height: 30px;
    background-image: url(~assets/fullscreen.svg);
    background-size: cover;
    background-color: transparent;
    border: 0;
    padding: 0
}

.game-wrap {
    height: 85vh;
    overflow: hidden;
    position: absolute;
    width: 100vw;
    left: 50%;
    transform: translateX(-50%);
    overflow: hidden;
    max-width: 60vh;
    background-color: #57bcc6;

}

*,
*:after,
*:before {
    box-sizing: border-box;
    margin: 0;
}

.button--green {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #3b8070;
    color: #3b8070;
    text-decoration: none;
    padding: 10px 30px;
}

.button--green:hover {
    color: #fff;
    background-color: #3b8070;
}

.button--grey {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #35495e;
    color: #35495e;
    text-decoration: none;
    padding: 10px 30px;
    margin-left: 15px;
}

.button--grey:hover {
    color: #fff;
    background-color: #35495e;
}
</style>
