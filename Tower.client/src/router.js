import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard, authSettled } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage')
  },

  {
    path: '/events/:id',
    name: 'EventDetails',
    component: loadPage('EventDetailsPage'),
    // ANCHOR try to authenticate and check if someone is logged in before seeing this page
    beforeEnter: authSettled
  },
  
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    // ANCHOR you MUST be authenticated and have account to see this page
    beforeEnter: authGuard
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
