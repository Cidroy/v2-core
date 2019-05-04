import { IEntityBase } from "@plugins/core/interfaces/IEntityBase"

export default interface ISlotBlock extends IEntityBase {
	start : Date,
	End : Date,
	bookingType : number | string
}
