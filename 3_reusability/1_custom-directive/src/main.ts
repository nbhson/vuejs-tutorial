import { createApp } from 'vue';
import App from './App.vue';
const app = createApp(App)

// custom directive - Global
app.directive('c-element', {
  created(el, binding, vnode, prevVnode) {
    el.style.backgroundColor = 'yellow'
  },
})
app.directive('c-binding', {
  created(el, binding, vnode, prevVnode) {
    let delay = 0
    if (binding.modifiers['delay']) { // modifier
      delay = 3000
    }    
    setTimeout(() => {
      if (binding.arg === 'background') { // arg
        el.style.backgroundColor = binding.value
      } else {
        el.style.color = binding.value
      }
    }, delay);
  },
})
app.directive('c-multi-value', {
  created(el, binding, vnode, prevVnode) {
    el.style.backgroundColor = binding.value['backgroundColor']
    el.style.color = binding.value['color']
  },
})

app.mount('#app');
