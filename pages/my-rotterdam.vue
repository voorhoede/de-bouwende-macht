<template>
  <section class="container">
    <h1>Mijn Rotterdam</h1>
    
    <div v-if="!gameStarted" class="intro">
      <p class="intro" >Welkom in jouw Rotterdam! Hier bouw jij aan de stad van jouw keuze en het canvas is blanco. Laten we beginnen!</p>
      <button @click="startGame()">Bouw jouw Rotterdam</button>
    </div>

    <div>
      <h2>Current scenario:</h2>
      <div class="current-scenario" v-if="currentScenario">
        <p
          v-for="(location, index) in currentScenario"
          :key="index">{{ location }}
        </p>
      </div>
    </div>

    <transition name="slide-up">
      <question-notice
        class="toast"
        v-if="showNotice && !showQuestion &&!gameEnded"
        @onClick="play" 
      />
    </transition>

    <div v-if="gameEnded">
      <p>Dit is jouw Rotterdam!</p>
      <nuxt-link to="/share-my-rotterdam">Delen</nuxt-link>  
    </div>

    <transition name="slide-up">
      <question 
        v-if="showQuestion" 
        :currentQuestion="currentQuestion" 
        :answerFeedback="answerFeedback" 
        @onAnswer="handleAnswer" 
      />
    </transition>

  </section>
</template>

<script>
import { mapState } from 'vuex'
import Question from '~/components/Question.vue'
import QuestionNotice from '~/components/QuestionNotice.vue'

export default {
  components: { Question, QuestionNotice },
  data () {
    return {
      answerFeedback: null
    }
  },
  computed: mapState({
    questions: state => state.questions,
    currentQuestion: state => state.currentQuestion,
    currentScenario: state => state.currentScenario,
    showQuestion: state => state.showQuestion,
    showNotice: state => state.showNotice,
    gameStarted: state => state.gameStarted,
    gameEnded: state => !state.questions.length
  }),
  methods: {
    startGame () {
      this.$store.commit('startGame')
      this.$store.commit('showQuestion')
      this.$store.commit('nextQuestion')
    },

    play () {
      this.$store.commit('showQuestion')
    },

    nextQuestion () {
      const isMainQuestion = !this.currentQuestion.followUp

      if (isMainQuestion) {
        this.$store.commit('increment')
      }

      this.$store.commit('nextQuestion')
    },

    handleAnswer(answer) {
      const outcomes = answer.outcome
      const followUpQuestion = outcomes.filter(outcome => outcome.itemType === 'question')
      const results = outcomes.filter(outcome => outcome.itemType === 'result')

      if (results.length > 0) {
        results.map(result => {
          this.answerFeedback = result.feedback
          this.$store.commit('updateCity', result.slug)
        })
      }

      if (followUpQuestion.length === 0) {
        this.$store.commit('hideQuestion')
        this.$store.commit('showNotice')
        this.nextQuestion()
      } else {
        this.$store.commit('followUpQuestion', followUpQuestion[0])
      }
    },

    endGame () {
      this.$store.commit('endGame');
    }
  },
  transition(to, from) {
    if (!from) return 'slide-left'
    return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  },
}
</script>

<style scoped>

@import '~/assets/core.css';

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

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all .3s ease;
}
.slide-up-leave-active {
  transition: all .5s ease;
}
.slide-up-enter, .slide-up-leave-to {
  transform: translatey(100%);
}

</style>
