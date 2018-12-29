<template>
<div class="pong-game">

  <Instructions v-if="!playing && !showResults" @start="startGame">
    <p>You'll figure it out...</p>
  </Instructions>

  <PongResults @click.native="startGame" v-if="showResults" :scores="scores" />
  <PongPaddle :paddlePosition="paddles.a" paddle-id="a" class="playerA" @change="setPaddlePosition" />
  <PongBall v-if="playing" @bounce="showQuote" :paddles="paddles" @score="recordScore" :playing="playing" />
  <PongPaddle :paddlePosition="paddles.b" paddle-id="b" class="playerB" @change="setPaddlePosition" />


  <div class="quotes">
    <div class="top-quote">
      <h2>{{aQuote}}</h2>
    </div>
    <div class="bottom-quote">
      <h2>{{bQuote}}</h2>
    </div>
  </div>

  <h2 class="scores">{{scores.a}} : {{scores.b}}</h2>
</div>
</template>

<script>
import QuoteData from '@/assets/pong/quotes'

export default {
  name: "PongGame",
  components: {
    PongPaddle: () =>
      import ('~/components/pong/PongPaddle.vue'),
    PongBall: () =>
      import ('~/components/pong/PongBall.vue'),
    PongResults: () =>
      import ('~/components/pong/PongResults.vue'),
    Instructions: () =>
      import ('~/components/Instructions.vue')
  },
  data() {
    return {
      aQuote: '',
      bQuote: '',
      playing: false,
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
    showQuote(letter) {
      if (letter == 'a') {
        this.aQuote = this.pickQuote(letter);
      } else {
        this.bQuote = this.pickQuote(letter);
      }
    },
    pickQuote(letter) {
      if (letter == 'a') {
        return this.getRandomItemFromArray(this.aQuotes);
      } else {
        return this.getRandomItemFromArray(this.bQuotes);
      }
    },
    getRandomItemFromArray(arr) {
      let rand = Math.round(Math.random() * (arr.length - 1));
      return arr[rand];
    },
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
      if (this.scores.a >= 5 || this.scores.b >= 5) {
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
    players() {
      return this.$store.state.players
    },
    aQuotes() {
      return QuoteData[this.players.a.character];
    },
    bQuotes() {
      return QuoteData[this.players.b.character];
    }
  }
}
</script>

<style lang="scss" scoped>
body {
    background-color: white;
}

h2 {
    font-size: 8vw;
}

.pong-game {
    height: 100%;
    position: absolute;
    width: 100%;
}

.quotes {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;

    .bottom-quote,
    .top-quote {
        width: 100%;
        position: absolute;
        height: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 15px;
    }

    .top-quote {
        top: 0;
        transform: rotate(180deg);
    }

    .bottom-quote {
        bottom: 0;
    }
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
