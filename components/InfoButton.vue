<template>
  <button
    class="button-round"
    @click="onClickButton()"
  >
    <span>?</span>
  </button>
</template>

<script>
export default {
  methods: {
    onClickButton () {
      this.$emit('onClick')
    }
  }
}
</script>

<style scoped>

</style>
