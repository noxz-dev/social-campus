import { createRouter, createWebHistory } from 'vue-router';
import { navState } from '../utils/NavState';

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
    path: '/groups/:id',
    name: 'Group',
    component: () => import('@/views/Group.vue'),
  },
  {
    path: '/post/:id',
    name: 'DetailPost',
    component: () => import('@/views/Post.vue'),
  },
  {
    path: '/browse',
    name: 'Browse',
    component: () => import('@/views/Browse.vue'),
  },
  {
    path: '/chats',
    name: 'Chats',
    component: () => import('@/views/Chat.vue'),
    children: [
      {
        path: ':id',
        name: 'ChatBox',
        component: () => import('@/components/Chat/ChatBox.vue'),
      },
    ],
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
    path: '/signup',
    name: 'Signup',
    meta: {
      public: true,
      onlyWhenLoggedOut: true,
    },
    component: () => import('@/views/auth/Register.vue'),
  },
  {
    path: '/user/:id',
    name: 'Profile',
    redirect: { name: 'ProfilePosts' },
    component: () => import('@/views/Profile.vue'),
    children: [
      {
        path: 'posts',
        name: 'ProfilePosts',
        component: () => import('@/views/ProfilePosts.vue'),
      },
      {
        path: 'followers',
        name: 'ProfileFollowers',
        component: () => import('@/views/ProfileFollower.vue'),
      },
      {
        path: 'following',
        name: 'ProfileFollowing',
        component: () => import('@/views/ProfileFollowing.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/home',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  if (['Home', 'Groups', 'Chats', 'Browse'].includes(to.name as string)) {
    navState.lastView = to.path as string;
    localStorage.setItem('lastView', to.path);
  }
  const isPublic = to.matched.some((record) => record.meta.public);
  const onlyWhenLoggedOut = to.matched.some((record) => record.meta.onlyWhenLoggedOut);
  const loggedIn = !!localStorage.getItem('apollo-token');

  if (!isPublic && !loggedIn) {
    return next({
      path: '/login',
      query: { redirect: to.fullPath },
    });
  }

  if (loggedIn && onlyWhenLoggedOut) {
    return next('/');
  }

  next();
});

export default router;
