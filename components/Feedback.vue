<template>
  <div class="feedback toast card">
    <ambtenaar class="character" />
    <p>{{ feedback }}</p>
    <button class="button-primary" @click="onClickButton">Bouw verder</button>
  </div>
</template>

<script>
import Ambtenaar from '~/static/images/ambtenaar.svg'

export default {
  components: { Ambtenaar },
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