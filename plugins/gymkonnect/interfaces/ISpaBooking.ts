import { IEntityBase } from "@plugins/core/interfaces/IEntityBase"

export default interface ISpaBooking extends IEntityBase {
	amenities?:  number[]
	grouping: number
	category: number
	attendees: number
	startDate: Date
	endDate: Date
	time: Date
	payment?: number
	user?: number

}
