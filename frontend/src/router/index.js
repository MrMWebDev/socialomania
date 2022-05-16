import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '../components/Auth.vue'
import Homepage from '../components/Homepage.vue'
import Profile from '../components/Homepage/Profile.vue'
import Forum from '../components/Homepage/Forum.vue'
import Post from '../components/Homepage/FormPost.vue'
import Moderation from '../components/Homepage/Moderation.vue'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/Homepage',
    name: 'Homepage',
    component: Homepage
  },
  {
    path: '/Homepage/Profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/Homepage/Forum',
    name: 'Forum',
    component: Forum
  },
  {
    path: '/Homepage/Forum/Post',
    name: 'Post',
    component: Post
  },
  {
    path: '/Homepage/Moderation',
    name: 'Moderation',
    component: Moderation
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
