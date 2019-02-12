import { IEntityBase } from "@classes/interface/IEntityBase"

export default interface ITimeSlot extends IEntityBase {
	name: string,
	startTime : string,
	endTime : string,
}