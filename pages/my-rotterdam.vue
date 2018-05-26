<template>
  <section class="container">
    
    <div class="logo">
       <img src="~static/images/vers-beton-logo.png" >
    </div>

    <div class="map-wrapper">
      <city-map />
    </div>

    <div v-if="!gameStarted" class="card center">
      <h1 class="intro-title">Welkom in jouw Rotterdam!</h1>
    
      <div class="intro">
        <p class="intro-text">Hier bouw jij aan de stad van jouw keuze. Laten we beginnen!</p>
        <button class="button-primary" @click="startGame()">Start met bouwen</button>
      </div>
    </div>

    <transition name="slow-slide-up">
      <ready-notice
        v-if="showReadyNotice"
        @onClick="play"
      />
    </transition>

    <div class="buttons">
      <share-button v-if="continuePlaying" />
      <info-button @onClick="showAbout = !showAbout" />
    </div>

    <transition name="bounce">
      <about v-if="showAbout" @onClick="showAbout = !showAbout" />
    </transition>

    <transition name="slow-slide-up">
      <question-notice
        v-if="showNotice"
        :content="currentQuestion.toastertekst"
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

    <div class="toast card" v-if="gameEnded">
      <p>Dit is jouw Rotterdam!</p>
      <nuxt-link class="button button-primary" to="/share-my-rotterdam">Delen</nuxt-link>
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
import About from '~/components/About.vue'
import Question from '~/components/Question.vue'
import QuestionNotice from '~/components/QuestionNotice.vue'
import ReadyNotice from '~/components/ReadyNotice.vue'
import Feedback from '~/components/Feedback.vue'
import CityMap from '~/components/Map.vue'
import InfoButton from '~/components/InfoButton.vue'
import ShareButton from '~/components/ShareButton.vue'
import { setTimeout } from 'timers';

export default {
  components: { About, Question, QuestionNotice, ReadyNotice, Feedback, CityMap, ShareButton, InfoButton },
  data () {
    return {
      hasNotice: false,
      hasFeedback: false,
      hasReadyNotice: false,
      toasterText: '',
      showAbout: false,
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
    gameEnded: state => state.gameEnded,
    continuePlaying: state => state.continuePlaying,
    seenNotice: state => state.seenNotice,
    seenFeedback: state => state.seenFeedback,
    seenReadyNotice: state => state.seenReadyNotice,
  }),
  methods: {
    startGame () {
      this.$store.commit('startGame')
      this.$store.commit('nextQuestion')
      
      this.play()
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
      if (!this.questions.length) {
        return this.$store.commit('endGame')
      }

      this.$store.commit('nextQuestion')
      this.$store.commit('seenNotice', false)
      this.hasNotice = true
    },

    handleAnswer(answer) {
      const followUpQuestions = answer.outcome.filter(outcome => outcome.itemType === 'question')
      const results = answer.outcome.filter(outcome => outcome.itemType === 'result')
      const consequences = answer.outcome.filter(outcome => outcome.itemType === 'consequence')
      const hasFollowUpQuestions = followUpQuestions.length > 0


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

      if ((this.questionsCount === 3 ) && !followUpQuestions.length) {
        this.hasReadyNotice = true
      }

      if (hasFollowUpQuestions) {
        followUpQuestions.map(question => {
          if (question.dependent) { 
            this.$store.commit('addMainQuestion', question) 
          }

          if (question.followUp) { 
            this.$store.commit('followUpQuestion', question) 
          }
        })
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

.logo {
  position: absolute;
  left: 0.5rem;
  top: 0.5rem;
  height: auto;
  width: 75px;
}

.logo img {
  max-width: 100%;
}

@media screen and (min-width: 600px) {
  .logo {
    width: 120px;
  }
}

.buttons {
  position: absolute;
  top: var(--spacing-half);
  right: var(--spacing-half);
}

.intro-title {
  padding-bottom: 1.5rem;
  font-size: var(--font-size-big);
}

.map-wrapper {
  height: 100%;
  overflow: hidden;
}

</style>
