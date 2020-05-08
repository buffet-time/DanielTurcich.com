import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'
import Vue from 'vue'
import { App } from './app.component'
import router from './router'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

window.addEventListener('load', initialize)
function initialize() {
	const app = new Vue({
		router,
		el: '#app',

		template: '<App/>',
		components: { App }
	})
	return app
}
