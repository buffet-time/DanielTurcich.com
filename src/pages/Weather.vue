<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
	OneCallApiResponse,
	CurrentWeatherResponse,
	LatAndLon
} from '../types/OpenWeatherTypes'
import { onMounted, ref } from 'vue'

// TODO: make this not shit and actually usable!

const baseCurrentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather'
const baseOneCallUrl = 'https://api.openweathermap.org/data/2.5/onecall'
const listOfExcludedParams = 'minutely,alerts'
const unitsToUse = 'imperial'
const defaultCity = 'New York City'
const localStorageKey = 'OpenWeatherKey'

const hourlyTemps = ref([] as any[]) // 48 hours of data
const dailyWeather = ref([] as any[])
const currentWeather = ref()
const inputCity = ref(defaultCity)
const selectedDay = ref()
const render = ref(false)
const apiKey = ref('')

onMounted(() => {
	// window.localStorage.removeItem(localStorageKey) // how to delet
	const StoredOpenWeatherKey = window.localStorage.getItem(localStorageKey)
	if (StoredOpenWeatherKey) {
		apiKey.value = StoredOpenWeatherKey
		updateCity(defaultCity)
	} else {
		apiKey.value = 'Free API Key here: https://home.openweathermap.org/api_keys'
	}
})

function setApiKey() {
	window.localStorage.setItem(localStorageKey, apiKey.value)
	const StoredOpenWeatherKey = window.localStorage.getItem(localStorageKey)!
	apiKey.value = StoredOpenWeatherKey
	updateCity(defaultCity)
}

async function updateCity(city: string): Promise<boolean> {
	const weatherData = await getWeatherDataByCity(city)
	if (!weatherData) return false
	currentWeather.value = weatherData.current
	// this may return 8 days worth of data if its later at night so reduce it to 7
	dailyWeather.value = weatherData.daily.slice(0, 7)
	hourlyTemps.value = weatherData.hourly.slice(0, 12)
	render.value = true //
	return true
}

// Various helper functions
function timestampToHour(timestamp: number): string {
	const date = new Date(timestamp * 1000) // to ms
	let hours = date.getHours()
	let amPm = 'am'
	if (hours === 0) return `12am`
	else if (hours === 12) return `12pm`
	else if (hours > 12) {
		amPm = 'pm'
		hours -= 12
	}
	return `${hours}${amPm}`
}

function timestampToDayOfWeek(timestamp: number): string {
	// prettier-ignore
	const days = [
		'Sunday', 'Monday', 'Tuesday',
		'Wednesday', 'Thursday', 'Friday', 'Saturday'
	]
	const dayIndexFromTimestamp = new Date(timestamp * 1000).getDay()
	return days[dayIndexFromTimestamp]
}

// https://openweathermap.org/api/one-call-api
// eslint-disable-next-line @typescript-eslint/ban-types
async function getWeatherDataByCity(city: string) {
	const cityCoords = await getLatAndLongitudeByCityName(city)
	if (!cityCoords) {
		inputCity.value = 'Error retrieving'
		return null
	}
	const OneCallData: OneCallApiResponse | null = await simplifiedFetch(
		`${baseOneCallUrl}?lat=${cityCoords.lat}&lon=${cityCoords.lon}
			&exclude=${listOfExcludedParams}&appid=${apiKey.value}&units=${unitsToUse}`
	)

	return OneCallData
}

async function getLatAndLongitudeByCityName(
	city: string
): Promise<LatAndLon | null> {
	const fetchedData = (await simplifiedFetch(
		`${baseCurrentWeatherUrl}?q=${city}&appid=${apiKey.value}`
	)) as CurrentWeatherResponse | null

	return fetchedData
		? {
				lon: fetchedData.coord.lon,
				lat: fetchedData.coord.lat
		  }
		: null
}

// wrapped Fetch to gracefully handle possible errors
async function simplifiedFetch(url: string): Promise<any> {
	let returnData
	await fetch(url)
		.then(async (response) => {
			if (!response.ok) {
				returnData = null
			} else {
				returnData = await response.json()
			}
		})
		.catch(() => (returnData = null))
	return returnData
}
</script>

<template>
	<div class="card bg-dark api-key-div">
		<div class="mb-3">
			<h3>API Key</h3>
			<div class="api-key-inputs">
				<input
					id="exampleInputEmail1"
					v-model="apiKey"
					type="email"
					class="form-control"
					aria-describedby="emailHelp"
				/>
				<button class="btn btn-primary api-key-buttons" @click="setApiKey">
					Set Key
				</button>
			</div>
		</div>
	</div>
	<div class="card bg-dark weather-card-div">
		<div v-if="render" class="card-body">
			<!-- first row -->
			<div class="card-row top-row">
				<div class="todays-temp">
					<h1>{{ currentWeather.temp.toFixed() }}F</h1>
					<div class="wind-and-humidity">
						<div>Wind: {{ currentWeather.wind_gust.toFixed() }}mph</div>
						<div>Humidity: {{ currentWeather.humidity }}%</div>
					</div>
				</div>
				<div class="mb-3 weather-input">
					<input
						id="cityInput"
						v-model="inputCity"
						class="form-control"
						@keypress.enter="updateCity(inputCity)"
					/>
					<div class="today-div">
						{{ timestampToDayOfWeek(currentWeather.dt) }}
					</div>
				</div>
			</div>

			<!-- second row -->
			<div class="card-row">
				<h5 class="card-title">Today's Hourly Temperatures</h5>
				<div class="row-of-hourly-temps">
					<div v-for="hourlyObject in hourlyTemps" :key="hourlyObject.dt">
						<div>{{ timestampToHour(hourlyObject.dt) }}</div>
						<h4>{{ hourlyObject.temp.toFixed() }}F</h4>
					</div>
				</div>
			</div>

			<!-- third row -->
			<div class="card-row">
				<h5 class="card-title">7 Day Forecast</h5>
				<div class="forecast-div">
					<div
						v-for="dailyObject in dailyWeather"
						:key="dailyObject.dt"
						class="forecast-day"
						@click="selectedDay = dailyObject"
					>
						<div>{{ timestampToDayOfWeek(dailyObject.dt) }}</div>
						<div>
							<h5>{{ dailyObject.temp.max.toFixed() }}f</h5>
							{{ dailyObject.temp.min.toFixed() }}f
						</div>
					</div>
				</div>
			</div>

			<!-- fourth row -->
			<div v-if="selectedDay" class="card-row">
				<h6 class="card-title">Tuesday</h6>
				<div class="current-day-div">
					<div>
						<h4>{{ selectedDay.weather[0].main }}</h4>
						<h6>{{ selectedDay.weather[0].description }}</h6>
					</div>
					<div class="wind-and-humidity-bottom-row">
						<h6>Wind: {{ selectedDay.wind_speed.toFixed() }}mph</h6>
						<h6>Humidity: {{ selectedDay.humidity }}%</h6>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<!-- with more time this'd be using more values and be better structured of course -->
<style scoped>
.weather-card-div {
	display: flex;
	align-items: center;
	justify-content: center;
	width: calc(100% - 240px);
	height: 100%;
	margin-left: 120px;
}
.card-body {
	width: 100%;
	padding: 24px;
	gap: 24px;
}
.weather-input {
	display: flex;
	flex-direction: column;
	margin-left: auto;
}
.card-row {
	display: flex;
	flex-direction: column;
	margin-bottom: 32px;
}
.top-row {
	flex-direction: row;
}
.today-div {
	text-align: right;
}
.todays-temp {
	display: flex;
	flex-direction: row;
}
.wind-and-humidity {
	margin-left: 16px;
	flex-direction: row;
}
.row-of-hourly-temps {
	display: flex;
	gap: 32px;
	max-width: 100%;
	overflow: hidden;
}
.current-day-div {
	display: flex;
}
.wind-and-humidity-bottom-row {
	margin-left: auto;
}
.forecast-div {
	display: flex;
	gap: 32px;
	max-width: 100%;
	overflow: hidden;
}
.forecast-day {
	cursor: pointer;
}
.api-key-div {
	margin-left: 120px;
	margin-right: 120px;
	padding: 20px;
}
.api-key-inputs {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}
.btn {
	width: 95px;
}
.api-key-buttons {
	margin-left: auto;
}
</style>
