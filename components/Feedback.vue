<template>
  <div class="feedback toast">
    <p>{{ feedback }}</p>
    <button class="button-primary" @click="onClickButton()">Speel!</button>
  </div>
</template>

<script>

export default {
  props: ['feedback'],
  methods: {
    onClickButton () {
      this.$emit('onClick')
      this.$store.commit('clearFeedback')
    }
  }
}

</script>

<style scoped>

@import '~/assets/core.css';

.feedback {
  height: 40vh;
}

</style>