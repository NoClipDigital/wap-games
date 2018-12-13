<template lang="html">
<div class="ball">

</div>
</template>

<script>
import anime from 'animejs'

export default {
  name: "PongBall",
  data() {
    return {

      }
    },
  props: {
  //  player: ;
  },
  methods: {
    // Ball Logic.
  },
  computed: {
    paddleStyles() {
      return {left:'90%'}
    }
  },
}
</script>

<style lang="scss" scoped>
.ball {
    height: 20px;
    width: 20px;
    background-color: red;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
</style>
