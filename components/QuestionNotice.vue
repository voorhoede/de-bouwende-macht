<template>
  <div class="question-notice toast">
    <p>Er is een bouwvraag!</p>
    <button @click="onClickButton()">Speel!</button>
  </div>
</template>

<script>

export default {
  methods: {
    onClickButton () {
      this.$emit('onClick')
    }
  }
}

</script>

<style scoped>

.question-notice {
  width: 100%;
  height: 40vh;
}

</style>
