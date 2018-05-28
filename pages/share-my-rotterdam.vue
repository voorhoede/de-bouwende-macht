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
        :href="`https://www.facebook.com/sharer.php?u=${url + slug}`" 
        target="_blank"
      >
        <img src="~static/images/facebook.svg" alt="">
      </a>

      <a 
        class="share-logo" 
        :href="`whatsapp://send?text=${url + slug}`" 
        data-action="share/whatsapp/share" 
        target="_blank"
      >
        <img src="~static/images/whatsapp.svg" alt="">
      </a>
      
      <a class="share-logo"
        :href="'https://twitter.com/intent/tweet?text=' + text + url + slug" 
        target="_blank"
      >
        <img src="~static/images/twitter.svg" alt="">
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
  data() {
    return {
      url: 'http://infallible-khorana-d0fd18.netlify.com/my-city/?buildings=',
      text: 'Hi! Check out my Rotterdam!',
      slug: null,
    }
  },

  mounted: () => {
    const input = document.getElementById('buildings')
    const urlParams = queryString.parse(location.search)
    const slug = urlParams.buildings
    const cityBuildings = slug.split('-')

    this.slug = slug

    input.value = slug

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
