import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// Lazy Loading for routes for less resource waste/ better performance
const Home = () => import('./components/home.vue')
const Acronym = () => import('./components/acronym.vue')
const Password = () => import('./components/password.vue')
const Discord = () => import('./components/discord.vue')
const Sorting = () => import('./components/sorting.vue')

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: { buttonName: 'Home' }
	},
	{
		path: '/acronym',
		name: 'Acronym',
		component: Acronym,
		meta: { buttonName: 'Acronym Generator' }
	},
	{
		path: '/password',
		name: 'Password',
		component: Password,
		meta: { buttonName: 'Password Generator' }
	},
	{
		path: '/discord',
		name: 'Discord',
		component: Discord,
		meta: { buttonName: 'Discord Generator' }
	},
	{
		path: '/sorting',
		name: 'Sorting',
		component: Sorting,
		meta: { buttonName: 'Sorting Visualizations' }
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
