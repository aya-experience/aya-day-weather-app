<template>
  <section>
    <div class="top">
      <span>19°</span>
      <nav>
        <div>
          <a href="#"><leftArrow /></a>
          <a href="#"><rightArrow /></a>
        </div>
      </nav>
      <span>35°</span>
    </div>
    <h1>{{agency.name}}</h1>
    <h2>35°</h2>

    <div class="tree">
      <tree />
    </div>


    <a class="back-to-home" href="#">Back to home</a>
  </section>
</template>

<script>
import tree from '../../components/tree.vue';
import leftArrow from '../../components/left_arrow.vue';
import rightArrow from '../../components/right_arrow.vue';

export default {
  components: {
    tree,
    leftArrow,
    rightArrow
  },
  computed: {
    agency() {
      return this.$store.state.agencies.find(agency => agency.name === this.$route.params.agency);
    }
  }
}
</script>

<style scoped>
.back-to-home {
  position: absolute;
  bottom: 2vw;
  left: 2vw;

  color: black;
  text-decoration: none;
  font-family: "Lato", sans-serif;
  font-size: 20px;
  font-weight: 300;
  line-height: 24px;
}

.back-to-home:before {
  content: "<";
}

.top {
  padding: 2vw 2vh 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.top span {
  font-family: "Lato", sans-serif;
  font-size: 3vw;
  font-weight: 300;
}

nav {
  flex: 1;
  text-align: center;
}

nav a {
  display: inline-block;
  height: 8vh;
}

nav svg {
  display: block;
  height: 100%;
  width: auto;
}

nav a + a {
  margin-left: 25px;
}

h1 {
  margin-top: 6vh;
  font-family: "Lato", sans-serif;
  font-size: 4vw;
  font-weight: 300;
  text-align: center;
}

h2 {
  font-family: "Lato", sans-serif;
  font-size: 8vw;
  font-weight: 300;
  margin-top: 2vh;
  text-align: center;
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
</style>
