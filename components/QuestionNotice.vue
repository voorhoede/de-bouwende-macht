<template>
  <div class="question-notice toast card">
    <bob-bouwer class="character" />
    <p>{{ content }}</p>
    <button class="button-primary" @click="onClickButton()">Speel!</button>
  </div>
</template>

<script>
import BobBouwer from '~/static/images/bob-bouwer.svg'

export default {
  components: { BobBouwer },
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