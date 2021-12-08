import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// Lazy Loading for routes for less resource waste/ better performance
const Home = () => import('./views/Home.vue'),
	Acronym = () => import('./views/Acronym.vue'),
	Password = () => import('./views/Password.vue'),
	Discord = () => import('./views/Discord.vue'),
	Sorting = () => import('./views/Sorting.vue'),
	Music = () => import('./views/Music.vue'),
	Frequency = () => import('./views/Frequency.vue')
// const Performance = () => import('./components/performance.vue')

const resume =
	'https://drive.google.com/file/d/1bxVwswSy_5m8TW0vDVUAgv6d4TLlbx9k/view'

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
		meta: { buttonName: ' My Music Page' }
	},
	{
		path: '/sorting',
		name: 'Sorting',
		component: Sorting,
		meta: { buttonName: 'Sorting Visualizer' }
	},
	{
		path: '/frequency',
		name: 'Frequency',
		component: Frequency,
		meta: { buttonName: 'Frequency Tool' }
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
		meta: { buttonName: 'Discord Spam Tool' }
	},
	// TODO: optimize this to not render the navbar
	{
		path: '/resume',
		name: 'Resume',
		redirect: () => {
			window.location.href = resume

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
	},
	{
		path: '/:pathMatch(.*)*',
		redirect: '/'
	}
	// TODO - self explantory
	// {
	// 	path: '/performance',
	// 	name: 'Performance',
	// 	component: Performance,
	// 	meta: { buttonName: 'JS Perf Comparison' }
	// },
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
})

export default router
export { resume }
