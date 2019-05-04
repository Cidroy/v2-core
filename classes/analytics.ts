// CONTINUE ...
// https://kilianvalkhof.com/2018/apps/using-google-analytics-to-gather-usage-statistics-in-electron/
import ua, { Visitor } from "universal-analytics"
import uuid from "uuid"
// import { JSONStorage } from "node-localstorage"
let visitor: Visitor | null = null
const userId = uuid()

export default class Analytics{
	public static Initialize(uuid = userId){
		visitor = ua("GA-ACCOUNT-ID", uuid)
	}
}
