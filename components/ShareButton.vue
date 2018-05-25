<template>
  <button class="share-button" @click="share">
    <img class="share-icon" src="~static/images/share-button.svg">
  </button>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState({
    slugs: state => state.currentScenario
  }),

  methods: {
    share () {
      const slugs = this.slugs.join('-')

      this.$router.push(`share-my-rotterdam/${slugs}`)
    }
  }
}
</script>

<style scoped>
@import '~/assets/core.css';

.share-button {
  padding: 0;
  width: var(--button-size);
  height: var(--button-size);
  border-radius: 50%;
  animation-name: bounce-in;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}

.share-icon {
  width: 40px;
  height: 40px;
  animation-name: bounce-in;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}

.share-button:before {
  content: '';
  width: 40px;
  height: 40px;
  border-radius: 50%;
  animation-name: glow;
  animation-duration: 2s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
  animation-iteration-count: 5;
  background-color: #fff;
}
</style>
