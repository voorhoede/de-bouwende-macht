<template>
  <div class="feedback toast">
    <img class="character" src="~static/images/ambtenaar.svg">
    <p>{{ feedback }}</p>
    <button class="button-primary" @click="onClickButton">Bouw verder</button>
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

</style>