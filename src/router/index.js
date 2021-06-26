import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import OneRecipe from '../views/OneRecipe.vue'
import AddRecipe from '../views/AddRecipe.vue'
import EditRecipe from '../views/EditRecipe.vue'
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
    path: '/edit/:slug',
    name: 'EditRecipe',
    props: true,
    component: EditRecipe,
    beforeEnter: authenticationGuard,
  },
  {
    path: '/recipe/:slug',
    name: 'OneRecipe',
    props: true,
    component: OneRecipe,
  },
  // {
  //   path: '*',
  //   name: 'Home',
  //   component: Home
  // },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
