import { IEntityBase } from "@classes/interface/IEntityBase"

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