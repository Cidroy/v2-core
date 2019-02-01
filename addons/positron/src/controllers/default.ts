import * as API from "@tsed/common"
import { ISuccess } from "@classes/interface/IResponse"
import { Logger } from "@classes/CONSOLE"
import nodemailer from "nodemailer"
import { version } from "@positron/../package.local.json"
import { ROOT } from "@positron/paths"

@API.Controller("/")
export default class DefaultController{

	@API.Get("/")
	@API.Post("/")
	public async defaultRoute(): Promise<{ message: string, version: string, cwd: string, pid: number } & ISuccess>{
		return {
			type: "success",
			message: "Positron is stable",
			version,
			cwd: ROOT,
			pid: process.pid
		}
	}

	@API.Get("/test")
	public async test(){
		let transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: "sidspiderman999@gmail.com",
				pass: "siddharththegreatandmighty"
			}
		})
		const mailOptions = {
			from: "sidspiderman999@gmail.com", // sender address
			to: "sidshot999@gmail.com", // list of receivers
			subject: "testing", // Subject line
			html: "hi!!"// plain text body
		}
		transporter.sendMail(mailOptions, function (err, info) {
			if (err)
				console.log(err)
			else
				console.log(info)
		})
	}
}