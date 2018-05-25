<template>
  <section class="container">
    <h1 class="page-title">Well done! This is how your Rotterdam looks like:</h1>
    <input id="buildings" type="hidden" :value="`${$route.params.buildings}`">
    <div class="postal-card">
      <city-map />
      <p class="postal-card-text">Cheers uit my Rotterdam!</p>
    </div>

    <nuxt-link class="button button-primary" to="/my-rotterdam">Build your own Rotterdam</nuxt-link>
  </section>
</template>

<script>
import CityMap from '~/components/Map.vue'
import { mapState } from 'vuex'

export default {
  components: { CityMap },

  asyncData({ params }) {
    const buildings = params.buildings.split('-')
    return { cityBuildings: buildings }
  },

  mounted: () => {
    const slugs = document.getElementById('buildings')
    const cityBuildings = slugs.value.split('-')

    cityBuildings.map(building => {
      const id = building.toUpperCase()
      const el = document.getElementById(id)
      el.classList.remove('hidden')
    })
  }
}
</script>


<style scoped>
@import '~/assets/core.css';

.container {
  padding: 2rem 0;
}

.page-title {
  margin-bottom: 3rem;
  text-align: center;
  font-size: var(--font-size-normal);
  font-family: var(--font);
  font-weight: normal;
}

.postal-card {
  padding: 1rem;
  box-shadow: 2px 2px 10px #ccc;
  transform: rotate(-5deg);
  width: 80%;
  margin: 0 auto;
  margin-bottom: 4rem;
}

.postal-card-text {
  margin-bottom: 0;
  font-family: var(--font-bold);
}

.sharing-buttons {
  border-bottom: 1px solid #000;
  width: 250px;
  margin: 0 auto;
  margin-top: 4rem;
  padding-bottom: 2rem;
}

.share-logo:not(:last-child) {
  margin-right: 1rem;
}

</style>