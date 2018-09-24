<template>
    <section class="wrapper">
        <section class="top">
            <h1 v-if="$store.getters.error != ''">Uh oh... le serveur est injoignable !</h1>
            <h1 v-else>Uh oh... aucune agence trouvée !</h1>
            <p>
                Nos ingénieurs travaillent nuit et jour pour régler ce soucis.
            </p>
            <p class="error-details" v-if="$store.getters.error != ''">
                Erreur détaillée: <span>{{$store.getters.error}}</span>
            </p>
        </section>
    </section>
</template>

<script>
export default {
  name: 'Error',
};
</script>

<style>
.wrapper {
  height: 100%;
  width: 100%;
  position: relative;
}

.top {
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

.error-details {
  font-size: 0.9em;
}

.error-details > span {
  font-size: 0.75em;
  opacity: 0.5;
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


