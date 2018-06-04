<template>
  <a href="https://versbeton.nl/" class="logo" target="_blank">
    <img src="~static/images/vers-beton-logo.png" >
  </a>
</template>

<style>
@import '~/assets/core.css';

.logo {
  position: absolute;
  left: var(--spacing-half);
  top: var(--spacing-half);
  height: auto;
  width: 75px;
  z-index: 1;
}

.logo img {
  max-width: 100%;
}

@media screen and (min-width: 600px) {
  .logo {
    width: 120px;
  }
}
</style>
