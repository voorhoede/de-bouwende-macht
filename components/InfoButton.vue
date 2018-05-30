<template>
  <button
    class="info-button"
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
@import '~/assets/core.css';

.info-button {
  display: flex;
  justify-content: center;
  height: var(--button-size);
  width: var(--button-size);
  background-color: var(--pink);
  border-radius: 50%;
  color: white;
  font-family: var(--font-bold);
  font-size: 1.75rem;
  text-decoration: none;
  line-height: 1rem;
  box-shadow: var(--box-shadow);
}

.info-button:hover,
.info-button:focus {
  background-color: var(--pink-secondary);
}

</style>
