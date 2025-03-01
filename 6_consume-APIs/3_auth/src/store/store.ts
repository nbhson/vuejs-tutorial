import { createStore } from 'vuex';

const authModule = {
  state() {
    return {
      authentication: false,
      jwt: '',
      user: {},
    };
  },
  getters: {
    jwt(state: any): string {
      return state.jwt;
    },
    authentication(state: any): boolean {
      return state.authentication;
    },
    user(state: any) {
      return state.user;
    },
  },
  mutations: {
    SET_JWT: (state: any, jwt: string) => {
      if (jwt) {
        state.jwt = jwt;
      }
    },
    SET_AUTH: (state: any, user: any) => {
      if (user) {
        state.authentication = true;
        state.user = user;
      }
    },
    RESET_AUTH: (state: any) => {
      state.jwt = '';
      state.authentication = false;
      state.user = {};
    },
  },
  actions: {
    setJwt: (context: any, jwt: string) => {
      context.commit('SET_JWT', jwt);
    },
    setAuth: (context: any, jwt: string) => {
      context.commit('SET_AUTH', jwt);
    },
    resetAuth: (context: any) => {
      context.commit('RESET_AUTH');
    },
  },
};

/**
 * computed: mapState, mapGetters
 * methods: mapMutations, mapActions
 */

const store = createStore({
  modules: {
    auth: authModule,
  },
});

export default store;
