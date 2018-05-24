git<template>
  <nuxt-link
    class="share-button"
    to="/share-my-rotterdam" >
    
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
  margin-bottom: var(--spacing-half);
  background-color: white;
  border-radius: 50%;
}

.share-icon {
  width: 40px;
  height: 40px;
}

</style>
