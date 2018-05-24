<template>
  <div class="toast">
    <div>
      <p class="current-question">{{ currentQuestion.question }}</p>
      
      <div class="answers">
        <button class="answer-button" v-for="(answer, index) in currentQuestion.answers" @click="onClickButton(answer)" :key="index">{{ answer.label }}</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: ['currentQuestion', 'answerFeedback'],
  methods: {
    onClickButton (answer) {
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
