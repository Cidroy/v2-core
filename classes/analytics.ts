// CONTINUE ...
// https://kilianvalkhof.com/2018/apps/using-google-analytics-to-gather-usage-statistics-in-electron/
import ua, { Visitor, PageviewParams, Callback } from "universal-analytics"
import uuid from "uuid"
import { Logger } from "@classes/CONSOLE"

const Console = new Logger(`analytics/core`)
let visitor: Visitor | null = null
// @ts-ignore
const analyticsID: string = GOOGLE_ANALYTICS_ID
// TODO: generate PC based or user based ID
const userId = uuid()

export default class Analytics{
	public static async Initialize(uid = userId){
		try {
			visitor = ua(analyticsID, {
				uid,
			})
		} catch (error) {
			Console.error("initialization", error)
		}
	}

	public static get _(){ return visitor }

	public static ready(){ return !!visitor }

	public static pageView({ path, hostname, title, params, callback }: { path: string; hostname: string; title: string; params: PageviewParams; callback?: Callback; }): Visitor | null
	{
		if(!visitor) return visitor
		try {
			visitor.pageview(path, hostname, title, params, callback)
		} catch (error) {
			Console.error("page-view", error)
		}
		return visitor
	}
}
