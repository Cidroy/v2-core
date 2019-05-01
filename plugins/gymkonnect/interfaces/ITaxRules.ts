import { IEntityBase } from "@plugins/core/interfaces/IEntityBase"
import { TAX_TYPE, SERVICE_TYPE } from "@plugins/gymkonnect/enum/misc"

export default interface ITaxRules extends IEntityBase {
	name: string,
	description?: string,
	taxType : TAX_TYPE,
	magnitude: number,
	serviceType: SERVICE_TYPE,
	isInclusive?: boolean
	showExplicitly?: boolean
}