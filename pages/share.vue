<template>
  <section class="container">
    <logo />

    <h1 class="page-title">
      {{ page.title }}
      <small class="tagline">{{ page.subtitle }}</small>
    </h1>

    <div class="content" v-html="page.content"></div>
    
    <postal-card :buildings="currentScenario" />

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

    <email-form />

    <small class="credentials">
      sound from <a class="link-external" href="http://www.freesound.org/people/klankbeeld/" target="_blank">http://www.freesound.org/people/klankbeeld/</a>
    </small>
  </section>
</template>

<script>
import CityMap from '~/components/Map.vue'
import EmailForm from '~/components/EmailForm.vue'
import Logo from '~/components/Logo.vue'
import { mapState } from 'vuex'
import queryString from 'query-string'
import page from '~/static/data/share.json'
import results from '~/static/data/results.json'
import FacebookLogo from '~/static/images/facebook.svg'
import TwitterLogo from '~/static/images/twitter.svg'
import WhatsappLogo from '~/static/images/whatsapp.svg'
import PostalCard from '~/components/PostalCard.vue'

export default {
  components: { CityMap, EmailForm, Logo, TwitterLogo, FacebookLogo, WhatsappLogo, PostalCard },
  computed: mapState([
              'currentScenario',
            ]),
  data() {
    return {
      url: '',
      text: 'Ik heb het spel “Bouwen is Macht” gespeeld. Dit is mijn Rotterdam! ',
      page,
      results,
      slug: '',
    }
  },
  mounted () {
    const urlOrigin = location.origin + '/mijn-rotterdam/?buildings='
    let shortSlugs = []

    this.currentScenario.map(building => {
      const result = this.results.find(result => result.slug === building)
      
      shortSlugs.push(result.shortSlug)
    })

    this.url = urlOrigin
    this.slug = shortSlugs.join('-')
  }
}
</script>

<style scoped>
@import '~/assets/core.css';

.container {
  height: auto;
  padding: var(--spacing-double) var(--spacing-normal) var(--spacing-normal);
}

.page-title {
  margin-bottom: var(--spacing-double);
}

.tagline {
  display: block;
}

.sharing-buttons {
  border-bottom: 2px solid var(--green);
  width: 250px;
  margin: var(--spacing-double) auto;;
  padding-bottom: var(--spacing-double);
}

@media screen and (max-width: 430px) {
  .page-title {
    font-size: 1.8rem;
    margin: var(--spacing-normal) auto 1.5rem auto;
  }

  .tagline {
    font-size: 1.2rem;
  }

  .sharing-buttons {
    margin-top: var(--spacing-normal);
  }
}

.share-logo:not(:last-child) {
  margin-right: var(--spacing-normal);
}

</style>
