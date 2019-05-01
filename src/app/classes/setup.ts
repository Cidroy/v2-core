import { remote } from "electron"
import observe from "@rubix-code/on-change"
import { config } from "@/classes/config"
import {
	Stage, routesCollection,
	TNext, TStageLanguage,
	IStageCollection,
	TStageMode
} from "@/classes/install-router"
import { IResponse, ISuccess } from "@plugins/gymkonnect/interfaces/IResponse"
import { InstallerStore } from "@/state/install-modules/install"
import router from "@/routes/install"
import { SoftwareMode } from "@classes/enum/software-mode"

/**
 * This is a static class that will handle all the installation Process and provide associated assets
 *
 * @class MAIN
 * @namespace SETUP
 * @author Rinzler D. Vicky
 * @version 0.0.1
 */
class MAIN {

	/**
	 * the configuration for application installation
	 *
	 * @private
	 * @static
	 * @type {config}
	 * @memberof MAIN
	 */
	private static config: config = new config()

	/**
	 * The system has been initialized
	 *
	 * @private
	 * @static
	 * @type {boolean}
	 * @memberof MAIN
	 */
	private static initialized: boolean = false

	/**
	 * current stage of installation
	 * @private
	 * @static
	 * @type {Stage}
	 * @memberof MAIN
	 */
	private static _currentStage: Stage = Stage.NONE
	private static get currentStage(): Stage { return MAIN._currentStage }
	private static set currentStage(value: Stage){
		MAIN._currentStage = value
		InstallerStore.setHelpdoc(value)
	}

	/**
	 * List of all the installation stages that are complete
	 *
	 * @private
	 * @static
	 * @type {IStageCollection[]}
	 * @memberof MAIN
	 */
	private static completedStages: IStageCollection[] = observe([] as IStageCollection[], e=>{
		e = (<IStageCollection[]>e).filter(Boolean)
		InstallerStore.setRevertButton(!!(<IStageCollection[]>e).length)
	})

	/**
	 * Initialize the basic setup for installation
	 *
	 * @static
	 * @memberof MAIN
	 */
	public static initialize(force: boolean = false): void{
		if(!force && MAIN.initialized) return

		MAIN.currentStage = Stage.LANGUAGE
		MAIN.initialized = true
	}

	private static goto(stage: Stage, param: TNext): void{
		router.push({ name: routesCollection[stage].name })
		MAIN.completedStages.push({
			stage: MAIN.currentStage,
			param,
		})
		MAIN.currentStage = stage
	}

	/**
	 *move the installer to next stage from current stage
	 * TODO: Essential Logic
	 * @static
	 * @param {Stage} currentStage
	 * @memberof MAIN
	 */
	public static async next(param: TNext): Promise<IResponse>{
		switch (MAIN.currentStage) {
			case Stage.LANGUAGE:
				MAIN.config.language = (<TStageLanguage>param).language
				MAIN.goto(Stage.PRODUCT_KEY, param)
				return { type: "success" } as ISuccess
				break
			case Stage.PRODUCT_KEY:
				MAIN.goto(Stage.MODE_SELECT, param)
				return { type: "success" } as ISuccess
				break
			case Stage.MODE_SELECT:
				if((<TStageMode>param).mode===SoftwareMode.MASTER)
					MAIN.goto(Stage.HARDWARE_SELECT, param)
				else if((<TStageMode>param).mode===SoftwareMode.SLAVE)
					MAIN.goto(Stage.SLAVE_MODE, param)
				else throw "Invalid Operation Mode"
				return { type: "success" } as ISuccess
				break
			case Stage.SLAVE_MODE:
				MAIN.goto(Stage.DONE, param)
				return { type: "success" } as ISuccess
				break
			case Stage.HARDWARE_SELECT:
				MAIN.goto(Stage.HARDWARE_CONFIRM, param)
				return { type: "success" } as ISuccess
				break
			case Stage.HARDWARE_CONFIRM:
				MAIN.goto(Stage.DONE, param)
				return { type: "success" } as ISuccess
				break
			case Stage.DONE:
				remote.getCurrentWindow().close()
				return { type: "success" } as ISuccess
				break
			default:
				throw `Invalid Stage for installation ${MAIN.currentStage}`
				break
		}
	}

	/**
	 * Go back one step in the installation
	 * NOTE: all changes in the current step will be lost
	 * @static
	 * @memberof MAIN
	 */
	public static previous(): void{
		if(MAIN.completedStages.length===0) throw "No more stages to rollback"
		let last = <IStageCollection>MAIN.completedStages.pop()
		for (const key in last) {
			if (last.hasOwnProperty(key)) {
				const value = last[key]
				MAIN.config[key] = undefined
			}
		}
		MAIN.currentStage = last.stage
		router.back()
	}
}

MAIN.initialize()

export {
	MAIN,
	Stage
}