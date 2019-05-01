import { IEntityBase } from "@plugins/core/interfaces/IEntityBase"

export default interface IGymFreezeRules extends IEntityBase{
	packages : number,
	category : number,
	grouping?: number,
	programme?: number,
	membershipType?: number,
	count?: number,
	minDays : number,
	maxDays : number,

}