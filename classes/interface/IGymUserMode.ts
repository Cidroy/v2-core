import { IEntityBase } from "@classes/interface/IEntityBase"

export default interface IGymUserMode extends IEntityBase {
	name: string,
	description?: string
}