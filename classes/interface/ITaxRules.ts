import { IEntityBase } from "@classes/interface/IEntityBase"
import { TAX_TYPE, SERVICE_TYPE} from "@classes/enum/misc"

export default interface ITaxRules extends IEntityBase {
	name: string,
	description?: string,
	taxType : TAX_TYPE,
	magnitude: number,
	serviceType: SERVICE_TYPE,
	isInclusive?: boolean
	showExplicitly?: boolean
}