<template>
  <div id="home">
    <div id="top">
      <h1>Weath-Zen</h1>
      <p>
        Le site qui permet de voir la meilleure météo des agences Zenika.<br>
        Tout le monde le sait : la météo joue grandement sur l’humeur.<br>
        Et nous prenons en considération l’humeur de nos collaborateurs.
      </p>
    </div>
    <nav>
      <nuxt-link :to="nextAgency"><img src="/fleche_gauche.png" alt="Previous" /></nuxt-link>
      <a href="#"><img src="/fleche_droite.png" alt="Next" /></a>
    </nav>
  </div>
</template>

<script>
export default {
  computed: {
    nextAgency() {
      return `/agencies/${this.$store.state.agencies[0].name}`;
    }
  }
}
</script>
<style scoped>
  #home {
    height: 100vh;
    width: 100vw;
    background: url('/static/background.jpg') no-repeat center fixed;
    background-size: cover;
  }
  #top {
    position: absolute;
    top: 5vw;
    left: 5vw;
  }
  h1 {
    margin-bottom: 16px;
    font-size: 75px;
    line-height: 90px;
    font-weight: 300;
    text-transform: uppercase;
    font-family: 'Lato', sans-serif;
  }
  p {
    font-size: 15px;
    line-height: 20px;
  }
  nav {
    position: absolute;
    bottom: 5vw;
    right: 5vw;
  }
  nav a + a {
    margin-left: 25px;
  }
</style>
