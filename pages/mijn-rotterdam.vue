<template>
  <section class="container">
    <logo class="logo" />
    <h1 class="page-title">Ik heb het spel “De Bouwende Macht” gespeeld. Dit is mijn Rotterdam</h1>
    
    <div class="postal-card">
      <city-map />
      <p class="postal-card-text">Groeten uit mijn Rotterdam!</p>
    </div>

    <nuxt-link class="button button-primary" to="/">Bouw jouw Rotterdam</nuxt-link>
  </section>
</template>

<script>
import CityMap from '~/components/Map.vue'
import { mapState } from 'vuex'
import queryString from 'query-string'
import Logo from '~/components/Logo.vue'

export default {
  components: { CityMap, Logo },

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
  padding: var(--spacing-double) var(--spacing-normal);
}

.page-title {
  text-align: center;
  font-size: 1.5rem;
  font-family: var(--font-bold);
  font-weight: normal;
  margin: 3rem auto;
  width: 80%;
}

.postal-card {
  padding: .8rem;
  box-shadow: var(--box-shadow);
  transform: rotate(-4deg);
  margin: 0 auto 3rem auto;
  width: 80%;
  max-width: 600px;
  background-color: var(--white);
}

.city-map {
  width: 100%;
}

.postal-card-text {
  margin-bottom: 0;
  font-family: 'Dancing Script';
  font-weight: bold;
  color: var(--pink);
}

@media screen and (max-width: 430px) {
  .page-title {
    margin: var(--spacing-double) auto 1.5rem auto;
    font-size: 1.2rem;
  }

  .tagline {
    font-size: 1.2rem;
  }

  .postal-card {
    padding: var(--spacing-half);
    width: 95%;
  }
}

@media screen and (max-width: 532px) {
  .page-title {
    width: 100%;
  }
}

@media screen and (max-width: 632px) {
  .postal-card-text {
    font-size: 1.5rem;
  }
}

@media screen and (min-width: 632px) {
  .postal-card-text {
    font-size: var(--font-size-big);
  }
}

.postal-card .city-map {
  height: auto;
  width: auto;
  overflow: hidden;
}

</style>
