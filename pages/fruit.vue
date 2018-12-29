<template>
<div class="fruit-game" :class="gameState">

  <Instructions v-if="gameState == 'instructions'" @start="startRound">You've gotta be the first one to grab that sweet, sweet low hanging fruit.</Instructions>

  <div class="top-half half">
    <div class="vine-wrap">
      <div class="fruit" @touchstart="selectFruit('a', i)" :style="fruitStyles(fruit)" v-for="(fruit, i) of fruits" />
      <div class="vine-wrap">
        <div class="vine" :style="vineStyles(i)" v-for="i of 3" />
      </div>
    </div>
  </div>
  <div class="banner">
    <h2 v-if="gameState == 'ready'">Ready...</h2>
    <h2 v-if="gameState == 'go'">Go, go, go!</h2>
    <div class="winner-message" v-if="gameState == 'gameover'">
        <img :src="playerImg(winner.letter)" />
        <h2>{{winner.message}}</h2>
    </div>

    <div class="score-banner" v-if="gameState == 'scores'">
      <div class="player-b-scores player-scores" v-if="players.b.character">
        <img :src="playerImg('b')" />
        <h2>{{scores.b}}</h2>
      </div>

      <div class="player-a-scores player-scores" v-if="players.a.character">
        <img :src="playerImg('a')" />
        <h2>{{scores.a}}</h2>
      </div>
    </div>

  </div>
  <div class="bottom-half half">
    <div class="fruit" @touchstart="selectFruit('b', i)" :style="fruitStyles(fruit)" v-for="(fruit, i) of fruits" />

    <div class="vine-wrap">
      <div class="vine" :style="vineStyles(i)" v-for="i of 3" />
    </div>
  </div>

</div>
</template>

<script>
export default {
  name: "FruitGame",
  components: {
    Instructions: () =>
      import ('~/components/Instructions.vue')
  },
  data() {
    return {
      scores: {
        a: 0,
        b: 0
      },
      maxScore: 3,
      gameState: 'instructions',
      lowestFruit: undefined,
      fruitCount: 5,
      objects: [{
        img: require('@/assets/fruit/SVG/apple.svg'),
        isFruit: true
      }, {
        img: require('@/assets/fruit/SVG/banana.svg'),
        isFruit: true
      }, {
        img: require('@/assets/fruit/SVG/pint.svg'),
        isFruit: false
      }, {
        img: require('@/assets/fruit/SVG/orange.svg'),
        isFruit: true
      }, {
        img: require('@/assets/fruit/SVG/mic.svg'),
        isFruit: false
      }],
      fruits: []

    }
  },
  methods: {
    playerImg(letter) {
      return require(`@/assets/${this.players[letter].character}.png`);
    },
    shuffle(array) {
      var currentIndex = array.length,
        temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    },

    generateFruits() {
      let seed = Math.random() / 2;
      let y = seed;
      let x = 1;
      let objects = this.shuffle([...this.objects]);

      let lowestFruit = 0;
      let lowestVal = 0;

      for (var i = 0; i < 5; i++) {
        this.fruits.push({
          x,
          y,
          img: objects[i].img,
          isFruit: objects[i].isFruit
        });

        if (y > lowestVal && objects[i].isFruit) {
          lowestFruit = i;
          lowestVal = y;
        }

        y += 0.6;
        if (y > 1) {
          y -= 1;
          x++;
        }
      }

      this.lowestFruit = lowestFruit;

    },
    vineStyles(i) {
      return {
        backgroundPosition: `50% ${i * 30}%`
      }
    },
    fruitStyles(fruit) {

      return {
        backgroundImage: `url(${fruit.img})`,
        left: `${25 * fruit.x}%`,
        top: `${25 + (fruit.y * 60)}%`
      }
    },

    selectFruit(player, fruit) {
      if (this.lowestFruit == fruit) {
        this.gameState = 'scores';
        this.scores[player]++;
      } else {

        let other = player == 'a' ? 'b' : 'a';
        this.gameState = 'scores';
        this.scores[other]++;
      }

      if (this.winner) {
        return this.finishRound();
      }

      setTimeout(() => {
        this.startRound();
      }, 2000);
    },

    finishRound() {
      this.gameState = 'gameover';

      this.$store.commit('players/addScore', this.winner.letter);

      setTimeout(() => {
        this.$router.push('/game-selection');
      }, 2000);
    },


    startRound() {
      this.gameState = 'ready';
      this.fruits = [];
      this.generateFruits();

      setTimeout(() => {
        this.gameState = 'go';
      }, 2000 + (Math.random() * 3000));
    },
  },
  computed: {
    players() {
      return this.$store.state.players
    },
    winner() {
      if(this.scores.a == this.maxScore) {
        return {
          message: this.players.a.character + ' wins!',
          flipped: false,
          letter: 'a'
        }
      }else if(this.scores.b == this.maxScore) {
        return {
          message: this.players.b.character + ' wins!',
          flipped: true,
          letter: 'b'
        }
      }

    }
  }
}
</script>

<style lang="scss" scoped>
.vine-wrap {
    display: flex;
    justify-content: space-evenly;
    width: 95%;
    height: 100%;
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

.vine {
    background-image: url("~assets/fruit/SVG/vine.svg");
    background-position: 50% 30%;
    background-size: cover;
    height: 100%;
    width: 10%;
}

.fruit {
    width: 12vw;
    height: 12vh;
    position: absolute;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    transform: translate(-50%, -50%);
    // background-image: url("~assets/fruit/SVG/apple.svg");
}

.flipped {
  transform: rotation(180deg);
}

.half {
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    height: 50%;
    position: absolute;
    width: 100%;

    .ready & {
        opacity: 0;
        pointer-events: none;
    }

    .scores & {
        opacity: 0.2;
        pointer-events: none;
    }

    .gameover & {
        opacity: 0.2;
        pointer-events: none;
    }
}

.top-half {
    transform: rotate(180deg);
}

.bottom-half {
    bottom: 0;
}

.score-banner {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    img {
        height: 8vh;
        display: inline-block;
    }
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
