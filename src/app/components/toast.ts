import Sweetalert from "sweetalert2"

type TAlertTypes = "info" | "success" | "error" | "warning" | "question"

export const Toast = Sweetalert.mixin({
	toast: true,
	position: "top-end",
	showConfirmButton: false,
	timer: 5000
})

export const alert = async (title: string, type: TAlertTypes = "info") => {
	return await Toast.fire({
		title,
		type,
	})
}