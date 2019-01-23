import DefaultController from "@positron/controllers/default"
import DatabaseController from "@positron/controllers/database"

export default {
	"/": [
		DefaultController,
		DatabaseController,
	]
}