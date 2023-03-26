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
		try {
			// adds the folllowing to the head of the document
			// <link rel="stylesheet" type="text/css" href="/dialog-polyfill.css" />
			const link = document.createElement('link')
			link.type = 'text/css'
			link.rel = 'stylesheet'
			link.href = '/dialog-polyfill.css'
			document.head.appendChild(link)

			const { default: dialogPolyfill } = await import('dialog-polyfill')
			dialogArray.forEach((dialog) => dialogPolyfill.registerDialog(dialog))
		} catch (error) {
			console.error('You need to update your browser.')
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
