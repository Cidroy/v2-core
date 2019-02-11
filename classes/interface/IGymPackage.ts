import { IEntityBase } from "@classes/interface/IEntityBase"
import { DURATION } from "@classes/enum/misc"

export default interface IGymPackage extends IEntityBase {
	name: string,
	description?: string,
	count : number,
	duration : DURATION,

}