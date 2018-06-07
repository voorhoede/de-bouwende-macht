<template>
  <div class="postal-card">
    <city-map :visibleBuildings="buildings" />
    <p class="postal-card-text">Groeten uit mijn Rotterdam!</p>
  </div>
</template>

<script>
import CityMap from '~/components/Map.vue'

export default {
  props: ['buildings'],
  components: { CityMap }
}
</script>

<style scoped>
@import '~/assets/core.css';

.postal-card {
  padding: .8rem;
  box-shadow: var(--box-shadow);
  transform: rotate(-4deg);
  margin: 0 auto 3rem auto;
  width: 80%;
  max-width: 600px;
  background-color: var(--white);
}

.postal-card .city-map {
  height: auto;
  width: auto;
  overflow: hidden;
}

.postal-card-text {
  margin-bottom: 0;
  font-family: 'Dancing Script';
  font-weight: bold;
  color: var(--pink);
}

@media screen and (max-width: 430px) {
  .postal-card {
    padding: var(--spacing-half);
    width: 95%;
  }
}

@media screen and (max-width: 632px) {
  .postal-card-text {
    font-size: 1.5rem;
  }
}

@media screen and (min-width: 632px) {
  .postal-card {
    margin-bottom: var(--spacing-normal);
  }
  
  .postal-card-text {
    font-size: var(--font-size-big);
  }
}

</style>
