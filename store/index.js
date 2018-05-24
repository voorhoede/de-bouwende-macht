import Vuex from 'vuex'
import questions from '~/static/data/questions.json'
import _ from 'lodash'

const createStore = () => {
  const initialState = {
    currentQuestion: {},
    questions: _.shuffle(questions),
    questionsCount: 0,
    currentScenario: [],
    feedback: null,
    notice: null,
    gameStarted: false,
    showQuestion: false,
    showNotice: false,
    showFeedback: false,
    showReadyNotice: false,
    continuePlaying: false
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
        if (state.questions.length) {
          state.showQuestion = true
        }
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

      showReadyNotice (state) {
        state.showReadyNotice = true
      },

      hideReadyNotice (state) {
        state.showReadyNotice = false
      },

      showFeedback (state) {
        state.showFeedback = true
      },

      hideFeedback (state) {
        state.showFeedback = false
      },

      clearFeedback (state) {
        state.feedback = null
      },

      nextQuestion (state) {
        if (!state.questions.length) {
          return state.gameStarted = false
        }
        const nextQuestion = state.questions.shift()
        state.questionsCount++
        state.currentQuestion = nextQuestion
      },

      updateCity (state, payload) {
        if (!state.currentScenario.includes(payload)) {
          state.currentScenario.push(payload)
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