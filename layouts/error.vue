<template>
    <section class="wrapper">
        <section class="top">
            <h1>Uh oh... page non trouvée !</h1>
            <p>
                <nuxt-link class="return-link" to="/">Retour à l'acceuil</nuxt-link>
            </p>
        </section>
    </section>
</template>

<style scoped>
.wrapper {
  height: 100vh;
  width: 100vw;
  position: relative;
  background: url('~/static/background.jpg') no-repeat bottom fixed;
  background-size: cover;
}

.top {
  color: white;
  position: absolute;
  top: 5vh;
  left: 5vw;
}

h1 {
  margin-bottom: 16px;
  font-family: Lato;
  font-size: 3.5em;
  font-weight: 300;
  line-height: 84px;
}

.top p {
  font-family: Roboto;
  font-size: 25px;
  line-height: 39px;
}

.return-link {
  color: white;
}

@media only screen and (max-width: 868px) {
  h1 {
    font-size: 2em;
    margin-bottom: 50px;
    line-height: 50px;
  }

  .top p {
    font-size: 1.5em;
    line-height: 39px;
  }
}

@media only screen and (max-width: 468px) {
  h1 {
    font-size: 1.5em;
    line-height: 25px;
  }

  .top p {
    font-size: 1.25em;
    line-height: 25px;
  }
}
</style>
