<template>
  <section class="container">    
    <a href="https://versbeton.nl/" class="logo" target="_blank">
      <img src="~static/images/vers-beton-logo.png" >
    </a>

    <div class="badges">
      <pers-positief class="badge pers positive"  v-if="scoremeter.geld >= 0" />
      <pers-negatief class="badge pers negative"  v-if="scoremeter.geld < 0" />
      <burgers-happy class="badge burgers" v-if="scoremeter.burgers >= 0" />
      <burgers-bozen class="badge burgers" v-if="scoremeter.burgers < 0" />
      <geld class="badge geld" :class="scoremeter.geld >= 0 ? 'positive' : 'negative'" />
    </div>

    <city-map />

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
import page from '~/static/data/onboarding.json'
import PersNegatief from '~/static/images/pers-negatief.svg'
import PersPositief from '~/static/images/pers-positief.svg'
import BurgersHappy from '~/static/images/burgers-happy.svg'
import BurgersBozen from '~/static/images/burgers-bozen.svg'
import Geld from '~/static/images/geld.svg'

export default {
  components: { About, Question, QuestionNotice, ReadyNotice, Feedback, CityMap, ShareButton, InfoButton, PersNegatief, PersPositief, BurgersHappy, BurgersBozen, Geld },
  data () {
    return {
      hasNotice: false,
      hasFeedback: false,
      hasReadyNotice: false,
      toasterText: '',
      showAbout: false,
      lastChoice: '',
      showBadges: false,
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
    'seenReadyNotice',
    'scoremeter',
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

    hideBadge () {
      this.showBadges = false
      clearTimeout()
    },

    handleAnswer (answer) {
      this.$store.commit('hideQuestion')
      this.showBadges = true

      const { outcome, geld, pers, burgers, feedback } = answer

      this.updateScoremeter({geld, pers, burgers})
      setTimeout(() => this.hideBadge(), 1000)

      
      const followUpQuestions = outcome.filter(outcome => outcome.itemType === 'question')
      const results = outcome.filter(outcome => outcome.itemType === 'result')
      const consequences = outcome.filter(outcome => outcome.itemType === 'consequence')
      const hasFollowUpQuestions = followUpQuestions.length > 0

      if (feedback && (feedback.length > 1)) {
        this.hasFeedback = true
        this.$store.commit('seenFeedback', false)
        this.feedbackContent = feedback
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
    },

    updateScoremeter (scoremeter) {
      this.$store.commit('updateScoremeter', scoremeter)
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

.badge {
  height: 40px;
  width: auto;
}

.badges {
  width: 150px;
  height: 60px;
  position: absolute;
  top: 0;
  left: calc(50% - 75px);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.geld.positive {
  padding: .2rem;
  background-color: green;
  height: 40px;
  border-radius: 50%;
}

.geld.negative {
  padding: .2rem;
  background-color: red;
  border-radius: 50%;
  height: 40px;
}

</style>
