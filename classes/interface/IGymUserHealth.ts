import { IEntityBase } from "@classes/interface/IEntityBase"
export default interface IGymUserHealth extends IEntityBase {
	gymUser?: number
	weight: number
	height: number
	bodyType: number
}