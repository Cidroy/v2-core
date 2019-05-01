import { IEntityBase } from "@plugins/core/interfaces/IEntityBase"
enum subscription{}
export default interface IGymOfferLogic extends IEntityBase {
	offer: number
	programme: number
	category?: number
	membershipType?: number
	package?: number
	/**
	 * Discount amount in percentage
	 *
	 * @type {number}
	 * @memberof IGymOfferLogic
	 */
	discountamount?: number
	addSubscription
}