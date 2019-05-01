import { IEntityBase } from "@plugins/core/interfaces/IEntityBase"

export default interface IGroups extends IEntityBase {
	groupingId: number
	groupCount: number
	groupName: string
}