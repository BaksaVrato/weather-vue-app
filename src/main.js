import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//imported just to try out installation of bootstrap in vue project
// import 'bootstrap/dist/css/bootstrap.css'
// import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'

import './assets/tailwind.css'

createApp(App).use(router /* bootstrap */).mount('#app')
