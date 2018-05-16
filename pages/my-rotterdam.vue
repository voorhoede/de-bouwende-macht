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

    <ready-button v-if="questionsCount > 3" />

    <transition name="slideIn">
      <question-dialog v-if="showQuestionDialog" :currentQuestion="currentQuestion" :answerFeedback="answerFeedback" @onAnswer="handleAnswer" />
    </transition>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import QuestionDialog from '~/components/QuestionDialog.vue'
import ReadyButton from '~/components/ReadyButton.vue'

export default {
  components: { QuestionDialog, ReadyButton },
  data () {
    return {
      answerFeedback: null,
      showQuestionDialog: false
    }
  },
  computed: mapState({
    questions: state => state.questions,
    questionsCount: state => state.questionsCount,
    currentQuestion: state => state.currentQuestion,
    currentScenario: state => state.currentScenario,
    gameStarted: state => state.gameStarted
  }),
  methods: {
    startGame () {
      this.$store.commit('startGame')
      this.$store.commit('nextQuestion')

      this.toggleDialog()
    },

    handleAnswer(answer) {
      const store = this.$store
  
      store.commit('increment')

      if (!answer.outcome.question) {
        store.commit('nextQuestion')
      }

      answer.outcome.map(item => {
        if (item.title) {
          store.commit('updateCity', item.slug)
          this.answerFeedback = item.feedback
        }

        if (item.question) {
          store.commit('followUpQuestion', item)
        } 
      })
    },

    toggleDialog () {
      this.showQuestionDialog = !this.showQuestionDialog
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
