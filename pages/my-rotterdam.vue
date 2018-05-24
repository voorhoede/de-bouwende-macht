<template>
  <section class="container">
    <div class="map-wrapper">
      <city-map class="city-map" />
    </div>

    <div v-if="!gameStarted && (questions.length === 9)" class="toast center">
      <h1 class="intro-title">Mijn Rotterdam</h1>
    
      <div class="intro">
        <p class="intro-text" >Welkom in jouw Rotterdam! Hier bouw jij aan de stad van jouw keuze en het canvas is blanco. Laten we beginnen!</p>
        <button class="button-primary" @click="startGame()">Bouw jouw Rotterdam</button>
      </div>
    </div>

    <transition name="slow-slide-up">
      <ready-notice
        v-if="showReadyNotice && !gameEnded"
        @onClick="play"
      />
    </transition>

    <share-button v-if="continuePlaying" />

    <transition name="slow-slide-up">
      <question-notice
        v-if="!gameEnded && showNotice"
        @onClick="play"
      />
    </transition>

    <transition name="slow-slide-up">
      <feedback
        :feedback="feedbackContent"
        v-if="showFeedback"
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
import ShareButton from '~/components/ShareButton.vue'
import { setTimeout } from 'timers';

export default {
  components: { Question, QuestionNotice, ReadyNotice, Feedback, CityMap, ShareButton },
  data () {
    return {
      hasNotice: false,
      hasFeedback: false,
      hasReadyNotice: false,
    }
  },
  computed: mapState({
    questions: state => state.questions,
    questionsCount: state => state.questionsCount,
    totalQuestions: state => state.totalQuestions,
    currentQuestion: state => state.currentQuestion,
    currentScenario: state => state.currentScenario,
    showQuestion: state => state.showQuestion,
    showNotice: state => state.showNotice,
    showFeedback: state => state.showFeedback,
    showReadyNotice: state => state.showReadyNotice,
    gameStarted: state => state.gameStarted,
    gameEnded: state => !state.gameStarted,
    continuePlaying: state => state.continuePlaying,
    seenNotice: state => state.seenNotice,
    seenFeedback: state => state.seenFeedback,
    seenReadyNotice: state => state.seenReadyNotice,
  }),
  methods: {
    startGame () {
      this.$store.commit('startGame')
      this.$store.commit('nextQuestion')
      this.$store.commit('showNotice')
    },

    play () {
      this.hideAllElements()

      if (this.gameEnded) {
        return
      }
      
      const shouldShowNotice = this.hasNotice && !this.seenNotice
      const shouldShowReadyNotice = this.hasReadyNotice && !this.seenReadyNotice
      const shouldShowFeedback = this.hasFeedback && !this.seenFeedback
      
      if (shouldShowFeedback) {
        return this.$store.commit('showFeedback')
      } else if (shouldShowReadyNotice) {
        return this.$store.commit('showReadyNotice')
      } else if (shouldShowNotice) {
        return this.$store.commit('showNotice')
      } else {
        return this.$store.commit('showQuestion')
      }
    },

    nextQuestion () {
      if (this.questionsCount === this.totalQuestions) {
        return this.$store.commit('endGame')
      }

      this.$store.commit('nextQuestion')
      this.$store.commit('seenNotice', false)
      this.hasNotice = true
    },

    handleAnswer(answer) {
      const followUpQuestion = answer.outcome.filter(outcome => outcome.itemType === 'question')
      const results = answer.outcome.filter(outcome => outcome.itemType === 'result')
      const consequences = answer.outcome.filter(outcome => outcome.itemType === 'consequence')
      const hasFollowUpQuestion = followUpQuestion.length > 0

      if (answer.feedback && (answer.feedback.length > 1)) {
        this.hasFeedback = true
        this.$store.commit('seenFeedback', false)
        this.feedbackContent = answer.feedback
      }

      if (results.length > 0) {
        results.map(result => {
          this.updateCity(result.slug, 'addBuilding')
        })
      }

      if (consequences.length) {
        consequences.map(consequence => {
          const building = consequence.delete[0]
          this.updateCity(building.slug, 'removeBuilding')
        })
      }

      if ((this.questionsCount === 3 ) && !followUpQuestion.length) {
        this.hasReadyNotice = true
      }

      if (hasFollowUpQuestion) {
        this.$store.commit('followUpQuestion', followUpQuestion[0])
      } else {
        this.nextQuestion()
      }
     
      this.play()
    },

   updateCity(slug, type) {
      const id = slug.toUpperCase();
      const el = document.getElementById(id)
      if (el === null) {
        return false
      }

      if (type === 'addBuilding') {
        el.classList.remove('hidden')
      }

      if (type === 'removeBuilding') {
        el.classList.add('hidden')
      }
        
      this.$store.commit('updateCity', { type: type, slug: slug })
    },

    hideAllElements() {
      this.$store.commit('hideNotice')
      this.$store.commit('hideReadyNotice')
      this.$store.commit('hideQuestion')
      this.$store.commit('hideFeedback')
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

.share-button {
  width: 40px;
  height: 40px;
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

.slide-up-enter, 
.slide-up-leave-to {
  transform: translatey(100%);
}

.slow-slide-up-enter-active,
.slow-slide-up-leave-active {
  transition: all .4s ease 1s;
}

.slow-slide-up-leave-active {
  transition: all .6s ease;
}

.slow-slide-up-enter, 
.slide-up-leave-to {
  transform: translatey(100%);
}
</style>
