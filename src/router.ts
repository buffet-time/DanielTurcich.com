import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// Lazy Loading for routes for less resource waste/ better performance
const Home = () => import('./views/home.vue')
const Acronym = () => import('./views/acronym.vue')
const Password = () => import('./views/password.vue')
const Discord = () => import('./views/discord.vue')
const Sorting = () => import('./views/sorting.vue')
// const Performance = () => import('./components/performance.vue')
const Music = () => import('./views/music.vue')

// TODO catch routes that dont exist and redirect to home
// TODO  JS/ HTML/ CSS editor?
const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: { buttonName: 'Home' }
	},

	{
		path: '/music',
		name: 'Music',
		component: Music,
		meta: { buttonName: 'Music Page' }
	},

	{
		path: '/sorting',
		name: 'Sorting',
		component: Sorting,
		meta: { buttonName: 'Sorting Visualizations' }
	},
	// {
	// 	path: '/performance',
	// 	name: 'Performance',
	// 	component: Performance,
	// 	meta: { buttonName: 'JS Perf Comparison' }
	// },
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
		path: '/resume',
		name: 'Resume',
		redirect: () => {
			window.location.href =
				'https://drive.google.com/file/d/1ql438ApSvi6vyaYaivL23U0z9FC-RLXl/view'
			return 'redirecting'
		}
	},
	{
		path: '/recc',
		name: 'Recc',
		redirect: () => {
			window.location.href =
				'https://docs.google.com/spreadsheets/d/1Ru91tRwbJSL7aAruHrhRORBRB2Y1-XGcyWFPtnwW6O4/edit?usp=sharing'
			return 'redirecting'
		}
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
