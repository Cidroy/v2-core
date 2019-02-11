import { IEntityBase } from "@classes/interface/IEntityBase"

export default interface ITrainerType extends IEntityBase {
	name: string,
	startTime : Date,
	endTime : Date,
}