import { IEntityBase } from "@classes/interface/IEntityBase"

export default interface IGroupings extends IEntityBase {
	name: string
	defaultCount: number
	minCount: number
	maxCount: number
}