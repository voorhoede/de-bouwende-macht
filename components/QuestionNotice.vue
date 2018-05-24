<template>
  <div class="question-notice toast">
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

.ready-notice {
  /* height: 40vh; */
}

</style>