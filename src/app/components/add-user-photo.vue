<template>
	<v-card>
		<v-dialog v-model="cameraDialog" width="500">
			<v-card>
				<v-card-title class="headline orange darken-2 py-0" primary-title>
					<v-icon v-text="'photo_camera'" left/> Take Photo
					<v-spacer />
					<v-btn icon @click.native.stop="cameraDialog = false">
						<v-icon v-text="'close'" />
					</v-btn>
				</v-card-title>
					<v-layout>
						<v-spacer />
						<canvas v-show="captured" ref="outputCanvas" :height="cameraStreamHeight" :width="cameraStreamWidth" />
						<video v-show="!captured" ref="cameraOutput" :height="cameraStreamHeight" :width="cameraStreamWidth" autoplay/>
						<v-spacer />
					</v-layout>
				<v-card-text>
				</v-card-text>
				<v-card-actions class="grey darken-2">
					<v-btn color="orange darken-2" v-if="!captured" @click="capture"> <v-icon v-text="'camera'" left/> Capture </v-btn>
					<v-btn color="orange darken-2" v-else @click="retake"> <v-icon v-text="'replay'" left/> Retake </v-btn>
					<v-select v-if="!captured" v-model="cameraID" :items="cameraList" menu-props="auto" label="Camera" hide-details prepend-icon="camera" single-line item-text="label" item-value="deviceId" />
					<v-spacer v-else/>
					<v-btn color="orange darken-2" v-if="captured" @click="save"> <v-icon v-text="'save'" left/> Save </v-btn>
					<v-spacer v-else/>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<img :src="photo" height="200px" />
		<v-btn v-show="!Readonly" block dark color="orange darken-4" @click.native.stop="fromFile">
			<v-icon>add</v-icon> Add Photo
		</v-btn>
		<v-btn v-show="!Readonly" block dark color="orange darken-4" @click.native.stop="fromCamera">
			<v-icon>camera</v-icon> Camera
		</v-btn>
	</v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator"
import fs from "fs-extra"
import os from "os"
import uuid from "uuid"
import path from "path"
import defaultPhoto from "@/assets/images/user-default-bg.jpg"
import { Logger } from "@classes/CONSOLE"
import AppConfig from "@classes/appConfig"

let log = new Logger("electron/camera-input")

@Component({
	async created(){
		let [ inputDevices, defaultCameraName ] = await Promise.all([
			navigator.mediaDevices.enumerateDevices(),
			AppConfig.Get("electron/default-camera", null)
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
	@Emit("input") public inputEmitter(){ return this.photoSrc }
	@Watch("value") private onValueChange(){
		if(this.value){
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
			this.cameraDialog = false
			this.inputEmitter()
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
				console.log(stream, this.videoElement, this.$refs)
				this.videoElement.srcObject = stream
				this.videoElement.autoplay = true
			},
			error => {
				log.error(error)
				this.error = error.toString()
			}
		)
		console.log("stream",streamer)
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
			this.outputCanvas.getContext('2d').drawImage(this.videoElement, 0, 0)
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
				filePaths => resolve(filePaths)
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
</script>