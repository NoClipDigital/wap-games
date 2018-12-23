<template>
<div class="game-selection">


  <div class="top-half half">
    <h2>Select a game:</h2>
    <div class="btn-wrap">
      <nuxt-link to="pong">
        <UiButton class="game-btn">Podcast Pong</UiButton>
      </nuxt-link>
      <nuxt-link to="slider">
        <UiButton class="game-btn">Slider Rider</UiButton>
      </nuxt-link>
      <nuxt-link to="fruit">
        <UiButton class="game-btn">Low Hanging Fruit</UiButton>
      </nuxt-link>
    </div>
  </div>

  <div class="score-banner">
    <div class="player-b-scores player-scores" v-if="players.b.character">
      <img :src="playerImg('b')" />
      <h2>{{players.b.score}}</h2>
    </div>

    <div class="player-a-scores player-scores" v-if="players.a.character">
      <img :src="playerImg('a')" />
      <h2>{{players.a.score}}</h2>
    </div>

  </div>

  <div class="bottom-half half">
    <h2>Select a game:</h2>
    <div class="btn-wrap">
      <nuxt-link to="pong">
        <UiButton class="game-btn">Podcast Pong</UiButton>
      </nuxt-link>
      <nuxt-link to="slider">
        <UiButton class="game-btn">Slider Rider</UiButton>
      </nuxt-link>
      <nuxt-link to="fruit">
        <UiButton class="game-btn">Low Hanging Fruit</UiButton>
      </nuxt-link>
    </div>
  </div>

</div>
</template>

<script>
export default {
  name: "GameSelect",
  data() {
    return {

    }
  },
  components: {
    UiButton: () =>
      import ('@/components/UiButton')
  },
  methods: {
    playerImg(letter) {
      return require(`@/assets/${this.players[letter].character}.png`);
    }
  },
  computed: {
    players() {
      return this.$store.state.players
    }
  }
}
</script>

<style lang="scss" scoped>
h2 {
    color: white;
}

.half {
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    height: 50%;
    position: absolute;
    width: 100%;
}

.top-half {
    transform: rotate(180deg);
}

.bottom-half {
    bottom: 0;
}

.game-btn {
    margin-bottom: 10px;
}

.btn-wrap {
    display: flex;
    flex-direction: column;
}

.score-banner {
    box-shadow: 1px 1px 10px rgba(0,0,0,0.4);
    position: absolute;
    height: 10vh;
    top: 50%;
    transform:translateY(-50%);
    background-color: #f9bf62;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    img {
        height: 8vh;
        display: inline-block;
    }
}

.player-scores {
  align-items: center;
    display: flex;
    width: 20vh;
    justify-content: space-around;
}

.player-a-scores {
    transform: rotate(180deg);
}
</style>
