import { IEntityBase } from "@classes/interface/IEntityBase"

export default interface IBookingAddonMap extends IEntityBase {
	bookingType: number,
	bookingAddon: number,
}