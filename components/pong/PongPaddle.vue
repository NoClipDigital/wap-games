<template lang="html">
<div class="pong-paddle" :style="paddleStyles">

</div>
</template>

<script>
import anime from 'animejs'

export default {
  name: "PongPaddle",
  data() {
    return {

      }
    },
  props: {
  //  player: ;
  },
  methods: {},
  computed: {
    paddleStyles() {
      return {left:'90%'}
    }
  },
}
</script>

<style lang="scss">
.pong-paddle {
    height: 20px;
    width: 200px;
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
</style>
