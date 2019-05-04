import { IEntityBase } from "@plugins/core/interfaces/IEntityBase"

export default interface IBookingAddonMap extends IEntityBase {
	bookingType: number,
	bookingAddon: number,
}
