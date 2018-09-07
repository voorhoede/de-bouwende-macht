<template>
  <div class="city-map">
    <div class="city-map__content">
      <map-graphic :style="`width: ${mapWidth}; height: ${mapHeight}`"  />
    </div>
  </div>
</template>

<script>
import svgClassList from '~/lib/svg-class-list.js'
import MapGraphic from '~/static/images/city-map.svg'

const width = 764.75
const height = 545.87
const aspectRatio = width / height // higher is longer

export default {
  props: ['visibleBuildings'],
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
  components: { MapGraphic },
  mounted () {
    this.visibleBuildings.forEach(building => {
      svgClassList(document.getElementById(building.toUpperCase()))
        .remove('hidden')
    })
  },
}

 </script>

<style>
@import '~/assets/core.css';

.city-map {
  overflow: scroll;
  padding: 0;
  height: 100vh;
  width: 100vw;
}

.city-map__content {
  display: block;
}

.city-map .hidden {
  opacity: 0;
}

.slide {
  animation: slideIn 1.2s;
}

.shake {
  animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

</style>
