import { IEntityBase } from "@classes/interface/IEntityBase"

export default interface ISlotBlock extends IEntityBase {
	start : Date,
	End : Date,
	bookingType : number
}