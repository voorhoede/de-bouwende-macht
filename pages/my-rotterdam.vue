<template>
  <section class="container">    
    <div class="logo">
       <img src="~static/images/vers-beton-logo.png" >
    </div>

    <city-map ref="map" />

    <div v-if="!gameStarted" class="card center">
      <h1 class="page-title">Welkom in jouw Rotterdam!</h1>
      <div class="intro">
        <p class="intro-text">Hier bouw jij aan de stad van jouw keuze. Laten we beginnen!</p>
        <button class="button-primary" @click="startGame()">Start met bouwen</button>
      </div>
    </div>

    <transition name="slide-up">
      <ready-notice
        v-if="showReadyNotice"
        :slug="currentScenario.join('-')"
        @onClick="play"
      />
    </transition>

    <div class="buttons">
      <info-button @onClick="showAbout = !showAbout" />

      <share-button
        class="share-button-rounded"
        v-if="continuePlaying" 
        :slug="currentScenario.join('-')" 
      />
    </div>

    <transition name="bounce">
      <about v-if="showAbout" @onClick="showAbout = !showAbout" />
    </transition>

    <transition name="slide-up">
      <question-notice
        v-if="showNotice"
        :content="currentQuestion.toastertekst"
        @onClick="play"
      />
    </transition>

    <transition name="slide-up">
      <feedback
        v-if="showFeedback"
        :feedback="feedbackContent"
        @onClick="play"
      />
    </transition>

    <div class="toast card" v-if="gameEnded">
      <p>Dit is jouw Rotterdam!</p>
      
      <nuxt-link 
        class="button button-primary" 
        :to="'/share-my-rotterdam/?buildings=' + currentScenario.join('-')"
      >
        Delen
      </nuxt-link>
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
  computed: mapState([
    'questions',
    'questionsCount',
    'totalQuestions',
    'currentQuestion',
    'currentScenario',
    'showQuestion',
    'showNotice',
    'showFeedback',
    'showReadyNotice',
    'gameStarted',
    'gameEnded',
    'continuePlaying',
    'seenNotice',
    'seenFeedback',
    'seenReadyNotice'
  ]),
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

    handleAnswer (answer) {
      this.$store.commit('hideQuestion')
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

      if ((this.questionsCount === 4 ) && !followUpQuestions.length) {
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

   updateCity (slug, type) {
      const id = slug.toUpperCase();
      const el = document.getElementById(id)
      const map = this.$refs.map.$el
      
      if (!el) {
        return false
      }

      if (type === 'addBuilding') {
        el.classList.remove('hidden')

        if (id === 'VIEZELUCHT') {
          el.classList.add('slide')
        } else {
          el.classList.add('fade')
        }
      }

      if (type === 'removeBuilding') {
        el.classList.add('hidden')
        el.classList.remove('fade')
      }

      this.$store.commit('updateCity', { type: type, slug: slug })

      // Scroll to changed element:
      const elBounds = el.getBoundingClientRect()
      const mapContent = map.children[0]
      // const tryTop = (elBounds.top < 0) ? elBounds.top + elBounds.height/2 : elBounds.top - elBounds.height/2
      // const tryLeft = (elBounds.left < 0) ? elBounds.left + elBounds.width/2 : elBounds.left - elBounds.width/2
      const viewWidth = document.body.clientWidth
      const viewHeight = document.body.clientHeight
      const tryTop = elBounds.top - viewHeight/2 + elBounds.height/2
      const tryLeft = elBounds.left - viewWidth/2 + elBounds.width/2

      if ('transition' in mapContent.style && 'transform' in mapContent.style) {
        mapContent.style.transition = 'transform 1s'
        mapContent.style.transform = `translate(${-1* tryLeft}px, ${-1* tryTop}px)`
        mapContent.addEventListener('transitionend', () => {
          mapContent.style.transform = ''
          mapContent.style.transition = ''
          map.scrollTop += tryTop
          map.scrollLeft += tryLeft
        })
      } else {
        // jump to element
        map.scrollTop += tryTop
        map.scrollLeft += tryLeft
      }
    },

    hideAllElements() {
      this.$store.commit('hideNotice')
      this.$store.commit('hideReadyNotice')
      this.$store.commit('hideQuestion')
      this.$store.commit('hideFeedback')
    },
  },
  transition (to, from) {
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

</style>
