<template>
  <div class="toast ready-notice">
    <p>Goed bezig, je bent al lekker op weg met het bouwen aan jouw Rotterdam!</p>
    <p>Als je wilt, kan je vanaf nu jouw Rotterdam delen!</p>
    <nuxt-link class="button share-button button-primary" to="/share-my-rotterdam">
      Dit is mijn Rotterdam!
    </nuxt-link>
    <p>Je kan natuurlijk ook nog verder bouwen!</p>
    <button class="button-secondary" @click="onClickButton()">Ik bouw nog verder</button>
  </div>
</template>

<script>

export default {
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

.bob-de-bouwer {
  height: 100px;
  width: auto;
  margin-bottom: var(--spacing-normal);
}

.share-button {
  margin-bottom: 2rem;
}

</style>