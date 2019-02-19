import logo from "@/assets/images/splash-logo.png"
import { Component, Vue } from "vue-property-decorator"
import Loading from "./Loading.vue"
import { ipcRenderer } from "electron"

@Component({
	// @ts-ignore
	components: { Loading, },
	created(){
		ipcRenderer.on("splash-log", (event, args)=>{
			this.xMessage = args
		})
		ipcRenderer.on("splash-error", (event, args)=>{
			this.xError = "failed"
			console.log(args)
		})
	},
})
// @ts-ignore
export default class SplashcreenPage extends Vue{
	private logo = logo
	private xMessage = "Loading..."
	private xError = ""
	private get message(){ return this.xMessage }
	private get error(){ return this.xError }

	private exit(){
		ipcRenderer.send("kill-me", 0)
	}
}