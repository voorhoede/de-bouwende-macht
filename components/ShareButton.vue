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
  width: 40px;
  height: 40px;
  opacity: 0;
  border-radius: 50%;
  animation-name: bounceIn;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(.3);
  }

  50% {
    opacity: .9;
    transform: scale(1.1);
  }

  80% {
    opacity: 1;
    transform: scale(.89);
  }

  100% {
    opacity: 1;
    transform: scale(1) translate3d(0,0,0);
  }
}

@keyframes glow {
  50% {
    transform: scale(1.3);
  }
}

.share-icon {
  width: 40px;
  height: 40px;
  animation-name: bounceIn;
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
