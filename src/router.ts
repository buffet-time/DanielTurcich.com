import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const Home = () => import('./components/home.vue')
const Acronym = () => import('./components/acronym.vue')
const Password = () => import('./components/password.vue')
const Discord = () => import('./components/discord.vue')

const routes: Array<RouteRecordRaw> = [
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

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
