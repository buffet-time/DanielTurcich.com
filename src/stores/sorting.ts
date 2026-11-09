import { defineStore } from 'pinia'

// Dont remove the `_` it breaks otherwise :/
export const useStopExecution = defineStore('_stopExecution', {
	state: () => ({ _stopExecution: false }),
	getters: {
		// oxlint-disable-next-line no-underscore-dangle
		stopExecution: (state) => state._stopExecution,
	},
	actions: {
		setStopExecution(value: boolean) {
			// oxlint-disable-next-line no-underscore-dangle
			this._stopExecution = value
		},
	},
})
