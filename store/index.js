import Vuex from 'vuex'
import stories from '~/static/stories.json'

const createStore = () => {
  return new Vuex.Store({
    state: {
      currentQuestion: {},
      questions: stories.stories.map(story => story.scenario),
      importantQuestions: [],
      questionsCount: 0,
    },
    mutations: {
     increment (state) {
       state.questionsCount++
     },
     nextQuestion (state) {
      if ((state.questionsCount % 4) === 0) {
        return state.currentQuestion = state.importantQuestions.shift()
      }
      
      if (!state.questions.length) {
        return alert('No more questions!')
      }

      state.currentQuestion = state.questions.shift()
     },
     insertQuestion (state, payload) {
        console.log(payload)
        state.questions.push(payload)
     }
    }
  })
}

export default createStore