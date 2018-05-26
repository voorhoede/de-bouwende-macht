<template>
  <section class="container">

    <div class="map-wrapper">
      <city-map class="city-map" />
    </div>

      <div class="card center">

      <div class="logo">
        <img src="~static/images/vers-beton-logo.png" >
      </div>  
      
      <h1>De Bouwende Macht</h1>

      <transition name="slide" mode="out-in">
        <div class="intro" key="3" v-if="firstPart">
          <p>
            Vers Beton, het online tijdschrift voor de harddenkende Rotterdammer, heeft
            <a class="link-primary" href="https://versbeton.nl/harde-kern/de-bouwende-macht/">een onderzoek</a>
            gedaan naar de machtige spelers van bouwend Rotterdam.
          </p>
          <p>
            Hieruit bleek dat er sinds kort een nieuwe speler aan tafel zit met invloed.
          </p>
          <button class="link-primary" @click="firstPart = !firstPart">Wie dat is?</button>
        </div>

        <div class="intro" key="1" v-if="!firstPart">
          <p>
            ...dat ben jij, de Rotterdamse burger!
          </p>
          <p>
            Burgers hebben steeds vaker invloed op hoe de stad eruit komt te zien. Maar wat wil de
            Rotterdammer? Dat gaan we in deze game onderzoeken.
          </p>
          <nuxt-link to="/my-rotterdam" class="button button-primary">Speel het spel!</nuxt-link>
        </div>

      </transition>

    </div>

  </section>
</template>

<style scoped>

@import '~/assets/core.css';

.logo {
  position: absolute;
  left: 0;
  right: 0;
  top: 8px;
  top: -1.25rem;
  height: auto;
  width: 75px;
  margin: 0 auto;
}

.logo img {
  max-width: 100%;
}

@media screen and (min-width: 600px) {
  .logo {
    width: 120px;
    top: -2rem;
  }
}

.slide-leave-active,
.slide-enter-active {
  transition: .5s;
}

.slide-enter {
  transform: translateX(0%);
  opacity: 1;
}
.slide-leave-to {
  transform: translateX(-5%);
  opacity: 0;
}

.intro {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 30vh;
}

</style>

<script>

import CityMap from '~/components/Map.vue'

export default {
  components: { CityMap },
  data () {
    return {
      firstPart: true,
      secondPart: false
    }
  },
}

</script>