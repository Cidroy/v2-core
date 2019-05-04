import { IEntityBase } from "@plugins/core/interfaces/IEntityBase"

export default interface IBookingType extends IEntityBase {
	name : string,
	description? : string,
	slotDuration : number,
	slotStart : Date,
	slotEnd : Date
}
