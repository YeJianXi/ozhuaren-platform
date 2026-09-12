import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import Landing from './views/Landing.vue'
import Jobs from './views/Jobs.vue'
import Detail from './views/Detail.vue'
import Trade from './views/Trade.vue'
import Rental from './views/Rental.vue'
import Services from './views/Services.vue'
import Events from './views/Events.vue'
import './style.css'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Landing },
    { path: '/jobs', component: Jobs },
    { path: '/jobs/:id', component: Detail },
    { path: '/trade', component: Trade },
    { path: '/rental', component: Rental },
    { path: '/services', component: Services },
    { path: '/events', component: Events },
  ],
})

createApp(App).use(router).mount('#app')
