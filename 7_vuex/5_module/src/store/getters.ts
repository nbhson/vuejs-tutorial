const getters = {
  getTodos: (state: any) => {
    return state.todos.filter((todo: any) => todo.userId === 2)
  }
}

export default getters