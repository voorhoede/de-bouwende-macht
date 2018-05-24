import Vuex from 'vuex'
import questions from '~/static/data/questions.json'
import _ from 'lodash'

const createStore = () => {
  const initialState = {
    currentQuestion: {},
    questions: _.shuffle(questions),
    totalQuestions: questions.length,
    questionsCount: 0,
    currentScenario: [],
    feedback: null,
    notice: null,
    gameStarted: false,
    showQuestion: false,
    showNotice: false,
    showFeedback: false,
    showReadyNotice: false,
    continuePlaying: false,
    seenNotice: false,
    seenFeedback: false,
    seenReadyNotice: false,
  }

  return new Vuex.Store({
    state: _.cloneDeep(initialState),
    mutations: {
      resetGame (state) {
        state.questions = _.cloneDeep(initialState)
      },
      startGame (state) {
        state.gameStarted = true
      },

      showQuestion (state) {
        state.showQuestion = true
      },

      hideQuestion (state) {
        state.showQuestion = false
      },

      showNotice (state) {
        state.showNotice = true
      },

      hideNotice (state) {
        state.showNotice = false
      },

      seenNotice (state, payload) {
        state.seenNotice = payload
        state.showNotice = !payload
      },

      showReadyNotice (state) {
        state.showReadyNotice = true
      },

      hideReadyNotice (state) {
        state.showReadyNotice = false
      },

      seenReadyNotice (state) {
        state.seenReadyNotice = true
        state.showReadyNotice = false
      },

      showFeedback (state) {
        state.seenFeedback = false
        state.showFeedback = true
      },

      hideFeedback (state) {
        state.showFeedback = false
      },

      seenFeedback (state, payload) {
        state.seenFeedback = payload
        state.showFeedback = !payload
      },

      clearFeedback (state) {
        state.feedback = null
      },

      nextQuestion (state) {
        state.questionsCount++
        const nextQuestion = state.questions.shift()
        state.currentQuestion = nextQuestion
      },

      updateCity (state, { type, slug }) {
        if (type === 'addBuilding') {
          if (!state.currentScenario.includes(slug)) {
            state.currentScenario.push(slug)
          }
        }

        if (type === 'removeBuilding') {
          state.currentScenario = state.currentScenario.filter(building => building !== slug)
        }
      },

      followUpQuestion (state, payload) {
        state.currentQuestion = payload
      },

      showReadyButton (state) {
        state.continuePlaying = true
      },

      endGame (state) {
        state.gameStarted = false
      } 
    }
  })
}

export default createStore