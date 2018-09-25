<template>
  <section class="home">
    <section v-if="this.$store.state.agencies.length != 0" class="wrapper-home">
      <section class="winner">
        <section class="top">
          <h1>It’s a beautiful Zenday !</h1>
          <p>
            Pour connaître la meilleure météo <br/> aujourd’hui parmi les agences Zenika.
          </p>
        </section>

        <section class="winnerAgency">
          <p class="winnerAgency-desc">
            Tout le monde le sait : la météo joue sur l’humeur.<br/> Et chez Zenika, nous prenons en considération<br/> l’humeur de nos collaborateurs.
          </p>

          <article class="winnerAgency-card">
            <section class="winnerAgency-data">
              <h2>{{winnerAgency.name}}</h2>
              <div>
                <p>{{toCelcius(winnerAgency.weather.currently.temperature)}}°</p>
                <img :src="weatherIllustrationMapper[winnerAgency.weather.currently.icon]" :alt="winnerAgency.weather.currently.summary">
              </div>
            </section>
            <img src="~/static/couronne@svg.svg" class="winnerAgency-card-king" alt="winner">
          </article>
        </section>
      </section>

      <section class="agencies">
        <article v-for="agency in otherAgencies" :key="agency.name">
          <nuxt-link :to="`/agencies/${agency.name}`" class="agency">
            <h2>{{agency.name}}</h2>
            <p class="temperature">{{toCelcius(agency.weather.currently.temperature)}}°</p>
            <img :src="weatherIllustrationMapper[agency.weather.currently.icon]" :alt="agency.weather.currently.summary">
          </nuxt-link>
        </article>
      </section>
    </section>

    <!-- Only displayed when the API could not be reached -->
    <section class="wrapper-error" v-else>
      <Error/>
    </section>
  </section>
</template>

<script>
import axios from 'axios';
import Error from './error';

const API_URL = process.env.isDev ? process.env.baseUrl_dev : process.env.baseUrl;

export default {
  name: 'Index',
  data() {
    return {
      weatherIllustrationMapper: {
        'clear-day': 'sun@1x.png',
        'clear-night': 'sun@1x.png',
        rain: 'pluie@1x.png',
        snow: 'neige@1x.png',
        sleet: 'neige@1x.png',
        wind: 'orage@1x.png',
        hail: 'neige@1x.png',
        thunderstorm: 'orage@1x.png',
        tornado: 'orage@1x.png',
        fog: 'nuageux@1x.png',
        cloudy: 'nuageux@1x.png',
        'partly-cloudy-day': 'eclairci@1x.png',
        'partly-cloudy-night': 'eclairci@1x.png',
      },
    };
  },
  computed: {
    winnerAgency() {
      return this.$store.state.agencies[0];
    },
    otherAgencies() {
      const [, ...otherAgencies] = this.$store.state.agencies;
      return otherAgencies;
    },
  },
  methods: {
    toCelcius(f) {
      return Math.round((f - 32) / 1.8);
    },
  },
  components: {
    Error,
  },
  async fetch({ store, params }) {
    const agencies = await axios
      .get(API_URL, {
        headers: { 'Access-Control-Allow-Origin': '*' },
      })
      .catch(error => {
        // API is unreachable, set the error message we received
        store.commit('setError', error.message);
      });

    // Check if data was returned by the API
    if (agencies != null) {
      // Save it
      store.commit('changeAgencies', agencies.data);
    }
  },
};
</script>

<style scoped>
.home {
  background: url('~/static/background.jpg') no-repeat bottom fixed;
  background-size: cover;
  color: white;
}

.winner {
  height: 80vh;
  width: 100vw;
  position: relative;
}

.wrapper-error {
  width: 100%;
  height: 100vh;
}

.top {
  position: absolute;
  top: 5vh;
  left: 5vw;
  animation: 1s 1 titleapear;
}

@keyframes titleapear {
  from {
    left: -100vw;
  }
  to {
    left: 5vw;
  }
}

h1 {
  margin-bottom: 16px;
  font-family: Lato;
  font-size: 70px;
  font-weight: 300;
  line-height: 84px;
}

.top p {
  font-family: Roboto;
  font-size: 30px;
  line-height: 39px;
}

.winnerAgency {
  display: flex;
  position: absolute;
  width: 50vw;
  bottom: 2vh;
  right: 5vw;
  justify-content: space-between;
  align-items: flex-end;
}

.winnerAgency-desc {
  text-align: right;
  font-family: Roboto;
  font-size: 22px;
  line-height: 29px;
  animation: 1.5s 1 winnerAgency-desc-apear;
}

@keyframes winnerAgency-desc-apear {
  0% {
    transform: translateX(100vw);
  }
  50% {
    transform: translateX(100vw);
  }
  100% {
    transform: translateX(0);
  }
}

.winnerAgency-card {
  background-color: white;
  color: black;
  width: 16vw;
  height: 22vh;
  position: relative;
  animation: 3s 1 bounceInDown cubic-bezier(0.1, -0.6, 0.2, 0);
}

@keyframes bounceInDown {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    transform: translate3d(0, -3000px, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(0, 25px, 0);
  }
  75% {
    transform: translate3d(0, -10px, 0);
  }
  90% {
    transform: translate3d(0, 5px, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}

.winnerAgency-card img.winnerAgency-card-king {
  position: absolute;
  top: -50px;
  right: -46px;
  width: 93px;
  height: 75px;
}

.winnerAgency-card {
  background-color: white;
  color: black;
  width: 16vw;
  height: 100%;
  position: relative;
}

.winnerAgency-card img.winnerAgency-card-king {
  position: absolute;
  top: -50px;
  right: -46px;
  width: 93px;
  height: 75px;
}

.winnerAgency-card h2 {
  font-family: Lato;
  font-size: 45px;
  font-weight: 300;
  line-height: 54px;
  text-align: center;
}

.winnerAgency-card p {
  font-family: Lato;
  font-size: 45px;
  font-weight: 300;
  line-height: 54px;
  padding-left: 15px;
  margin-right: 5px;
}

.winnerAgency-card img {
  width: 25%;
  margin-left: 5px;
}

.winnerAgency-card div {
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
}

.winnerAgency-data {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
}

.agencies {
  display: flex;
  width: 100vw;
  height: 20vh;
  background-color: #000528;
  justify-content: space-around;
  align-items: center;
  animation: 2s 1 fadeIn;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  75% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.agencies a {
  text-decoration: none;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
}

.agencies a:hover {
  transform: scale(1.1);
}

.agencies h2 {
  font-family: Lato;
  font-size: 20px;
  font-weight: 300;
  line-height: 24px;
  text-align: center;
}

.agencies p {
  font-family: Lato;
  font-size: 50px;
  font-weight: 300;
  line-height: 60px;
  text-align: center;
}

.agencies img {
  width: 25%;
}

/* Tablets (portrait) ----------- */

@media only screen and (max-width: 868px) {
  h1 {
    margin-bottom: 16px;
    font-size: 2.5em;
  }

  .top p {
    font-size: 1.5em;
  }

  .winnerAgency-desc {
    font-size: 1.25em;
    line-height: 20px;
    text-align: left;
  }

  .winnerAgency {
    width: 90vw;
    bottom: 10vh;
    right: 5vw;
  }

  .winnerAgency-card {
    width: 100vw;
    height: 22vh;
    position: relative;
  }

  .agencies {
    flex-direction: column;
    height: auto;
    padding: 15px 0 15px 0;
  }

  .winnerAgency-card img.winnerAgency-card-king {
    top: -40px;
    right: -10px;
    width: 60px;
    height: 75px;
  }
}

/* Smartphones (portrait) ----------- */

@media only screen and (max-width: 468px) {
  h1 {
    margin-bottom: 16px;
    font-size: 1.8em;
    line-height: 35px;
  }

  .top p {
    font-size: 1.25em;
    line-height: 30px;
  }

  .winnerAgency-desc {
    font-size: 1em;
  }
}
</style>
