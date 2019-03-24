import Sweetalert from "sweetalert2"

type TAlertTypes = "info" | "success" | "error" | "warning" | "question"

const colorScheme = {}

export const Toast = Sweetalert.mixin({
	toast: true,
	position: "top-end",
	showConfirmButton: false,
	timer: 5000,
	...colorScheme,
})

export const alert = async (title: string, type: TAlertTypes = "info") => {
	return await Toast.fire({
		title,
		type,
		...colorScheme,
	})
}

export const loading = async (title = "Loading ...") => {
	return Sweetalert.fire({
		title,
		onBeforeOpen() { Sweetalert.showLoading() },
		allowOutsideClick: false,
		allowEscapeKey: false,
		...colorScheme,
	})
}

export const confirm = async (
	title = "Please Confirm",
	options: { confirm: string, cancel: string } = { confirm: "Yes", cancel: "No" },
	type: TAlertTypes = "question"
) => {
	return (await Sweetalert.fire({
		title,
		type,
		showCancelButton: true,
		confirmButtonText: options.confirm,
		cancelButtonText: options.cancel,
		...colorScheme,
	})).value
}