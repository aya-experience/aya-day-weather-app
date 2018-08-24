<template>
  <section>
    {{agency.name}}
  </section>
</template>

<script>
export default {
  computed: {
    agency() {
      return this.$store.state.agencies.find(agency => agency.name === this.$route.params.agency);
    }
  }
}
</script>

<style scoped>

</style>
