import { createApp } from 'vue'
import App from './app.vue'
import router from './router'
import './tailwind.css'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)

app.mount('#app')
