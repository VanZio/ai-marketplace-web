import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const isAuthenticated = () => {
  const user = sessionStorage.getItem('user');
  console.log('Checking authentication:', user);
  return !!user; // Check if user data is in session storage
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/marketplace',
    name: 'Marketplace',
    component: () => import('../views/MarketplaceView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/manager',
    name: 'Manager',
    component: () => import('../views/ManagerView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterView.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  console.log('Navigation guard:', to.fullPath);
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
