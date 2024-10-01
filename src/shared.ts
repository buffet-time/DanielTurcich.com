import type { StatsObject } from './types/Typings'

export type JSONReturnType =
	| string
	| number
	| boolean
	| { [x: string]: JSONReturnType }
	| JSONReturnType[]
	| StatsObject
	| null

export async function ProperFetch(
	input: RequestInfo | URL,
	init?: RequestInit,
): Promise<JSONReturnType> {
	try {
		const response = await fetch(input, init)

		if (response.ok) {
			return response.json() as Promise<JSONReturnType>
			// biome-ignore lint/style/noUselessElse: <explanation>
		} else {
			console.error(`Responded with an error:${await response.json()}`)
			return null
		}
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (error: any) {
		console.error(`Error in fetch call: ${error}`)
		return null
	}
}

// Imports the dialog polyfill dynamically if its needed
export async function DynamicImportDialogPolyfill(
	dialogArray: HTMLDialogElement[],
): Promise<void> {
	if (typeof HTMLDialogElement !== 'function') {
		try {
			// adds the folllowing to the head of the document
			// <link rel="stylesheet" type="text/css" href="/dialog-polyfill.css" />
			const link = document.createElement('link')
			link.type = 'text/css'
			link.rel = 'stylesheet'
			link.href = '/dialog-polyfill.css'
			document.head.appendChild(link)

			const { default: dialogPolyfill } = await import('dialog-polyfill')
			// biome-ignore lint/complexity/noForEach: <explanation>
			dialogArray.forEach((dialog) => dialogPolyfill.registerDialog(dialog))
		} catch (error) {
			console.error(`You need to update your browser. ${String(error)}`)
		}
	}
}

export function ClickOutsideDialog(modal: HTMLDialogElement) {
	modal.addEventListener('click', (event) => {
		if (modal.open && event.target === modal) {
			modal.close()
		}
	})
}
