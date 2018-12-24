<template lang="html">
<div class="slider-results">
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

  <div class="banner">
    <div class="winner-message">
        <img :src="playerImg(winner.letter)" />
        <h2>{{winner.message}}</h2>
    </div>
  </div>

</div>
</template>

<script>
import anime from 'animejs'

export default {
  name: "SliderResults",

  methods: {
    playerImg(letter) {
      return require(`@/assets/${this.players[letter].character}.png`);
    }
  },

  computed: {
    aWins() {
      return this.scores.a <= this.scores.b;
    },
    players() {
      return this.$store.state.players
    },
    winner() {
      let letter = this.aWins ? 'a' : 'b';
      return {
        letter,
        message: this.players[letter].character + ' wins!'
      }
    }
  },
  mounted() {
    this.$store.commit('players/addScore', this.winner.letter);
  },

  props: {
    scores: Object
  },
}
</script>

<style lang="scss">
.slider-results {
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


.banner {
    background-color: #f9bf62;
    position: absolute;
    width: 100%;
    height: 10vh;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
}

.winner-message {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;

  img {
    height: 8vh;
    display: inline-block;
  }
}

</style>
