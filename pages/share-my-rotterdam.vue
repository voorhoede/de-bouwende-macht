<template>
  <section class="container">
    <h1 class="page-title">Well done! This is how your Rotterdam looks like:</h1>
    <input type="hidden" :value="slug" id="buildings">
    
    <div class="postal-card">
      <city-map class="city-map" />
      <p class="postal-card-text">Cheers uit my Rotterdam!</p>
    </div>

    <div class="sharing-buttons">
      <a 
        class="share-logo"
        :href="'https://www.facebook.com/sharer.php?u=' + url + slug" 
        target="_blank"
      >
        <img src="~static/images/facebook.svg" alt="facebook-logo">
      </a>

      <a 
        class="share-logo" 
        :href="'whatsapp://send?text=' + url + slug" 
        data-action="share/whatsapp/share" 
        target="_blank"
      >
        <img src="~static/images/whatsapp.svg" alt="whatsapp-logo">
      </a>
      
      <a class="share-logo"
        :href="'https://twitter.com/intent/tweet?text=' + text + url + slug" 
        target="_blank"
      >
        <img src="~static/images/twitter.svg" alt="twitter-logo">
      </a>
    </div>
  </section>
</template>

<script>
import CityMap from '~/components/Map.vue'
import { mapState } from 'vuex'
import queryString from 'query-string'

export default {
  components: { CityMap },
  data () {
    return {
      url: '',
      text: 'Hi! Check out my Rotterdam!',
      slug: '',
    }
  },

  mounted () {
    const urlOrigin = location.origin + '?buildings='
    const urlParams = queryString.parse(location.search)
    const slug = urlParams.buildings
    const cityBuildings = slug.split('-')

    this.slug = slug
    this.url = urlOrigin

    cityBuildings.map(building => {
      const id = building.toUpperCase()
      const el = document.getElementById(id)
      
      el.classList.remove('hidden')
    })
  },
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
  padding: var(--spacing-normal);
  box-shadow: var(--box-shadow);
  transform: rotate(-5deg);
  margin: 0 auto;
  width: 80%;
  max-width: 600px;
}

.city-map {
  width: 100%;
}

.postal-card-text {
  margin-bottom: 0;
  font-family: var(--font-bold);
}

.sharing-buttons {
  border-bottom: 1px solid var(--black);
  width: 250px;
  margin: 0 auto;
  margin-top: 4rem;
  padding-bottom: var(--spacing-double);
}

.share-logo:not(:last-child) {
  margin-right: var(--spacing-normal);
}
</style>
