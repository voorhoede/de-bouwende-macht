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
  height: 40px;
  width: 40px;
  background-color: var(--pink);
  border-radius: 50%;
  color: white;
  font-size: 1.75rem;
  text-decoration: none;
  line-height: 1rem;
}

</style>
