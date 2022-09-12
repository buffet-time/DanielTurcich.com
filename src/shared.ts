export async function ProperFetch(
	input: RequestInfo | URL,
	init?: RequestInit | undefined
): Promise<any | null> {
	try {
		const response = await fetch(input, init)

		if (response.ok) {
			return await response.json()
		} else {
			console.error('Responded with an error:' + (await response.json()))
			return null
		}
	} catch (error) {
		console.error(`Error in fetch call: ${error}`)
		return null
	}
}

// Imports the dialog polyfill dynamically if its needed
export async function DynamicImportDialogPolyfill(
	dialogArray: HTMLDialogElement[]
): Promise<void> {
	if (typeof HTMLDialogElement !== 'function') {
		const { default: dialogPolyfill } = await import('dialog-polyfill')
		dialogArray.forEach((dialog) => dialogPolyfill.registerDialog(dialog))
	}
}

export function ClickOutsideDialog(modal: HTMLDialogElement) {
	modal.addEventListener('click', (event) => {
		if (modal.open && event.target === modal) {
			modal.close()
		}
	})
}