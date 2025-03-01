const actions = {
  resultx10Act: (context: any, value = '') => {
    console.log(context);
    console.log(value);
    
    context.commit('resultx10')
  },
}

export default actions