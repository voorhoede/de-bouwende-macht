import Vuex from 'vuex'
import stories from '~/static/stories.json'

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
    questions: shuffle(stories),
    importantQuestions: [],
    questionsCount: 0,
    currentScenario: [],
    gameEnded: false,
  }

  return new Vuex.Store({
    state: initialState,
    mutations: {
      increment (state) {
       state.questionsCount++
      },

      nextQuestion (state) {
        if (!state.questions.length) {
          return state.gameEnded = true
        }
        const nextQuestion = state.questions.shift()
        state.currentQuestion = nextQuestion.question
      },

      updateCity (state, payload) {
        state.currentScenario.push(...payload)
      },

      addFollowUpQuestion (state, payload) {
        state.currentQuestion = payload
      },

      endGame (state) {
        state.gameEnded = true
      }
    }
  })
}

export default createStore