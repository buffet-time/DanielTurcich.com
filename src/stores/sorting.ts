import { defineStore } from 'pinia'

export const useStopExecution = defineStore('stopExecution', {
	state: () => ({ stopExecution: false }),
	getters: {
		stopExecution: (state) => state.stopExecution,
	},
	actions: {
		setStopExecution(value: boolean) {
			this.stopExecution = value
		},
	},
})
