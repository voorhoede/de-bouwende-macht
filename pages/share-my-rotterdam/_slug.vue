<template>
  <section class="container">
    <h1 class="page-title">Well done!</h1>
    <h2 class="sub-title">This is how your Rotterdam looks like:</h2>
    <input id="buildings" type="hidden" :value="`${$route.params.slug}`">
    
    <div class="postal-card">
      <city-map class="city-map" />
      <p class="postal-card-text">Cheers uit my Rotterdam!</p>
    </div>

    <div class="sharing-buttons">
      <a 
        class="share-logo"
        :href="`https://www.facebook.com/sharer.php?u=${this.cityUrl + cityBuildings}`" 
        target="_blank"
      >
        <img src="~static/images/facebook.svg" alt="">
      </a>

      <a 
        class="share-logo" 
        :href="`whatsapp://send?text=${this.cityUrl + cityBuildings}`" 
        data-action="share/whatsapp/share" 
        target="_blank"
      >
        <img src="~static/images/whatsapp.svg" alt="">
      </a>
      
      <a class="share-logo"
        :href="`https://twitter.com/intent/tweet?text=${this.text + this.cityUrl + cityBuildings}`" 
        target="_blank"
      >
        <img src="~static/images/twitter.svg" alt="">
      </a>
    </div>

    <email-form />
  </section>
</template>

<script>
import CityMap from '~/components/Map.vue'
import EmailForm from '~/components/EmailForm.vue'
import { mapState } from 'vuex'

export default {
  components: { CityMap, EmailForm },
  data() {
    return {
      cityUrl: 'http://infallible-khorana-d0fd18.netlify.com/my-city/',
      text: 'Hi! Check out my Rotterdam!',
      slug: null,
    }
  },

  asyncData({ params }) {
    const buildings = params.slug

    return { 
      cityBuildings: buildings
    }
  },

  mounted: () => {
    const slugs = document.getElementById('buildings')
    const cityBuildings = slugs.value.split('-')
    this.slug = `${slugs.value}`

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
  height: auto;
  padding: var(--spacing-double) var(--spacing-normal);
}

.sub-title {
  margin-bottom: var(--spacing-double);
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
  border-bottom: 2px solid var(--green);
  width: 250px;
  margin: 0 auto var(--spacing-double) auto;
  margin-top: 4rem;
  padding-bottom: 2rem;
}

.share-logo:not(:last-child) {
  margin-right: 1rem;
}
</style>
