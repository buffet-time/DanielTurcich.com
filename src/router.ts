import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// Lazy Loading for routes for less resource waste/ better performance
const Home = () => import('./pages/Home.vue')
const Acronym = () => import('./pages/Acronym.vue')
const Password = () => import('./pages/Password.vue')
const Discord = () => import('./pages/Discord.vue')
const Sorting = () => import('./pages/Sorting.vue')
const Music = () => import('./pages/Music.vue')
const Frequency = () => import('./pages/Frequency.vue')
// const Weather = () => import('./pages/Weather.vue') // TODO: update and re add this when done
// const Performance = () => import('./components/performance.vue')
// TODO: Make a WebMidi demo - https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API
// TODO: play with Web USB https://developer.mozilla.org/en-US/docs/Web/API/USB
// TODO Play with Gamepad API

const resume =
	'https://drive.google.com/file/d/12YkFwTwQtf1NituQ07XHSBHAr4nrK3mp/view'

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
	// {
	// 	path: '/weather',
	// 	name: 'Weather',
	// 	component: Weather,
	// 	meta: { buttonName: 'Weather Widget' }
	// },
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
