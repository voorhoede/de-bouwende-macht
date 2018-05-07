<template>
  <section>
    <h1>
      Mijn Rotterdam
    </h1>

    <button @click="$store.commit('nextQuestion')">Start Game</button>
    <div v-if="currentQuestion">
      <p>{{ currentQuestion.question }}</p>
      <button v-for="(answer, index) in currentQuestion.answers" @click="handleAnswer(answer)" :key="index">{{ answer.answer }}</button>
    </div>

    <p>{{ questions }}</p>
  </section>
</template>

<script>

export default {
  computed: {
    currentQuestion () {
      return this.$store.state.currentQuestion
    },
    questions () {
      return this.$store.state.questions
    }
  },
  methods: {
    handleAnswer(answer) {
      this.$store.commit('increment')
      
      const consequence = answer.consequences[0]
      if (consequence.question) {
        this.$store.commit('insertQuestion', consequence)
      } else {
        console.log(consequence.outcome.ref)
        // this.$store.commit('changeCity') ???
      }

      return this.$store.commit('nextQuestion')
    }
  }
}


// question
//   answers
//     yes
//       question
//       answers
//         yes
//           question
//           answer
//             outcome
        
//         no
//           outcome
    
//     no
//       outcome

</script>
