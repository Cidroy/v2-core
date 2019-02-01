import { IEntityBase } from "@classes/interface/IEntityBase"

export default interface IBookingAddon extends IEntityBase {
	name : string,
	bookingType : number
}