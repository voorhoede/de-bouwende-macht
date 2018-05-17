<template>
  <section class="container">
    <h1>Mijn Rotterdam</h1>
    <p class="intro" >Welkom in jouw Rotterdam! Hier bouw jij aan de stad van jouw keuze en het canvas is blanco. Laten we beginnen!</p>
    <button @click="startGame()">Start Game</button>
    
    <div>
      <h2>Current scenario:</h2>
      <div class="current-scenario" v-if="currentScenario">
        <p v-for="(location, index) in currentScenario" :key="index">{{ location }}</p>
      </div>
    </div>

    <ready-dialog v-if="questionsCount > 3" />
    <p v-if="gameEnded">There are no more questions.</p>

    <transition name="slideIn">
      <question-dialog 
        v-if="!gameEnded" 
        :currentQuestion="currentQuestion" 
        :answerFeedback="answerFeedback" 
        @onAnswer="handleAnswer" 
      />
    </transition>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import QuestionDialog from '~/components/QuestionDialog.vue'
import ReadyDialog from '~/components/ReadyDialog.vue'

export default {
  components: { QuestionDialog, ReadyDialog },
  data () {
    return {
      answerFeedback: null,
      showQuestionDialog: this.gameStarted
    }
  },
  computed: mapState({
    questions: state => state.questions,
    questionsCount: state => state.questionsCount,
    currentQuestion: state => state.currentQuestion,
    currentScenario: state => state.currentScenario,
    gameStarted: state => state.gameStarted,
    gameEnded: state => !state.questions.length
  }),
  methods: {
    startGame () {
      this.$store.commit('resetState')
      this.$store.commit('startGame')
      this.$store.commit('nextQuestion')
      this.toggleDialog()
    },

    handleAnswer(answer) {
      const outcomes = answer.outcome
      const store = this.$store
  
      store.commit('increment')

      const followUpQuestion = outcomes.filter(outcome => outcome.itemType === 'question')
      const results = outcomes.filter(outcome => outcome.itemType === 'result')

      if (results.length > 0) {
        results.map(result => {
          this.answerFeedback = result.feedback
          store.commit('updateCity', result.slug)
        })
      }

      if (followUpQuestion.length === 0) {
        store.commit('nextQuestion')
      } else {
        store.commit('followUpQuestion', followUpQuestion[0])
      }
    },

    toggleDialog () {
      this.showQuestionDialog = !this.showQuestionDialog
    },
    endGame () {
      store.commit('endGame');
    }
  }
}
</script>

<style scoped>
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

.current-scenario {
  margin-bottom: 2rem;
}

.feedback {
  background-color: #7fffd4;
  padding: 1rem;
  margin: 2rem 0;
}
</style>
