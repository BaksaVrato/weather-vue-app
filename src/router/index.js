import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CityView from '../views/CityView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Home',
    }
  }, {
    path: '/weather/:state/:city', // parameters in route
    name: 'cityView',
    component: CityView,
    props: true,
    meta: {
      title: 'Weather',
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Weather App`;
  next();
})

export default router
