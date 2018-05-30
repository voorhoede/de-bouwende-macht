<template>
  <div class="toast card ready-notice">
    <bob-bouwer class="character" />
    <p>Goed bezig, je bent al lekker op weg met het bouwen aan jouw Rotterdam!</p>
    <p>Als je wilt, kan je vanaf nu jouw Rotterdam delen!</p>
    <share-button
      class="button-secondary"
      :slug="slug"
      :label="'Dit is mijn Rotterdam!'"
    />
    <p>Je kan natuurlijk ook nog verder bouwen!</p>
    <button class="button-primary" @click="onClickButton()">Ik bouw nog verder</button>
  </div>
</template>

<script>
import ShareButton from '~/components/ShareButton.vue'
import BobBouwer from '~/static/images/bob-bouwer.svg'

export default {
  components: { ShareButton, BobBouwer },
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