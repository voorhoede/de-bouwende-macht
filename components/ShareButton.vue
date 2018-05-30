<template>
  <nuxt-link 
    class="share-button"
    :to="'/share/?buildings=' + slug"
  >
    <share-icon class="share-icon" />
    {{ label }}
  </nuxt-link>
</template>

<script>
import ShareIcon from '~/static/images/share-icon.svg'

export default {
  props: ['slug', 'label'],
  components: { ShareIcon }
}

</script>

<style scoped>

@import '~/assets/core.css';

.share-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  margin-bottom: var(--spacing-double);
  padding: var(--spacing-half) var(--spacing-normal);
  width: 250px;
  text-decoration: none;
  box-shadow: var(--box-shadow);
}

.share-button:hover,
.share-button:focus {
  background-color: var(--pink-secondary);
  color: var(--white);
}

.share-button:hover .share-icon {
  fill: var(--white);
}

.share-button-rounded {
  justify-content: center;
  position: relative;
  z-index: 1;
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

.share-button-rounded:before {
  content: '';
  width: var(--button-size);
  height: var(--button-size);
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  border-radius: 50%;
  animation-name: glow;
  animation-duration: 2s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
  animation-iteration-count: 5;
}

.share-button-rounded .share-icon {
  fill: var(--white);
}

.share-icon {
  width: auto;
  height: 20px;
  fill: var(--pink);
}

</style>
