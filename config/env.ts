import * as ini from "@rubix-code/ini"
import path from "path"
import fs from "fs-extra"

const envFile = path.resolve(__dirname, "../.env")
const defaultEnv = {
	preprocessor: {
		debug:false,
		production: false,
		development: false,
		web:false,
		electron:false,
		cordova:false,
		positron:false,
		neutron:false,
	},
	analytics: {
		google: false,
	},
	dev: {
		editor: "code"
	}
}

if(!fs.existsSync(envFile)) ini.write(envFile, defaultEnv, {
	keep_quotes: true,
})

const env = <typeof defaultEnv>ini.read(envFile, {
	filters: [
		function(value: string){
			if(value==="false") return false
			if(value==="true") return true
			return value
		},
	]
})

export default env
