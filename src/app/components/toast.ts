import Sweetalert from "sweetalert2"

export const Toast = Sweetalert.mixin({
	toast: true,
	position: "top-end",
	showConfirmButton: false,
	timer: 5000
})