import { GymkonnectStore } from "../state/gymkonnect"
import { Logger } from "@classes/CONSOLE"
import { TAX_TYPE } from "@plugins/gymkonnect/enum/misc"

const Console = new Logger(`misc/gk`)
/**
 * Calculate tax amount based on tax id
 *
 * @export
 * @param {(string|number)} taxId Tax Id
 * @param {number} amount Amount
 * @returns {number} tax amount
 */
export function taxAmount(taxId: string|number, amount: number): number{
	let _amount = 0
	let tax = GymkonnectStore.GK_TAX(taxId)
	try {
		if(!tax) throw "Invalid Tax Scheme"
		switch (tax.taxType) {
			case TAX_TYPE.FLAT:
				_amount = tax.magnitude
				break
			case TAX_TYPE.PERCENTAGE:
				_amount = amount * tax.magnitude / 100
				break
			default: break
		}
	} catch (error) { Console.error(error) }
	return _amount
}
