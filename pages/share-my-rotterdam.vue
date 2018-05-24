<template>
  <section class="container">
    <h1>
      Deel mijn Rotterdam
    </h1>
    <div id="my-rotterdam">
      <city-map />
      <p>Cheers uit my Rotterdam!</p>
    </div>
  </section>
</template>

<script>
import CityMap from '~/components/Map.vue'
import { mapState } from 'vuex'

export default {
  components: { CityMap },
  data () {
    return {
      blob: null,
    }
  },
  mounted: () => {
    console.log('hi!')
    console.log(this.currentScenario)
    const el = document.getElementById('CALYPSO')
    el.classList.remove('hidden')
  },
}
</script>


<style scoped>

@import '~/assets/core.css';

</style>