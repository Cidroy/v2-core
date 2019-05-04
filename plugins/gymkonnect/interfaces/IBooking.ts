import { IEntityBase } from "@plugins/core/interfaces/IEntityBase"

export default interface IBooking extends IEntityBase {
	user : number,
	bookingType : number,
	start : Date,
	end : Date,
	bookingPackage? : number,
	bookingAddons? : number[],
	payment? : number
	serverId ? : string
}
