import { IEntityBase } from "@plugins/core/interfaces/IEntityBase"
import { DURATION } from "@plugins/gymkonnect/enum/misc"

export default interface IGymPackage extends IEntityBase {
	name: string,
	description?: string,
	count : number,
	duration : DURATION,

}