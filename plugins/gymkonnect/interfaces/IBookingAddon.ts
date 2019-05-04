import { IEntityBase } from "@plugins/core/interfaces/IEntityBase"

export default interface IBookingAddon extends IEntityBase {
	name : string,
	description?: string,
}
