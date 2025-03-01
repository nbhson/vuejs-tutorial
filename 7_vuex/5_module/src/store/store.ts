import { createStore } from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const moduleCounter = {
  state () {
    return {
      result: 0,
      todos: [
        {
          "userId": 1,
          "id": 1,
          "title": "delectus aut autem",
          "completed": false
        },
        {
          "userId": 2,
          "id": 2,
          "title": "quis ut nam facilis et officia qui",
          "completed": false
        },
        {
          "userId": 1,
          "id": 3,
          "title": "fugiat veniam minus",
          "completed": false
        },
        {
          "userId": 2,
          "id": 4,
          "title": "et porro tempora",
          "completed": true
        },
        {
          "userId": 1,
          "id": 5,
          "title": "laboriosam mollitia et enim quasi adipisci quia provident illum",
          "completed": false
        }
      ]
    }
  },
  getters,
  mutations,
  actions
}

/**
 * computed: mapState, mapGetters
 * methods: mapMutations, mapActions
 */

const store = createStore({
  modules: {
    counter: moduleCounter
  }
})

export default store