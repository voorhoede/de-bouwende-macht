<template>
  <section class="full-screen">
    <div>
      <button
        class="close-button"
        @click="onClickButton()"
      >
        &#10006;
      </button>  
      <h1 class="page-title">{{ page.title }}</h1>
      <div class="content" v-html="page.content"></div>
      <a class="button button-primary" :href="page.callToAction[0].url">{{ page.callToAction[0].label }}</a>
    </div>
  </section>
</template>

<script>
import page from '~/static/data/about.json'

export default {
  data () {
    return { page }
  },
  methods: {
    onClickButton () {
      this.$emit('onClick')
    }
  }
}

</script>

<style scoped>

@import '~/assets/core.css';

.close-button {
  position: absolute;
  right: 0;
  top: 0;
  color: var(--pink);
  font-size: 1.25rem;
}

.close-button:hover,
.close-button:focus {
  color: var(--pink-secondary);
}

.full-screen > div {
  margin: 0 auto;
}

</style>
