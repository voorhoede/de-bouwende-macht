<template>
  <div class="question-dialog">
    <div>
      <p class="current-question">{{ currentQuestion.question }}</p>
      
      <div class="answers">
        <button class="answer" v-for="(answer, index) in currentQuestion.answers" @click="onClickButton(answer)" :key="index">{{ answer.label }}</button>
      </div>
    </div>

    <div class="feedback" v-if="answerFeedback">{{ answerFeedback }}</div>
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

.question-dialog {
  width: 100%;
  height: 40vh;
  padding: 2rem;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: white;
  box-shadow: 10px 10px 10px 10px #ccc;
}

.current-question {
  margin-bottom: 2rem;
}

.answer {
  background-color: #ccc;
  font-size: 1rem;
  margin-bottom: .5rem;
  padding: .5rem;
  display: block;
  width: 100%;
}

.answer:hover {
  cursor: pointer;
}

.answers {
  max-width: 600px;
  margin: 0 auto;
}

</style>
