<template>
  <section :style="weatherGradientMapper[agency.weather.currently.icon]">
    <div class="top">
      <span>{{toCelcius(agency.weather.daily.data[0].temperatureLow)}}°</span>
      <nav>
        <div>
          <nuxt-link :to="previousUrl">
            <img src="~/assets/left_arrow.svg"/>
          </nuxt-link>
          <nuxt-link :to="nextUrl">
            <img src="~/assets/right_arrow.svg"/>
          </nuxt-link>
        </div>
      </nav>
      <span class="temperature">{{toCelcius(agency.weather.daily.data[0].temperatureHigh)}}°</span>
    </div>
    <h1>{{agency.name}}</h1>
    <h2>{{toCelcius(agency.weather.currently.temperature)}}°</h2>

    <img class="weather" :src="weatherIllustrationMapper[agency.weather.currently.icon]" />

    <div class="tree">
      <Tree/>
    </div>

    <nuxt-link class="back-to-home" to="/">Back to home</nuxt-link>
  </section>
</template>

<script>
import Tree from '../../components/tree.vue';

export default {
  data: () => ({
    weatherGradientMapper: {
      'clear-day': 'background: linear-gradient(90deg, #ED4264 0%, #FFEDBC 100%)',
      'clear-night': 'background: linear-gradient(90deg, #ED4264 0%, #FFEDBC 100%)',
      rain: 'background: linear-gradient(90deg, #00C6FF 0%, #0072FF 100%)',
      snow: 'background: linear-gradient(90deg, #00A4CC 0%, #C7FAFF 100%)',
      sleet: 'background: linear-gradient(90deg, #00A4CC 0%, #C7FAFF 100%)',
      wind: 'background: linear-gradient(90deg, #4B6CB7 0%, #182848 100%)',
      hail: 'background: linear-gradient(90deg, #00A4CC 0%, #C7FAFF 100%)',
      thunderstorm: 'background: linear-gradient(90deg, #4B6CB7 0%, #182848 100%)',
      tornado: 'background: linear-gradient(90deg, #4B6CB7 0%, #182848 100%)',
      fog: 'background: linear-gradient(90deg, #2BC0E4 0%, #EAECC6 100%)',
      cloudy: 'background: linear-gradient(90deg, #2BC0E4 0%, #EAECC6 100%)',
      'partly-cloudy-day': 'background: linear-gradient(90deg, #70E1F5 0%, #FFD194 100%)',
      'partly-cloudy-night': 'background: linear-gradient(90deg, #70E1F5 0%, #FFD194 100%)',
    },
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
    tree: Tree,
  }),
  components: {
    Tree,
  },
  computed: {
    agency() {
      return this.$store.state.agencies.find((agency) => agency.name === this.$route.params.agency);
    },
    previousUrl() {
      const currentIndex = this.$store.state.agencies.findIndex(
        (agency) => agency.name === this.$route.params.agency,
      );
      const previousIndex =
        currentIndex - 1 < 0 ? this.$store.state.agencies.length - 1 : currentIndex - 1;
      return `/agencies/${this.$store.state.agencies[previousIndex].name}`;
    },
    nextUrl() {
      const currentIndex = this.$store.state.agencies.findIndex(
        (agency) => agency.name === this.$route.params.agency,
      );
      const nextIndex =
        currentIndex + 1 >= this.$store.state.agencies.length ? 0 : currentIndex + 1;
      return `/agencies/${this.$store.state.agencies[nextIndex].name}`;
    },
  },
  methods: {
    toCelcius(f) {
      return Math.round((f - 32) / 1.8);
    },
  },
};
</script>

<style scoped>
section {
  min-height: 100vh;
}

.back-to-home {
  position: absolute;
  bottom: 2vw;
  left: 2vw;

  color: black;
  text-decoration: none;
  font-family: 'Lato', sans-serif;
  font-size: 20px;
  font-weight: 300;
  line-height: 24px;

  animation: 4s 1 fadeIn ease;
}

.back-to-home:before {
  content: '<';
}

.top {
  padding: 2vw 2vh 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.top span {
  font-family: 'Lato', sans-serif;
  font-size: 2.8em;
  font-weight: 300;
  animation: 4s 1 fadeIn ease;
}

nav {
  flex: 1;
  text-align: center;
}

nav a {
  display: inline-block;
  height: 8vh;
  animation: 4s 1 fadeIn ease;
}

nav img {
  display: block;
  height: 100%;
  width: auto;
}

nav a + a {
  margin-left: 25px;
  animation: 4s 1 fadeIn ease;
}

h1 {
  margin-top: 6vh;
  font-family: 'Lato', sans-serif;
  font-size: 4vw;
  font-weight: 300;
  text-align: center;
  animation: 4s 1 fadeIn ease;
}

h2 {
  font-family: 'Lato', sans-serif;
  font-size: 3.5em;
  font-weight: 300;
  margin-top: 2vh;
  text-align: center;
  animation: 4s 1 fadeIn ease;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.tree {
  height: 50%;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
}

.tree svg {
  width: 100%;
  height: 100%;
}

.weather {
  position: absolute;
  top: 30vh;
  right: 10vw;
  width: 15vw;
  animation: 4s 1 bounceInDown ease;
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

a {
  opacity: 1;
  transition: opacity 0.2s ease-in-out;
}

a:hover {
  opacity: 0.4;
}
</style>
