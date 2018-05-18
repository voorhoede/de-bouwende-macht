import Vuex from 'vuex'
import questions from '~/static/data/questions.json'
import _ from 'lodash'

const createStore = () => {
  const initialState = {
    currentQuestion: {},
    questions: _.shuffle(questions),
    questionsCount: 0,
    currentScenario: [],
    gameStarted: false,
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

      increment (state) {
       state.questionsCount++
      },

      nextQuestion (state) {
        if (!state.questions.length) {
          return state.gameStarted = false
        }
        const nextQuestion = state.questions.shift()
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

      endGame (state) {
        state.gameStarted = false
      } 
    }
  })
}

export default createStore