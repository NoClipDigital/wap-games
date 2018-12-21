<template>
<div class="character-selection">
  <nuxt-link v-if="players.b.character" to="/slider">
    <UiButton class="start-btn">Let's Go!</UiButton>
  </nuxt-link>

  <div class="top-half half">
    <div class="character-blocks">
      <div :class="stateClass('a', 'steve')" class="player steve" @click="setPlayer('a', 'steve')">
        <img src="@/assets/steve.png" />
      </div>
      <div :class="stateClass('a', 'richie')" class="player richie" @click="setPlayer('a', 'richie')">
        <img src="@/assets/richie.png" />
      </div>
    </div>
    <h2 v-if="players.a.character">Team {{players.a.character}}</h2>
    <h2 v-else>Select your cohost</h2>
  </div>
  <div class="bottom-half half">
    <div class="character-blocks">
      <div :class="stateClass('b', 'steve')" class="player steve" @click="setPlayer('b', 'steve')">
        <img src="@/assets/steve.png" />
      </div>
      <div :class="stateClass('b', 'richie')" class="player richie" @click="setPlayer('b', 'richie')">
        <img src="@/assets/richie.png" />
      </div>
    </div>
    <h2 v-if="players.b.character">Team {{players.b.character}}</h2>
    <h2 v-else>Select your cohost</h2>
  </div>

</div>
</template>

<script>
export default {
  name: "SliderGame",
  data() {
    return {

    }
  },
  components: {
    UiButton: () =>
      import ('@/components/UiButton')
  },
  computed: {
    players() {
      return this.$store.state.players;
    }
  },
  methods: {
    setPlayer(player, character) {
      this.$store.commit('players/setPlayerCharacter', { player, character });
    },
    stateClass(player, character) {
      if (!this.players[player].character) {
        return 'unselected';
      }

      if (this.players[player].character == character) {
        return 'selected';
      } else {
        return 'dimmed';
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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

.character-blocks {
    display: flex;
    position: relative;
    width: 60%;
}

.character-selection .start-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
}

.player {
    position: relative;
    width: 50%;

    img {
        display: block;
        width: 100%;
        padding: 4.5%;
        transition: all 700ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    &.selected {
        background: #f9bf62;
    }

    &.dimmed {
        img {
            opacity: 0.75;
            transform: scale(0.85);
        }
    }
}

h2 {
    color: white;
}
</style>
