import { createApp, vaporInteropPlugin } from 'vue'
import App from './app.vue'
import router from './router'
// oxlint-disable-next-line import/no-unassigned-import
import './tailwind.css'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

// Blocked by Vue Router needing Vue Vapor support for full vapor app
app.use(router).use(pinia).use(vaporInteropPlugin).mount('#app')
