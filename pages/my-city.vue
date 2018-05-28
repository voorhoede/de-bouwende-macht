<template>
  <section class="container">
    <h1 class="page-title">I've built my own Rotterdam, this is what it looks like:</h1>
    
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
import queryString from 'query-string'

export default {
  components: { CityMap },

  mounted () {
    const urlParams = queryString.parse(location.search)
    const slug = urlParams.buildings
    const cityBuildings = slug.split('-')

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
  padding: var(--spacing-double) 0;
}

.page-title {
  margin-bottom: 3rem;
  text-align: center;
  font-size: var(--font-size-normal);
  font-family: var(--font);
  font-weight: normal;
}

.postal-card {
  margin: 0 auto;
  margin-bottom: 4rem;
  padding: var(--spacing-normal);
  box-shadow:var(--box-shadow);
  transform: rotate(-5deg);
  width: 80%;
}

.postal-card-text {
  margin-bottom: 0;
  font-family: var(--font-bold);
}

</style>