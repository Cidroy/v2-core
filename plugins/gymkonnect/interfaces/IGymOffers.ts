import { IEntityBase } from "@plugins/core/interfaces/IEntityBase"

export default interface IGymOffers extends IEntityBase {
	name: string,
	description?: string,
	startDate?: Date,
	endDate?: Date,
	isPrebookAvailable?: boolean,
	PrebookStartDate?: Date
}