<template>
<div class="pong-game">
  <PongResults @click.native="startGame" v-if="showResults" :scores="scores" />
  <PongPaddle :paddlePosition="paddles.a" paddle-id="a" class="playerA" @change="setPaddlePosition" />
  <PongBall :paddles="paddles" @score="recordScore" :playing="playing" />
  <PongPaddle :paddlePosition="paddles.b" paddle-id="b" class="playerB" @change="setPaddlePosition" />

  <h2 class="scores">{{scores.a}} : {{scores.b}}</h2>
</div>
</template>

<script>
export default {
  name: "PongGame",
  components: {
    PongPaddle: () =>
      import ('~/components/pong/PongPaddle.vue'),
    PongBall: () =>
      import ('~/components/pong/PongBall.vue'),
    PongResults: () =>
      import ('~/components/pong/PongResults.vue')
  },
  data() {
    return {
      playing: true,
      showResults: false,
      paddles: {
        a: 0.5,
        b: 0.5
      },
      scores: {
        a: 0,
        b: 0
      }
    }
  },
  methods: {
    startGame() {
      this.playing = true;
      this.showResults = false;
    },
    // triggerResults is a computed for this game.
    setPaddlePosition({
      id,
      val
    }) {
      this.paddles[id] = val;
    },
    recordScore({
      position
    }) {
      if (position.y <= 0) {
        this.scores.b += 1;
      } else if (position.y >= 1) {
        this.scores.a += 1;
      }

      this.checkScore();
    },

    checkScore() {
      if (this.scores.a >= 10 || this.scores.b >= 10) {
        this.playing = false;
        this.showResults = true;

        this.$store.commit('players/addScore', this.winner);

        setTimeout(() => {
          this.$router.push('/game-selection');
        }, 2000);

      }
    }
  },
  computed: {
    winner() {
      return this.scores.a > this.scores.b ? 'a' : 'b';
    },

  }
}
</script>

<style>
body {
  background-color: white;
}

.scores {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.playerA {
  position: absolute;
  top: 0;
}

.playerB {
  position: absolute;
  bottom: 0;
}
</style>
