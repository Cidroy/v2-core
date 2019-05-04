import { remote } from "electron"

export default class ResizeWindow {
	public static mobileSize(){
		remote.getCurrentWindow().setSize(400, 600, true)
		remote.getCurrentWindow().setPosition(50, 50, true)
	}
	public static fullSize(){
		remote.getCurrentWindow().maximize()
	}
}
