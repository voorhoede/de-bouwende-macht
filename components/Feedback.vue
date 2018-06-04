<template>
  <div class="feedback toast card">
    <civil-servant class="character" />
    <p>{{ feedback }}</p>
    <button class="button-primary" @click="onClickButton">Bouw verder</button>
  </div>
</template>

<script>
import CivilServant from '~/static/images/civil-servant.svg'

export default {
  components: { CivilServant },
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
