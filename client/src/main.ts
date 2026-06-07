import "vue-toastification/dist/index.css"
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.ts'
import Toast from "vue-toastification"

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(Toast)
app.mount('#app')