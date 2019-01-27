import { IEntityBase } from "@classes/interface/IEntityBase"

export default interface IBookingType extends IEntityBase {
	user : string,
	name : string,
	description? : string,
	slotDuration : number,
	slotStart : Date,
	slotEnd : Date
}