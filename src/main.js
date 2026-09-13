import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import Landing from './views/Landing.vue'
import Jobs from './views/Jobs.vue'
import Detail from './views/Detail.vue'
import Trade from './views/Trade.vue'
import TradeDetail from './views/TradeDetail.vue'
import Cars from './views/Cars.vue'
import CarDetail from './views/CarDetail.vue'
import Rental from './views/Rental.vue'
import RentalDetail from './views/RentalDetail.vue'
import Services from './views/Services.vue'
import Events from './views/Events.vue'
import Profile from './views/Profile.vue'
import './style.css'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Landing },
    { path: '/jobs', component: Jobs },
    { path: '/jobs/:id', component: Detail },
    { path: '/trade', component: Trade },
    { path: '/trade/:id', component: TradeDetail },
    { path: '/cars', component: Cars },
    { path: '/cars/:id', component: CarDetail },
    { path: '/rental', component: Rental },
    { path: '/rental/:id', component: RentalDetail },
    { path: '/services', component: Services },
    { path: '/events', component: Events },
    { path: '/profile', component: Profile },
  ],
})

createApp(App).use(router).mount('#app')
