const mutations = {
  resultx10: (state: any, n = 10) => {
    console.log(state);
    console.log(n);
    
    state.result *= n
  },
}

export default mutations