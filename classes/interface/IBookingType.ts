import { IEntityBase } from "@classes/interface/IEntityBase"

export default interface IBookingType extends IEntityBase {
	name : string,
	description? : string,
	slotDuration : number,
	slotStart : Date,
	slotEnd : Date
}