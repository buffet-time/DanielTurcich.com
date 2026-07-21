import { defineStore } from 'pinia'

// Dont remove the `_` it breaks otherwise :/
export const useStopExecution = defineStore('_stopExecution', {
	state: () => ({ _stopExecution: false }),
	getters: {
		stopExecution: (state) => state._stopExecution,
	},
	actions: {
		setStopExecution(value: boolean) {
			this._stopExecution = value
		},
	},
})
