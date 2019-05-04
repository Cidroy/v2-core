import moment from "moment"

export type TFreezeTransaction = {
	start: string,
	end: string,
	period: number,
}

export const defaultFreezeTransation: TFreezeTransaction = {
	start: moment().toISOString().substr(0,10),
	end: moment().add(10, "days").toISOString().substr(0,10),
	period: 10
}
