<template>
  <section class="container">
    <logo />

    <h1 class="page-title">
      {{ page.title }}
      <small class="tagline">{{ page.subtitle }}</small>
    </h1>
    
    <div class="postal-card">
      <city-map class="city-map" />
      <p class="postal-card-text">Groeten uit mijn Rotterdam</p>
    </div>

    <div class="sharing-buttons">
      <a 
        class="share-logo"
        :href="'https://www.facebook.com/sharer.php?u=' + url + slug" 
        target="_blank"
      >
        <facebook-logo />
      </a>

      <a 
        class="share-logo" 
        :href="'whatsapp://send?text=' + url + slug" 
        data-action="share/whatsapp/share" 
        target="_blank"
      >
        <whatsapp-logo />
      </a>
      
      <a class="share-logo"
        :href="'https://twitter.com/intent/tweet?text=' + text + url + slug" 
        target="_blank"
      >
        <twitter-logo />
      </a>
    </div>
    
    <div class="content" v-html="page.content"></div>

    <email-form />
  </section>
</template>

<script>
import CityMap from '~/components/Map.vue'
import EmailForm from '~/components/EmailForm.vue'
import Logo from '~/components/Logo.vue'
import { mapState } from 'vuex'
import queryString from 'query-string'
import page from '~/static/data/share.json'
import FacebookLogo from '~/static/images/facebook.svg'
import TwitterLogo from '~/static/images/twitter.svg'
import WhatsappLogo from '~/static/images/whatsapp.svg'

export default {
  components: { CityMap, EmailForm, Logo, TwitterLogo, FacebookLogo, WhatsappLogo },
  data() {
    return {
      url: '',
      text: 'Ik heb het spel “De Bouwende Macht” gespeeld. Dit is mijn Rotterdam! ',
      slug: '',
      page,
    }
  },

  mounted () {
    const urlOrigin = location.origin + '/mijn-rotterdam/?buildings='
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
  height: auto;
  padding: var(--spacing-double) var(--spacing-normal);
}

.content {
  max-width: 500px;
  margin: 0 auto;
  padding-bottom: var(--spacing-double);
}

.content:after {
  content: '';
  display: block;
  height: 2px;
  width: 250px;
  margin: var(--spacing-double) auto 0 auto;
  background-color: var(--green);
}

.page-title {
  margin-bottom: 2rem;
}

.tagline {
  display: block;
}

.postal-card {
  padding: .8rem;
  box-shadow: var(--box-shadow);
  transform: rotate(-4deg);
  margin: 0 auto var(--spacing-normal) auto;
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
    font-size: 1.8rem;
    margin: var(--spacing-normal) auto 1.5rem auto;
  }

  .tagline {
    font-size: 1.2rem;
  }
  .postal-card {
    margin-bottom: 1.5rem;
    padding: var(--spacing-half);
    width: 95%;
  }

  .postal-card-text {
    font-size: 1.5rem;
  }

  .sharing-buttons {
    margin-top: var(--spacing-normal);
  }
}

@media screen and (min-width: 400px) and (max-width: 632px) {
  .postal-card-text {
    font-size: 1.5rem;
  }
}

@media screen and (min-width: 632px) {
  .postal-card {
    margin-bottom: var(--spacing-normal);
  }
  .postal-card-text {
    font-size: var(--font-size-big);
  }
}

.postal-card .city-map {
  height: auto;
  width: auto;
  overflow: hidden;
}

.sharing-buttons {
  border-bottom: 2px solid var(--green);
  width: 250px;
  margin: var(--spacing-double) auto;;
  padding-bottom: var(--spacing-double);
}

.share-logo:not(:last-child) {
  margin-right: var(--spacing-normal);
}
</style>
