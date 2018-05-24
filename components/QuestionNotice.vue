<template>
  <div class="question-notice toast">
    <img class="bob-de-bouwer" src="~static/images/bob-bouwer.svg">
    <p>Er is een bouwvraag!</p>
    <button class="button-primary" @click="onClickButton()">Speel!</button>
  </div>
</template>

<script>

export default {
  methods: {
    onClickButton () {
      this.$store.commit('seenNotice', true)
      this.$emit('onClick')
    }
  }
}

</script>

<style scoped>

@import '~/assets/core.css';

</style>