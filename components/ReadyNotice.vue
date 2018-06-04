<template>
  <div class="toast card ready-notice">
    <construction-worker class="character" />
    <p>Goed bezig, je bent al lekker op weg met het bouwen aan jouw Rotterdam!</p>
    <p>Je bent nu halverwege het spel. Als je wilt, kan je vanaf nu jouw Rotterdam delen.</p>
    <share-button
      class="button-secondary"
      :slug="slug"
      :label="'Dit is mijn Rotterdam!'"
    />
    <p>Is de stad nog niet af? Je kan natuurlijk ook nog verder bouwen:</p>
    <button class="button-primary" @click="onClickButton()">Ik bouw nog verder</button>
  </div>
</template>

<script>
import ShareButton from '~/components/ShareButton.vue'
import ConstructionWorker from '~/static/images/construction-worker.svg'

export default {
  components: { ShareButton, ConstructionWorker },
  props: ['slug'],
  methods: {
    onClickButton () {
      this.$store.commit('seenReadyNotice')
      this.$store.commit('showReadyButton')
      
      this.$emit('onClick')
    }
  }
}

</script>

<style scoped>

@import '~/assets/core.css';

</style>