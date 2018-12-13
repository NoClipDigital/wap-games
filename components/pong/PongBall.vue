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
  methods: {},
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
    background-color: white;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
</style>
