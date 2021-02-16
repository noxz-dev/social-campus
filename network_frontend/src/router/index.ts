import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'default',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/groups',
    name: 'Groups',
    component: () => import('@/views/Groups.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      public: true,
      onlyWhenLoggedOut: true,
    },
    component: () => import('@/views/auth/Login.vue'),
  },
  {
    path: '/Register',
    name: 'Register',
    meta: {
      public: true,
      onlyWhenLoggedOut: true,
    },
    component: () => import('@/views/auth/Register.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some((record) => record.meta.public)
  const onlyWhenLoggedOut = to.matched.some(
    (record) => record.meta.onlyWhenLoggedOut
  )
  const loggedIn = !!localStorage.getItem('apollo-token')

  // if (!isPublic && !loggedIn) {
  //   return next({
  //     path: '/login',
  //     query: { redirect: to.fullPath },
  //   })
  // }

  // if (loggedIn && onlyWhenLoggedOut) {
  //   return next('/')
  // }

  next()
})

export default router
