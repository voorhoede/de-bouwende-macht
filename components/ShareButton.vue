<template>
  <nuxt-link 
    class="share-button"
    :to="'/share'"
  >
    <share-icon class="share-icon" />
    {{ label }}
  </nuxt-link>
</template>

<script>
import ShareIcon from '~/static/images/share-icon.svg'

export default {
  props: ['label'],
  components: { ShareIcon }
}

</script>

<style scoped>

@import '~/assets/core.css';

.share-button {
  color: var(--pink) !important;
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
  color: var(--white) !important;
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

.share-button-rounded .share-icon {
  fill: var(--white);
}

.share-icon {
  width: auto;
  height: 20px;
  fill: var(--pink);
}

</style>
