import Vue from 'vue'
import Router from 'vue-router'
import { Acronym } from './components/acronym.component'
import { Home } from './components/home.component'

Vue.use(Router)

const routes = [
	{
		path: '',
		name: 'Home',
		component: Home
	},
	{
		path: '/acronym',
		name: 'Acronym',
		component: Acronym
	}
]

export default new Router({ routes, mode: 'history' })
