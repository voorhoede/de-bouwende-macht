<template>
  <div class="toast card">
    <div>
      <p class="current-question">{{ currentQuestion.question }}</p>
      
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
  </div>
</template>

<script>

export default {
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
    }
  }
}

</script>

<style scoped>
@import '~/assets/core.css';

.current-question {
  margin-bottom: 2rem;
}
</style>
