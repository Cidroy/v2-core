import { IEntityBase } from "@classes/interface/IEntityBase"

export default interface IGroups extends IEntityBase {
	groupingId: number
	groupCount: number
	groupName: string
}