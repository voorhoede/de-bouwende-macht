<template>
  <section class="container">
    <div class="map-wrapper">
      <city-map class="city-map" />
    </div>

    <div v-if="!gameStarted" class="toast center">
      <h1 class="intro-title">Mijn Rotterdam</h1>
    
      <div class="intro">
        <p class="intro-text" >Welkom in jouw Rotterdam! Hier bouw jij aan de stad van jouw keuze en het canvas is blanco. Laten we beginnen!</p>
        <button class="button-primary" @click="startGame()">Bouw jouw Rotterdam</button>
      </div>
    </div>

    <div v-if="gameStarted">
      <h2>Current scenario:</h2>
      <div class="current-scenario" v-if="currentScenario">
        <p
          v-for="(location, index) in currentScenario"
          :key="index">{{ location }}
        </p>
      </div>
    </div>

    <transition name="slow-slide-up">
      <ready-notice
        v-if="showReadyNotice"
        @onClick="play"
        :buildings="citySlug"
      />
    </transition>

    <nuxt-link
      v-if="continuePlaying"
      class="button button-primary"
      to="/share-my-rotterdam" >
      Dit is mijn Rotterdam!
    </nuxt-link>

    <transition name="slow-slide-up">
      <question-notice
        v-if="showNotice && !showQuestion && !showFeedback && !gameEnded"
        @onClick="play"
      />
    </transition>

    <transition name="slide-up">
      <feedback
        :feedback="answerFeedback"
        v-if="showFeedback && !showQuestion && !showNotice && !showReadyNotice"
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
import ReadyNotice from '~/components/ReadyNotice.vue'
import Feedback from '~/components/Feedback.vue'
import CityMap from '~/components/Map.vue'

export default {
  components: { Question, QuestionNotice, ReadyNotice, Feedback, CityMap },
  data () {
    return {
      answerFeedback: null,
      citySlug: '',
    }
  },
  computed: mapState({
    questions: state => state.questions,
    questionsCount: state => state.questionsCount,
    currentQuestion: state => state.currentQuestion,
    currentScenario: state => state.currentScenario,
    showQuestion: state => state.showQuestion,
    showNotice: state => state.showNotice,
    showFeedback: state => state.showFeedback,
    showReadyNotice: state => state.showReadyNotice,
    gameStarted: state => state.gameStarted,
    gameEnded: state => !state.questions.length,
    continuePlaying: state => state.continuePlaying
  }),
  methods: {
    startGame () {
      this.$store.commit('startGame')
      this.$store.commit('showNotice')
    },

    play () {
      this.$store.commit('hideFeedback')
      this.$store.commit('hideNotice')
      this.$store.commit('hideReadyNotice')
      this.$store.commit('nextQuestion')
      this.$store.commit('showQuestion')
 
      if (this.showReadyNotice) {
        this.$store.commit('hideReadyNotice')
        this.$store.commit('showReadyButton')
      }

      if (this.showFeedback) {
        this.$store.commit('hideFeedback')
        this.answerFeedback = null;
      }
    },

    nextQuestion () {
      this.$store.commit('hideQuestion')
      this.$store.commit('showNotice')
    },

    handleAnswer(answer) {
      const outcomes = answer.outcome
      const followUpQuestion = outcomes.filter(outcome => outcome.itemType === 'question')
      const results = outcomes.filter(outcome => outcome.itemType === 'result')
      const consequences = outcomes.filter(outcome => outcome.itemType === 'consequence')

      if (consequences.length) {
        consequences.map(consequence => {
          const newConsequence = consequence.delete[0]
          this.removeBuildings(newConsequence.slug)
        })
      }

      if (results.length > 0) {
        results.map(result => {
          if (result.feedback && result.feedback.length > 1) {
            this.answerFeedback = result.feedback
            this.$store.commit('hideQuestion')
            this.$store.commit('hideNotice')
            this.$store.commit('showFeedback')
          }
        
          this.updateCity(result.slug)
        })
      }

      if (followUpQuestion.length === 0) {
        this.$store.commit('hideQuestion')
        this.nextQuestion()
      
        if (this.questionsCount === 3) {
          this.$store.commit('hideNotice')
          this.$store.commit('showReadyNotice')
        } else {
          this.$store.commit('showNotice')
        }
      } else {
      this.$store.commit('followUpQuestion', followUpQuestion[0])
    }
    },
    updateCity(slug) {
      const id = slug.toUpperCase();
      const el = document.getElementById(id)
      if (el === null) {
        console.log(slug)
        return false
      }

      el.classList.remove('hidden')
      
      this.$store.commit('updateCity', slug)
    },

    removeBuildings(slug) {
      const id = slug.toUpperCase()
      const el = document.getElementById(id)

      if (el === null) {
        console.log(slug)
        return false
      }

      el.classList.add('hidden')
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

.center {
  left: 1rem;
  right: 1rem;
  bottom: 30%;
}

.city-map {
  height: 100%;
  width: auto;
}

.intro-title {
  padding-bottom: 1.5rem;
  font-size: var(--font-size-big);
}

.intro-text {
  margin-bottom: 3rem;
}

.map-wrapper {
  height: 100%;
  overflow: hidden;
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
  transition: all .4s ease;
}
.slide-up-leave-active {
  transition: all .6s ease;
}
.slide-up-enter, .slide-up-leave-to {
  transform: translatey(100%);
}

.slow-slide-up-enter-active,
.slow-slide-up-leave-active {
  transition: all .4s ease 1.5s;
}
.slow-slide-up-leave-active {
  transition: all .6s ease;
}
.slow-slide-up-enter, .slide-up-leave-to {
  transform: translatey(100%);
}
</style>
