<template>
  <nuxt-link 
    class="share-button"
    :to="'share-my-rotterdam/?buildings=' + slug"
  >
    <img class="share-icon" src="~static/images/share-icon.svg">
  </nuxt-link>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['slug'],
}
</script>

<style scoped>

@import '~/assets/core.css';

.share-button {
  padding: 0;
  width: var(--button-size);
  height: var(--button-size);
  background-color: var(--pink);
  border-radius: 50%;
  animation-name: bounce-in;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}

.share-icon {
  width: 22px;
  height: auto;
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
  background-color: var(--white);
  animation-name: glow;
  animation-duration: 2s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
  animation-iteration-count: 5;
}

.share-button:hover,
.share-button:focus {
  background-color: var(--pink-secondary);
}

</style>
