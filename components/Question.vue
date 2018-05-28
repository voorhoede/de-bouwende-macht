<template>
  <div :class="`question toast card${(minified) ? ' minified' : ''}`">
      <button class="minify-button" @click="toggleMinified">
        <span class="a11y-sr-only">Minify</span>
      </button>
      <p class="current-question">
        {{ currentQuestion.question }}
      </p>

      <div class="answers">
        <button
          class="answer-button"
          v-for="(answer, index) in currentQuestion.answers"
          :key="index"
          @click="onClickButton(answer)"
        >
          {{ answer.label }}
        </button>
      </div>
  </div>
</template>

<script>

export default {
  data () {
    return { minified: false }
  },
  props: ['currentQuestion', 'answerFeedback'],
  methods: {
    onClickButton (answer) {
      this.$emit('onAnswer', answer)
    },
    toggleMinified () {
      this.minified = !this.minified
    }
  }
}

</script>

<style>
@import '~/assets/core.css';
.question {
  transition: transform .5s;
}
.current-question {
  margin-bottom: 2rem;
}
.minify-button {
  position: absolute;
  top: 0;
  width: 4rem;
  height: 2rem;
  margin-left: -2rem;
  transition: transform .5s;
}
.minified {
  transform: translateY(calc(100% - 2rem));
}
.minified .minify-button {
  transform: rotateZ(180deg);
}
</style>
