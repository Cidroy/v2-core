import { IEntityBase } from "@plugins/core/interfaces/IEntityBase"

export default interface ITimeSlot extends IEntityBase {
	name: string,
	startTime : string,
	endTime : string,
}