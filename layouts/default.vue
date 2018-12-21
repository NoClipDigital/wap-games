<template>
<div class="game-wrap" :style="{height: windowHeight + 'px'}">
  <button class="fullscreen" @click="enableFullscreen">Fullscreen</button>
  <nuxt/>
</div>
</template>

<script>
export default {
  data() {
    return {
      windowHeight: 0
    }
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
    // Disable scrolling.
    document.ontouchmove = (e) => {
      e.preventDefault();
    }

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
    background-color: #57bcc6;
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
  font-size: 13vw;
  text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.1);
}

body {
  overflow: hidden;
  -webkit-overflow-scrolling: auto;
}

.fullscreen {
    position: absolute;
    z-index: 2;
}

.game-wrap {
    height: 85vh;
    overflow: hidden;
    position: absolute;
    width: 100vw;
    overflow: hidden;
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
