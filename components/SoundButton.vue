<template>
  <button
    class="button-round"
    @click="onClickButton()"
  >
    <sound-on v-if="playSound" class="sound-icon" />
    <sound-off v-else class="sound-icon" />
  </button>
</template>

<script>

import SoundOn from '~/static/images/sound-on.svg'
import SoundOff from '~/static/images/sound-off.svg'

export default {
  props: ['playSound'],
  components: { SoundOn, SoundOff },
  methods: {
    onClickButton () {
      this.$emit('onClick')
    }
  }
}
</script>

<style scoped>

.sound-icon {
  display: block;
  width: 24px;
}

</style>
