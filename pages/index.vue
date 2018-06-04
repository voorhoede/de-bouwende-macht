<template>
  <section class="container">
    <logo />

    <city-map ref="map" />

    <div v-if="!gameStarted" class="card center">
      <h1 class="page-title">{{ page.title }}</h1>

      <div class="intro">
        <div class="content" v-html="page.content"></div>
        <button class="button-primary" @click="startGame()">{{ page.callToAction }}</button>
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
        :to="'/share/?buildings=' + currentScenario.join('-')"
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
import { setTimeout } from 'timers';
import page from '~/static/data/onboarding.json'
import Logo from '~/components/Logo.vue'

export default {
  components: { About, Question, QuestionNotice, ReadyNotice, Feedback, CityMap, ShareButton, InfoButton, Logo },
  data () {
    return {
      hasNotice: false,
      hasFeedback: false,
      hasReadyNotice: false,
      toasterText: '',
      showAbout: false,
      lastChoice: '',
      page,
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
          let building = result.slug

          if (building === 'metro' || building === 'tunnel' || building === 'brug') {
            return this.lastChoice = result.slug
          }

          if (building === '_kf' || building === '_cv') {
            building = this.lastChoice + result.slug
          }

          this.updateCity(building, 'addBuilding')
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
      const mapContent = map.children[0] // transforms on wrapping div, not on svg
      const mapImage = mapContent.querySelector('svg') // use sizing of svg
      const mapWidth = mapImage.clientWidth
      const mapHeight = mapImage.clientHeight
      const viewWidth = document.body.clientWidth
      const viewHeight = document.body.clientHeight
      const minScrollLeft = 0
      const minScrollTop = 0
      const maxScrollLeft = mapWidth - viewWidth
      const maxScrollTop = mapHeight - viewHeight
      const tryTop = elBounds.top - viewHeight/2 + elBounds.height/2
      const tryLeft = elBounds.left - viewWidth/2 + elBounds.width/2

      let top
      let left

      if (map.scrollTop + tryTop < minScrollTop) {
        // When trying to scroll lower than minimal scroll pos
        top = minScrollTop - map.scrollTop
      } else if (map.scrollTop + tryTop > maxScrollTop) {
        // When trying to scroll higher than maximal scroll pos
        top = maxScrollTop - map.scrollTop
      } else {
        top = tryTop
      }
      if (map.scrollLeft + tryLeft < minScrollLeft) {
        // When trying to scroll lower than minimal scroll pos
        left = minScrollLeft - map.scrollLeft
      } else if (map.scrollLeft + tryLeft > maxScrollLeft) {
        // When trying to scroll higher than maximal scroll pos
        left = maxScrollLeft - map.scrollLeft
      } else {
        left = tryLeft
      }

      if ('transition' in mapContent.style && 'transform' in mapContent.style) {
        mapContent.style.transition = 'transform 1s'
        mapContent.style.transform = `translate(${-1* left}px, ${-1* top}px)`
        mapContent.addEventListener('transitionend', () => {
          mapContent.style.transition = ''
          mapContent.style.transform = ''
          map.scrollTop += top
          map.scrollLeft += left
        })
      } else {
        // jump to element
        map.scrollTop += top
        map.scrollLeft += left
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
