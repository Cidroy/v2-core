import { IEntityBase } from "@classes/interface/IEntityBase"

export default interface IBooking extends IEntityBase {
	user : string,
	bookingType : string,
	start : Date,
	end : Date,
	bookingPackage? : string,
	bookingAddons? : string[],
	payment? : string
}