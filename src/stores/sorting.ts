import { defineStore } from 'pinia'

export const useStopExecution = defineStore('stopExecution', {
	state: () => ({ _stopExecution: false }),
	getters: {
		stopExecution: (state) => state._stopExecution
	},
	actions: {
		setStopExecution(value: boolean) {
			this._stopExecution = value
		}
	}
})
