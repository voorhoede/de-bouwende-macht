<template>
  <section class="container">
    <h1 class="page-title">I've built my own Rotterdam, this is what it looks like:</h1>
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

.sharing-buttons {  
  padding-bottom: var(--spacing-double);
  margin: 0 auto;
  margin-top: 4rem;
  border-bottom: 1px solid var(--black);
  width: 250px;
}

.share-logo:not(:last-child) {
  margin-right: var(--spacing-normal);
}

</style>