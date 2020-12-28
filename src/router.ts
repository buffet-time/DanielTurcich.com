import Vue from 'vue'
import Router from 'vue-router'
import { Acronym } from './components/acronym.component'
import { Home } from './components/home.component'
import { Password } from './components/password.component'
import { Discord } from './components/discord.component'

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
	},
	{
		path: '/password',
		name: 'Password',
		component: Password
	},
	{
		path: '/discord',
		name: 'Discord',
		component: Discord
	}
]

export default new Router({ routes, mode: 'history' })
