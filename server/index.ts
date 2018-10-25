import express from "express"
import config from "../config/server.build"

let app = express()

app.get("/",(req, res)=>{
	res.send({ success: "false" })
})

let server = app.listen(config.config.port ,()=>{
	console.log("SERVER READY")
})

declare const module: any

if(module.hot){
	module.hot.accept()
	module.hot.dispose(() => server.close() )
}