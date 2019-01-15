import { IEntityBase } from "@classes/interface/IEntityBase"

export default interface IGymFreezeRules extends IEntityBase{
	packages : string,
	count : number,
	minDays : number,
	maxDays : number,
	
}