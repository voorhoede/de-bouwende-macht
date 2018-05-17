import Vuex from 'vuex'
import questions from '~/static/data/questions.json'

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const createStore = () => {
  const initialState = {
    currentQuestion: {},
    questions: shuffle(questions),
    importantQuestions: [],
    questionsCount: 0,
    currentScenario: [],
    gameStarted: false,
  }

  return new Vuex.Store({
    state: initialState,
    mutations: {
      resetState (state) {
        state = initialState
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
        console.log('next', state.questions.length)

      },

      updateCity (state, payload) {
        if (!state.currentScenario.includes(payload)) {
          state.currentScenario.push(payload)
        }
      },

      followUpQuestion (state, payload) {
        state.currentQuestion = payload
        console.log('follow up', state.questions.length)
      },

      endGame (state) {
        state.gameStarted = false
      }
    }
  })
}

export default createStore