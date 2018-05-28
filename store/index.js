import Vuex from 'vuex'
import questions from '~/static/data/questions.json'
import _ from 'lodash'

const createStore = () => {
  const initialState = {
    questions: _.shuffle(questions),
    totalQuestions: questions.length,
    questionsCount: 0,
    currentQuestion: {},
    currentScenario: [],
    gameStarted: false,
    gameEnded: false,
    showQuestion: false,
    showNotice: false,
    showFeedback: false,
    showReadyNotice: false,
    seenNotice: false,
    seenFeedback: false,
    seenReadyNotice: false,
    continuePlaying: false,
  }

  return new Vuex.Store({
    state: _.cloneDeep(initialState),
    mutations: {
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

      nextQuestion (state) {
        const nextQuestion = state.questions.shift()

        state.currentQuestion = nextQuestion
        state.questionsCount++
      },

      addMainQuestion (state, payload) {
        state.questions.push(payload)
        state.questions = _.shuffle(state.questions)
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
        state.gameEnded = true
      } 
    }
  })
}

export default createStore