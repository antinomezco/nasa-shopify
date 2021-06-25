import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import OneRecipe from '../views/OneRecipe.vue'
import AddRecipe from '../views/AddRecipe.vue'
import { authenticationGuard } from "@/auth/authenticationGuard";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/addrecipe',
    name: 'AddRecipe',
    component: AddRecipe,
    beforeEnter: authenticationGuard,
  },
  {
    path: '/recipe/:slug',
    name: 'OneRecipe',
    props: true,
    component: OneRecipe,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
