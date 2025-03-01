import * as VueRouter from 'vue-router';

const routes = [
  { path: '/', component: () => import('./components/Home.vue') },
  {
    path: '/about',
    component: () => import('./components/About.vue'),
  }, // lazy load
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('./components/Dashboard.vue'),
    beforeEnter: (to: any, from: any, next: any) => {
      if (to.name === 'dashboard') {
        next()
      }
    },
  }, // guard 
  {
    path: '/user/:id',
    name: 'user',
    component: () => import('./components/User.vue'),
  }, // dynamic
  {
    path: '/training',
    component: () => import('./components/TrainingVue.vue'),
    children: [
      {
        path: 'vuejs',
        component: () => import('./components/TrainingVue.vue'),
      },
      {
        path: 'reactjs',
        component: () => import('./components/TrainingReact.vue'),
      },
      {
        path: 'angularjs',
        component: () => import('./components/TrainingAngular.vue'),
      },
    ],
  }, // child
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('./components/NotFound.vue'),
  }, // 404
];

const router = VueRouter.createRouter({
  // history: VueRouter.createWebHashHistory(),
  history: VueRouter.createWebHistory(),
  routes, // short for `routes: routes`
  scrollBehavior (to, from, savedPosition) {
    // return desired position
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return {
        el: to.hash,
      }
    }
  }
});

// Global
// router.beforeEach((to, from, next) => {
//   if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
//   else next()
// })

export default router;
