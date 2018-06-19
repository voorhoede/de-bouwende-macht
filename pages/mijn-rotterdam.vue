<template>
  <section class="container">
    <logo class="logo" />
    <h1 class="page-title">{{ page.title }}
      <small class="tagline">{{ page.subtitle }}</small>
    </h1>

    <div v-if="page.content" v-html="page.content"></div>

    <postal-card :buildings="buildings" />

    <nuxt-link class="button button-primary" to="/">Bouw jouw Rotterdam</nuxt-link>
  </section>
</template>

<script>
import PostalCard from '~/components/PostalCard.vue'
import { mapState } from 'vuex'
import queryString from 'query-string'
import Logo from '~/components/Logo.vue'
import page from '~/static/data/mijnRotterdam.json'
import results from '~/static/data/results.json'

export default {
  components: { Logo, PostalCard },
  data () {
    return {
      page,
      results,
      buildings: [],
    }
  },
  beforeMount () {
    const urlParams = queryString.parse(location.search)
    const slug = urlParams.buildings
    const shortSlugs = slug.split('-')
    
    let cityBuildings = []

    shortSlugs.map(shortSlug => {
      const building = this.results.find(item => item.shortSlug === shortSlug)

      cityBuildings.push(building.slug)
    })

    this.buildings = cityBuildings
  }
}
</script>

<style scoped>

@import '~/assets/core.css';

.container {
  height: auto;
  padding: var(--spacing-double) var(--spacing-normal) 4rem;
}

.page-title {
  text-align: center;
  font-family: var(--font-bold);
  font-weight: normal;
  margin: 0 auto 3rem auto;
  width: 80%;
}

@media screen and (max-width: 430px) {
  .page-title {
    margin: var(--spacing-double) auto 1.5rem auto;
    font-size: 1.5rem;
  }

  .tagline {
    font-size: 1.2rem;
  }
}

@media screen and (max-width: 600px) {
  .page-title{
    font-size: 1.7rem;
    width: 90%;
  }
}

@media screen and (min-width: 600px) {
  .page-title {
    margin-top: var(--spacing-normal);
  }

  .button {
    margin-top: var(--spacing-double);
  }
}

</style>
