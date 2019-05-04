import DefaultController from "@positron/controllers/default"
import DatabaseController from "@positron/controllers/database"
import InstallController from "@positron/controllers/install"

export default {
	"/": [
		DefaultController,
		DatabaseController,
		InstallController,
	]
}
