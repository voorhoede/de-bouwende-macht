<template>
  <div class="question-notice">
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
  padding: 2rem;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: white;
  box-shadow: 10px 10px 10px 10px #ccc;
}

</style>
