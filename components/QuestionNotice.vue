<template>
  <div class="question-notice toast card">
    <img class="character" src="~static/images/bob-bouwer.svg" width="100" height="100">
    <p>{{ content }}</p>
    <button class="button-primary" @click="onClickButton()">Speel!</button>
  </div>
</template>

<script>

export default {
  props: ['content'],
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
