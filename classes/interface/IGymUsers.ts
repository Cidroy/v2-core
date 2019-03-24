import { IEntityBase } from "@classes/interface/IEntityBase"

export default interface IGymUsers extends IEntityBase {
	/**
	 * References Users.id
	 *
	 * @type {number}
	 * @memberof IAdminUsers
	 */
	userId: number,
	/**
	 * References gym_User_mode.id
	 *
	 * @type {number}
	 * @memberof IUser
	 */
	mode?: number,
	isGrouped?: boolean,
	/**
	 * References enquiry.id
	 *
	 * @type {number}
	 * @memberof IGymUsers
	 */
	enquiryInitial?: number,
	enquiryRecent?: number,
	/**
	 * references Gym_user_health.id
	 *
	 * @type {number}
	 * @memberof IGymUsers
	 */
	healthJoining?: number,
	healthCurrent?: number,
	/**
	 * References admin_user.id
	 *
	 * @type {number}
	 * @memberof IGymUsers
	 */
	referredByAdmin?: number,
	/**
	 * References gym_user.id
	 *
	 * @type {number}
	 * @memberof IGymUsers
	 */
	referredByUser?: number,
	/**
	 * References gym_user.id
	 *
	 * @type {number}
	 * @memberof IGymUsers
	 */
	referredTo?: number[],
	referredOther?: string,
	/**
	 * References gym_user.id
	 *
	 * @type {number}
	 * @memberof IGymUsers
	 */
	transferFrom?: number,
	/**
	 * References gym_user.id
	 *
	 * @type {number}
	 * @memberof IGymUsers
	 */
	transferTo?: number,
	balance?: number,
	transaction?: number,
	diet?: number,
	personalTraining?: number,
	counselling?: number,
	/**
	 * References availableTime.id
	 *
	 * @type {Date-Date}
	 * @memberof IGymUsers
	 */
	preferredTime?: string,
	timeSlot?: number,
	/**
	 * References agreement.id
	 *
	 * @type {number}
	 * @memberof IGymUsers
	 */
	agreement?: number
	doj?: Date
}