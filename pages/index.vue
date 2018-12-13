<template>
  <section class="container">
    <div>
      <logo/>
      <h1 class="title">
        wap-games
      </h1>
      <h2 class="subtitle">
        A bunch of games based on the hit podcast &#34;What Am Politics?&#34;
      </h2>
      <div class="links">
        <button @click="enableFullscreen">START</button>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  methods: {
    enableFullscreen() {
      document.body.requestFullscreen()
    }
  }
}
</script>

<style>

body {
  background-color: white;
}

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
