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
      <a><img src='' alt="Previous"/></a>
      <a><img src='' alt="Next"/></a>
    </nav>
  </div>
</template>

<script>
export default {

}
</script>
<style scoped>
  #home {

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
  nav a {
    display: inline-block;
    padding: 25px;
    border: 1px solid #979797;
    border-radius: 8px;
  }
  nav a + a {
    margin-left: 25px;
  }
</style>
