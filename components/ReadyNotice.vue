<template>
  <div class="toast card ready-notice">
    <img class="character" src="~static/images/bob-bouwer.svg">
    <p>Goed bezig, je bent al lekker op weg met het bouwen aan jouw Rotterdam!</p>
    <p>Als je wilt, kan je vanaf nu jouw Rotterdam delen!</p>
    <share-button
      class="button-primary"
      :slug="slug"
      :label="'Dit is mijn Rotterdam!'"
    />
    <p>Je kan natuurlijk ook nog verder bouwen!</p>
    <button class="button-secondary" @click="onClickButton()">Ik bouw nog verder</button>
  </div>
</template>

<script>
import ShareButton from '~/components/ShareButton.vue'

export default {
  components: { ShareButton },
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

.character {
  height: 100px;
  width: auto;
  margin-bottom: var(--spacing-normal);
}

</style>