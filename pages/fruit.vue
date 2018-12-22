<template>
<div class="fruit-game">

  <div class="top-half half">
    <div class="vine-wrap">
      <div class="fruit" @click="selectFruit('a', i)" :style="fruitStyles(fruit)" v-for="(fruit, i) of fruits" />

      <div class="vine-wrap">
        <div class="vine" :style="vineStyles(i)" v-for="i of 3" />
      </div>    </div>
  </div>
  <div class="banner">
    <h2>Go, go, go!</h2>
  </div>
  <div class="bottom-half half">
    <div class="fruit" @click="selectFruit('a', i)" :style="fruitStyles(fruit)" v-for="(fruit, i) of fruits" />

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

  },
  data() {
    return {
      lowestFruit: undefined,
      fruitCount: 5,
      objects: [
        {
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
      }
      ],
      fruits: []

    }
  },
  methods: {
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

        if(y > lowestVal && objects[i].isFruit) {
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
      if(this.lowestFruit == fruit) {
        alert('RIGHT');
      } else {
        alert('WRONG');
      }
    }

  },
  computed: {


  },
  mounted() {
    this.generateFruits();
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
</style>
