<template>
  <nuxt-link
    class="share-button"
    to="/share-my-rotterdam"
  >
    <img class="share-icon" src="~static/images/share-button.svg">
  </nuxt-link>
</template>

<script>
export default {
  
}
</script>

<style scoped>
@import '~/assets/core.css';

.share-button {
  display: block;
  height: var(--button-size);
  width: var(--button-size);
  margin-bottom: var(--spacing-half);
  background-color: white;
  border-radius: 50%;
  box-shadow: var(--box-shadow);
}

.share-icon {
  height: var(--button-size);
  width: var(--button-size);
}

</style>
