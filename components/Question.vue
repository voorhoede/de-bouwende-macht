<template>
  <div :class="`question toast card${(minified) ? ' minified' : ''}`">
      <button class="minify-button" @click="toggleMinified">
        <chevron />
        <span class="a11y-sr-only">Minify</span>
      </button>
      <p class="current-question">
        {{ currentQuestion.question }}
      </p>

      <div class="answers">
        <button
          :ref="'answer'"
          class="answer-button"
          v-for="(answer, index) in currentQuestion.answers"
          @click="onClickButton(answer, currentQuestion)" :key="index"

        >
          {{ answer.label }}
        </button>
      </div>
  </div>
</template>

<script>

import Chevron from '~/static/images/chevron-down.svg'

export default {
  components: { Chevron },
  data () {
    return { minified: false }
  },
  props: ['currentQuestion', 'answerFeedback'],
  methods: {
    onClickButton (answer, currentQuestion) {
      if (navigator.doNotTrack !== '1') {
        this.$ga.event({
          eventCategory: 'question',
          eventAction: 'answer',
          eventLabel: currentQuestion.question,
          eventValue: answer.label
        })
      }
      this.$nextTick( () => {
        this.$refs.answer[0].focus()
      })
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
  transition: transform .5s;
  margin-left: -1rem;
  background-color: transparent;
}
.minified {
  transform: translateY(calc(100% - 2rem));
}
.minified .minify-button svg {
  transform: rotateZ(180deg);
}
.minify-button svg {
  fill: var(--green);
}
.minify-button:hover svg,
.minify-button:focus svg {
  fill: var(--green-dark);
}
.minify-button:active {
  box-shadow: none;
  transform: none;
}

</style>
