import { IEntityBase } from "@plugins/core/interfaces/IEntityBase"
export default interface IGymUserHealth extends IEntityBase {
	gymUser?: number
	weight: number
	height: number
	bodyType: number
	bloodGroup?: number
}
