import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator"
import fs from "fs-extra"
import os from "os"
import uuid from "uuid"
import path from "path"
import defaultPhoto from "@/assets/images/user-default-bg.jpg"
import { Logger } from "@classes/CONSOLE"
import AppConfig from "@classes/appConfig"
import empty from "@/components/empty.vue"

let log = new Logger("electron/camera-input")

@Component({
	// @ts-ignore
	components: { empty, },
	async created(){
		this.photoSrc = this.value
		let [ inputDevices, defaultCameraName, ] = await Promise.all([
			navigator.mediaDevices.enumerateDevices(),
			AppConfig.Get("electron/default-camera", null),
		])
		this.cameraList = inputDevices.filter(device => device.kind === "videoinput")
		let device = undefined
		if(defaultCameraName){
			device = this.cameraList.find(d => d.label===defaultCameraName)
			// @ts-ignore
			if(device!==undefined) this.cameraID = device.deviceId
		}
		if(device===undefined) this.cameraID = this.cameraList[0]?this.cameraList[0].deviceId: ""
	}
})
// @ts-ignore
export default class AddUserPhoto extends Vue{
	private readonly cameraStreamHeight = 480
	private readonly cameraStreamWidth = 360

	private photoSrc = ""
	private error = ""
	private cameraStream : MediaStream| null = null
	private cameraList: { label: string, deviceId: string }[] = []

	private cameraID = ""
	private cameraName = ""
	@Watch("cameraID") private async onChangeCameraID(){
		if(!this.cameraStream) return
		this.stopCameraStream()
		this.startCameraStream()
		let device = this.cameraList.find(d => d.deviceId===this.cameraID)
		if(device===undefined) return
		this.cameraName = device.label
		AppConfig.Set("electron/default-camera", this.cameraName)
	}

	private get photo(){ return this.photoSrc?"file://"+this.photoSrc:defaultPhoto }
	@Prop({ type: String, default: "" }) public value !:string
	@Emit("input") public inputEmitter(){
		console.log("emit photo")
		return this.photoSrc
	}
	@Watch("value") private onValueChange(){
		if(this.value){
			// FIXME: [Vicky] check if from URL
			if(fs.existsSync(this.value)) this.photoSrc = this.value
			else this.error = "Photo Missing"
		} else this.photoSrc = ""
	}

	@Prop({ type: Boolean, default: false }) public Readonly !: boolean

	private cameraDialog = false
	private fromCamera(){ this.cameraDialog = true }
	@Watch("cameraDialog") private onCameraDialog(){
		if(this.cameraDialog && !this.captured) this.startCameraStream()
		else this.stopCameraStream()
	}

	private async save(){
		try{
			if(!this.captured) return
			// @ts-ignore
			this.outputCanvas = this.$refs.outputCanvas
			let data = this.outputCanvas.toDataURL()
			data = data.replace(/^data:image\/\w+;base64,/, "")
			let dataBuffer = new Buffer(data, "base64")
			let outputFile = path.resolve(os.tmpdir(), `./photo-${uuid()}.png`)
			await fs.writeFile( outputFile, dataBuffer )
			log.log(outputFile)
			this.photoSrc = outputFile
			this.inputEmitter()
			this.cameraDialog = false
		} catch(error){
			this.error = error.toString()
			log.error(error)
		}
	}

	// @ts-ignore
	private videoElement = this.$refs.cameraOutput
	private startCameraStream(){
		// @ts-ignore
		this.videoElement = this.$refs.cameraOutput
		let streamer = navigator.getUserMedia(
			{
				audio: false,
				video: {
					height: this.cameraStreamHeight,
					width: this.cameraStreamWidth,
					deviceId: { exact: this.cameraID },
				}
			},
			stream => {
				this.cameraStream = stream
				// @ts-ignore
				log.log(stream, this.videoElement, this.$refs)
				this.videoElement.srcObject = stream
				this.videoElement.autoplay = true
			},
			error => {
				log.error(error)
				this.error = error.toString()
			}
		)
		log.log("stream",streamer)
	}
	private stopCameraStream(){
		if(this.cameraStream===null) return
		this.cameraStream.getTracks().forEach(track => track.stop())
		this.cameraStream = null
	}

	private captured = false
	// @ts-ignore
	private outputCanvas = this.$refs.outputCanvas
	private capture(){
		try{
			if(this.cameraStream===null) throw "Unable to Start Camera Stream"
			this.captured = true
			// @ts-ignore
			this.outputCanvas = this.$refs.outputCanvas
			this.outputCanvas.getContext("2d").drawImage(this.videoElement, 0, 0)
			this.stopCameraStream()
		}catch(error){
			log.error(error)
			this.error = error.toString()
		}
	}
	private retake(){
		this.stopCameraStream()
		this.captured = false
		this.startCameraStream()
	}

	private async fromFile(){
		// TODO: try catch
		const remote = require("electron").remote
		let defaultPath: any = await AppConfig.Get("electron/default-open-path", null)
		if(defaultPath===null) defaultPath = undefined
		let openPromise = new Promise((resolve, reject)=>{
			remote.dialog.showOpenDialog(
				{
					defaultPath,
					filters: [ { name: "Images", extensions: [ "jpg", "png", ] }, ]
				},
				resolve
			)

		})
		let files = await openPromise
		if(files){
			this.photoSrc = files[0]
			await AppConfig.Set("electron/default-open-path", path.dirname(this.photoSrc))
			this.inputEmitter()
		}
	}
}