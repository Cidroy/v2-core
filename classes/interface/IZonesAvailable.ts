import { IEntityBase } from "@classes/interface/IEntityBase"

export default interface ICategory extends IEntityBase {
	name: string,
	description?: string,
	zoneName: string,
	zoneId: number
}