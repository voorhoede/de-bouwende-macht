<template>
  <div class="feedback toast">
    <img class="bob-de-bouwer" src="~static/images/bob-bouwer.svg">
    <p>{{ feedback }}</p>
    <button class="button-primary" @click="onClickButton">Speel!</button>
  </div>
</template>

<script>

export default {
  props: ['feedback'],
  methods: {
    onClickButton () {
      this.$store.commit('seenFeedback', true)
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

</style>