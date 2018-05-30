<template>
  <div class="city-map">
    <div class="city-map__content">
      <map-graphic :style="`width: ${mapWidth}; height: ${mapHeight}`"  />
    </div>
  </div>
</template>

<script>
import MapGraphic from '~/assets/map.svg'

const width = 764.75
const height = 545.87
const aspectRatio = width / height // higher is longer

export default {
  data () {
    return { aspectRatio }
  },
  computed: {
    windowAspectRatio () {
      return (process.client) ? document.body.clientWidth / document.body.clientHeight : (4 / 3)
    },
    mapWidth () {
      return (this.aspectRatio < this.windowAspectRatio) ? '104vw' : `${Math.floor(104 * this.aspectRatio)}vh`
    },
    mapHeight () {
      return (this.aspectRatio > this.windowAspectRatio) ? '104vh' : `${Math.floor(104 / this.aspectRatio)}vw`
    }
  },
  components: { MapGraphic }
}
</script>

<style>
.city-map {
  height: 100vh;
  width: 100vw;
  overflow: scroll;
  padding: 0;
}
.city-map__content {
  display: block;
  margin: -4vh -2vw 0;
}
.city-map .hidden {
  opacity: 0;
}
.city-map .fade-in {
  -webkit-animation: bounce-in 1s;
  animation: bounce-in 1s;
}

@-webkit-keyframes bounce-in {
  0% {
    -webkit-transform: scale(0);
  }

  50% {
    -webkit-transform: scale(1.2);
  }

  100% {
    -webkit-transform: scale(1);
  }
}

@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: scale(0);
  }

  50% {
    opacity: 50%;
    transform: scale(1.2);
  }

  100% {
    opacity: 100%;
    transform: scale(1);
  }
}
</style>
