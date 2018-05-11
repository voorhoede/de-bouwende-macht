<template>
  <section class="container">
    <h1>Mijn Rotterdam</h1>
    <p class="intro" >Welkom in jouw Rotterdam! Hier bouw jij aan de stad van jouw keuze en het canvas is blanco. Laten we beginnen!</p>
    <button @click="$store.commit('nextQuestion')">Start Game</button>
    
    <div v-if="gameEnded">
      <h2>Congratulations! This is your Rotterdam:</h2>
      <div>
        <h3>Current scenario:</h3>
        <div class="current-scenario" v-if="currentScenario">
          <p v-for="(location, index) in currentScenario" :key="index">{{ location }}</p>
        </div>
      </div>
      <button>Share</button>
    </div>
    <div v-else >
      <div>
        <h2>Current scenario:</h2>
        <div class="current-scenario" v-if="currentScenario">
          <p v-for="(location, index) in currentScenario" :key="index">{{ location }}</p>
        </div>
      </div>

      <h2>Question:</h2>
      <div v-if="currentQuestion">
        <p class="current-question">{{ currentQuestion.question }}</p>
        <button class="answers" v-for="(answer, index) in currentQuestion.answers" @click="handleAnswer(answer)" :key="index">{{ answer.answer }}</button>
      </div>

      <div class="feedback" v-if="answerFeedback">{{ answerFeedback }}</div>

      <p>Questions answered: {{ questionsCount }}</p>

      <button @click="$store.commit('endGame')">Ready</button>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      answerFeedback: null,
    }
  },
  computed: mapState({
    questions: state => state.questions,
    questionsCount: state => state.questionsCount,
    currentQuestion: state => state.currentQuestion,
    currentScenario: state => state.currentScenario,
    gameEnded: state => state.gameEnded
  }),
  methods: {
    handleAnswer({ outcome }) {
      const store = this.$store
      
      store.commit('increment')

      if (outcome.locations) {
        store.commit('updateCity', outcome.locations)
      }

      if (outcome.feedback) {
        this.answerFeedback = outcome.feedback
      }

      if (outcome.question) {
        store.commit('addFollowUpQuestion', outcome.question)
      } else {
        store.commit('nextQuestion')
      }
    }
  }
}
</script>

<style>
.container {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

h1, h2 {
  margin: 1rem 0;
}

button {
  background-color: #ccc;
  padding: .5rem 1rem;
  margin-bottom: 1rem;
  font-size: 1rem;
}

button:hover {
  cursor: pointer;
}

.intro {
  margin-bottom: 1rem;
}

.current-question {
  margin-bottom: 2rem;
}

.current-scenario {
  margin-bottom: 2rem;
}

.answers {
  padding: .5rem 1rem;
  background-color: #ffdddd;
  width: 100%;
}

.feedback {
  background-color: #7fffd4;
  padding: 1rem;
  margin: 2rem 0;
}
</style>
