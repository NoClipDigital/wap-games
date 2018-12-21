<template lang="html">
<div class="pong-results">
  <div class="top-results result-half">
    <span class="score">Accuracy: {{Math.round(100 - scores.a)}}%</span>
    <span class="win-lose" v-if="aWins">You win!</span>
    <span class="win-lose" v-else>You lose...</span>
  </div>
  <div class="bottom-results result-half">
    <span class="score">Accuracy: {{Math.round(100 - scores.b)}}%</span>
    <span class="win-lose" v-if="!aWins">You win!</span>
    <span class="win-lose" v-else>You lose...</span>
  </div>

</div>
</template>

<script>
import anime from 'animejs'

export default {
  name: "PongResults",
  data() {
    return {

    }
  },


  computed: {
    aWins() {
      return this.scores.a <= this.scores.b;
    }
  },
  mounted() {

  },
  props: {
    scores: Object
  },
}
</script>

<style lang="scss">
.pong-results {
    background-color: rgba(#57bcc6, 0.85);
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 5;
}

.result-half {
    align-items: space-around;
    color: white;
    display: flex;
    flex-direction: column;
    height: 50%;
    justify-content: center;
    position: absolute;
    text-align: center;
    width: 100%;
}

.score {
    font-size: 7vh;
}

.win-lose {
  color: #f9bf62;
    font-size: 10vh;
    font-weight: bold;
}

.top-results {
    transform: rotate(180deg);
    top: 0;
}

.bottom-results {
    bottom: 0;
}
</style>
