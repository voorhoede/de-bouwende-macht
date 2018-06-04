<template>
  <div class="question-notice toast card">
    <construction-worker class="character" />
    <p>{{ content }}</p>
    <button class="button-primary" @click="onClickButton()">Speel!</button>
  </div>
</template>

<script>
import ConstructionWorker from '~/static/images/construction-worker.svg'

export default {
  components: { ConstructionWorker },
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
