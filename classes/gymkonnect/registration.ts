import GQLClient, { gql } from "@/utils/graphql"
import { TMRegistration, TMRegistrationStep3, TMRegistrationStep4 } from "@/classes/types/registration"
import { Logger } from "@classes/CONSOLE"
import IAddress from "@classes/interface/IAddress"
import { ADDRESS_TYPE } from "@classes/enum/misc"
import { PaymentDetail } from "@/classes/types/payment"
import moment from "moment"

let Console = new Logger("gk-client/registration")

/**
 * Get Amount per person based on parameters
 *
 * @param {({
 * 	membershipType: (string | number),
 * 	packageType: (string | number),
 * 	timeSlot: (string | number),
 * 	category: (string | number),
 * 	group: (string | number),
 * })} details
 * @returns {Promise<number>}
 */
async function getAmount(details: {
	membershipType: (string | number),
	packageType: (string | number),
	timeSlot: (string | number),
	category: (string | number),
	group: (string | number),
}): Promise<number> {
	try {
		Console.verbose("get price", details)
		let response = await GQLClient.query<{ price: number }>(
			gql`
				query GetPrice(
					$membershipType: Float
					$gymPackage: Float
					$group: Float
					$category: Float
					$timeSlot: Float
				){
					price: getPrice(
							membershipType: $membershipType,
							gymPackage: $gymPackage,
							group: $group,
							category: $category,
							timeSlot: $timeSlot,
					)
				}
			`,
			{
				category: details.category,
				group: details.group,
				gymPackage: details.packageType,
				membershipType: details.membershipType,
				timeSlot: details.timeSlot,
			}
		)
		if (response.errors) throw response.errors
		if (!response.data.price) throw "Unable to fetch price"
		return response.data.price
	} catch (error) {
		Console.error(error)
		throw error.toString()
	}
}

/**
 * Add address
 *
 * @param {Partial<IAddress>} address details
 * @returns address id
 */
async function addAddress(address: Partial<IAddress>): Promise<number | string> {
	try {
		let response = await GQLClient.mutate<{ address: { id: string | number } }>(
			gql`
				mutation AddAddress(
					$landmark: String
					$locality: String
					$type: String!
					$pincode: String!
					$country: String!
					$state: String!
					$city: String!
					$house: String!
					$contact: String!
					$receiver: String!
				){
					address: addAddress(
						landmark: $landmark
						locality: $locality
						type: $type
						pincode: $pincode
						country: $country
						state: $state
						city: $city
						house: $house
						contact: $contact
						receiver: $receiver
					){
						id
					}
				}
			`,
			{
				landmark: address.landmark,
				locality: address.locality,
				type: ADDRESS_TYPE.HOME,
				pincode: address.pincode,
				// TODO: verify if saving shortname or full
				country: address.country,
				state: address.state,
				city: address.city,
				house: address.house,
				contact: address.contact,
				receiver: address.receiver,
			}
		)
		if (response.errors) throw response.errors
		if (!response.data) throw "Unable to save Address"
		return response.data.address.id
	} catch (error) { throw error }
}

/**
 * Link an Address and User
 * @param address address id
 * @param user user id
 * @returns link confirmation
 */
async function linkAddressUser(address: string | number, user: string | number): Promise<boolean> {
	try {
		let response = await GQLClient.mutate<{ linked: boolean }>(
			gql`
				mutation linkAddressUser( $address: Float!, $user: Float! ){
					linked: linkAddressUser(address: $address, UserId: $user)
				}
			`,
			{ address, user, }
		)
		if (response.errors) throw response.errors
		if (!response.data) throw "Unable to save Address to user"
		return response.data.linked
	} catch (error) { throw error }
	return false
}

/**
 * Add Member
 *
 * Does not make it gym User
 *
 * @param {TMRegistration} userData user data
 * @returns {(Promise<string|number>)} user id
 */
async function addMember(userData: TMRegistration): Promise<string|number> {
	type TResult = {
		user: {
			id: string,
			createdAt: string,
			author: string,
		}
		// tslint:disable-next-line: semicolon
	};

	try {
		let responsePromise = GQLClient.mutate<TResult>(
			gql`
				mutation AddUser(
					$emergencyNumber: String
					$emergencyName: String
					$occupation: Float
					$category: Float
					$imagePath: String
					$IDNumber: String
					$IDType: Float
					$email: String
					$homeNumber: String
					$officePhone: String
					$whatsapp: String
					$gender: String
					$dob: DateTime
					$lastName: String
					$middleName: String
					$firstName: String!
					$mobile: String!
				){
					user: addUser(
						emergencyName: $emergencyName,
						emergencyNumber: $emergencyNumber,
						occupation: $occupation,
						category: $category,
						imagePath: $imagePath,
						IDNumber: $IDNumber,
						IDType: $IDType,
						email: $email,
						homeNumber: $homeNumber,
						officePhone: $officePhone,
						whatsapp: $whatsapp,
						gender: $gender,
						dob: $dob,
						lastName: $lastName,
						middleName: $middleName,
						firstName: $firstName,
						mobile: $mobile,
					){
						id
						createdAt
						author
					}
				}
			`,
			{
				emergencyNumber: userData.emergencyContactNumber,
				emergencyName: userData.emergencyContactName,
				occupation: userData.occupation,
				category: userData.category,
				imagePath: userData.photo,
				IDNumber: userData.idNumber,
				IDType: userData.idType,
				address: userData.address,
				email: userData.email,
				homeNumber: userData.homeNumber,
				officePhone: userData.officeNumber,
				whatsapp: userData.whatsappNumber,
				gender: userData.gender,
				dob: userData.dob,
				lastName: userData.lastName,
				middleName: userData.middleName,
				firstName: userData.firstName,
				mobile: userData.mobile,
			}
		)
		let [response, address,] = await Promise.all([
			responsePromise,
			addAddress({
				landmark: userData.address.landmark,
				locality: userData.address.locality,
				type: userData.address.type,
				pincode: userData.address.pincode,
				country: userData.address.country,
				state: userData.address.state,
				city: userData.address.city,
				house: userData.address.house,
				contact: userData.homeNumber,
				receiver: userData.firstName + userData.middleName + userData.lastName,
			}),
		])
		if (response.errors) throw response.errors
		if (!response.data) throw "Unable to add user"
		await linkAddressUser(address, response.data.user.id)
		return response.data.user.id
	} catch (error) { throw error.toString() }
}

/**
 * Create Gym User
 *
 * @param {({
 * 	doj: Date,
 * 	agreement: number,
 * 	referredOther: string,
 * 	isGrouped: boolean,
 * 	userId: string|number,
 * })} details
 * @returns {(Promise<string|number>)} gym user id
 */
async function addGymUser(details:{
	doj: Date,
	referredOther: string,
	isGrouped: boolean,
	userId: string|number,
}):Promise<string|number>{
	try {
		let response = await GQLClient.mutate<{user : { id:string|number }}>(
			gql`
				mutation addGymUser(
					$doj: DateTime
					$referredOther: String
					$isGrouped: Boolean
					$userId: Float!
				){
					user: addGymUser(
						doj: $doj
						referredOther: $referredOther
						isGrouped: $isGrouped
						userId: $userId
					){
						id
					}
				}
			`,
			{
				doj: details.doj,
				referredOther: details.referredOther,
				isGrouped: details.isGrouped,
				userId: details.userId,
			}
		)
		if (response.errors) throw response.errors
		if (!response.data) throw "Unable to add gym user"
		return response.data.user.id
	} catch (error) {
		Console.error(error)
		throw error.toString()
	}
}

/**
 * Link Transaction to User
 *
 * @param {(string| number)} transactionId transaction id
 * @param {(string|number)} userId user id
 * @returns {Promise<boolean>} linked status
 */
async function linkTransactionUser(transactionId: string| number, userId: string|number):Promise<boolean>{
	try {
		let response = await GQLClient.mutate<{ linked: boolean }>(
			gql`
				mutation linkTransactionUser( $transactionId: Float!, $userId: Float! ){
					linkTransactionUser( transactionId: $transactionId, userId: $userId )
				}
			`,
			{
				transactionId,
				userId,
			}
		)
		if (response.errors) throw response.errors
		if (!response.data) throw "Unable to link transaction to user"
		return response.data.linked
	} catch (error) {
		Console.error(error)
		throw error.toString()
	}
}

/**
 * Get Admission Fee rate
 *
 * @returns price
 */
async function getAdmissionFee() {
	try {
		Console.verbose("get admission fee")
		let response = await GQLClient.query<{ price: number }>(gql` query AdmissionFee{ price: getPrice(name: "ADMISSION FEE") } `)
		if (response.errors) throw response.errors
		if (!response.data) throw "Unable to get admission fee"
		return response.data.price
	} catch (error) { throw error.toString() }
	return 0
}

/**
 * Add Transaction
 *
 * @param {({
 * 		membershipType: string|number,
 * 		offer?: string|number,
 * 		gymUser: string|number,
 * 		start: Date,
 * 		packageMagnitude: number,
 * 		packages: string|number,
 * 	})} transaction
 * @returns {(Promise<{
 * 	id: string | number,
 * 	mode: string | number,
 * 	start: Date,
 * 	end: Date,
 * 	endExtendedDate: Date,
 * }>)}
 */
async function addTransaction(
	transaction: {
		membershipType: string|number,
		offer?: string|number,
		gymUser: string|number,
		start: Date,
		packageMagnitude: number,
		packages: string|number,
	}
): Promise<{
	id: string | number,
	mode: string | number,
	start: Date,
	end: Date,
	endExtendedDate: Date,
}>{
	try {
		let response = await GQLClient.mutate<{
			transaction: {
				id: string | number,
				mode: string | number,
				start: Date,
				end: Date,
				endExtendedDate: Date,
			}
		}>(
			gql`
				mutation addTransaction(
					$membershipType: Float
					$offer: Float
					$gymUser: Float
					$start: DateTime!
					$packageMagnitude: Float!
					$packages: Float!
				){
					transaction: addTransaction(
						membershipType: $membershipType
						offer:$offer
						gymUser: $gymUser
						start:$start
						packageMagnitude: $packageMagnitude
						packages:$packages
					){
						id
						mode
						start
						end
						endExtendedDate
					}
				}
			`,
			{
				membershipType: transaction.membershipType,
				offer: !transaction.offer ? -1 : transaction.offer,
				gymUser: transaction.gymUser,
				start: transaction.start,
				packageMagnitude: typeof transaction.packageMagnitude==="string"?parseInt(transaction.packageMagnitude):transaction.packageMagnitude,
				packages: transaction.packages,
			}
		)
		if (response.errors) throw response.errors
		if (!response.data) throw "Unable to save transaction"
		return response.data.transaction
	} catch (error) {
		Console.error(error)
		throw error.toString()
	}
}

/**
 * Add Payment
 *
 * @param {({
 * 	adjustment: string|number,
 * 	amount: number,
 * 	receipt: string|number,
 * 	mode: string|number,
 * })} payment details
 * @returns {(Promise<string|number>)} payment id
 */
async function addPayment(payment:{
	adjustment?: number,
	amount: number,
	receipt: string|number,
	mode: string|number,
}):Promise<string|number>{
	try {
		if(!payment.adjustment) payment.adjustment = 0
		let response = await GQLClient.mutate<{ payment: { id: string| number }}>(
			gql`
				mutation AddPayment(
					$adjustment: Float!
					$amount: Float!
					$receipt: String!
					$mode: Float!
				){
					payment: addPayment(
						adjustment: $adjustment
						amount: $amount
						receipt: $receipt
						mode: $mode
					){
						id
					}
				}
			`,
			{
				adjustment: payment.adjustment,
				amount: payment.amount,
				receipt: payment.receipt,
				mode: payment.mode,
			}
		)
		if (response.errors) throw response.errors
		if (!response.data) throw "Unable to save payment"
		return response.data.payment.id
	} catch (error) {
		Console.error(error)
		throw error.toString()
	}
}

/**
 * Link transaction and payment
 *
 * @param {(string|number)} transactionId transaction id
 * @param {(string|number)} paymentId payment id
 * @returns {Promise<boolean>} link status
 */
async function linkTransactionPay(
	transactionId: string|number,
	paymentId: string|number
):Promise<boolean>{
	try {
		let response = await GQLClient.mutate<{linked: boolean}>(
			gql`
				mutation linkTransactionPay(
					$transactionId: Float!
					$paymentId: Float!
				){
					linked: linkTransactionPay(
						transactionId: $transactionId 
						paymentId: $paymentId 
					)
				}
			`,
			{
				transactionId,
				paymentId,
			}
		)
		if (response.errors) throw response.errors
		if (!response.data) throw "Unable to link transaction and payment"
		return response.data.linked
	} catch (error) {
		Console.error(error)
		throw error.toString()
	}
}

async function createGroupGymUsers(userIDs: (string | number)[], groupingId: string|number):Promise<{
	id: string|number,
	name: string,
	population: number,
}>{
	try {
		let response = await GQLClient.mutate<{
			group: {
				id: string|number,
				name: string,
				population: number,
			}
		}>(
			gql`
				mutation createGroupGymUsers(
					$userIDs: [Float!]!
					$groupingId: Float!
				){
					group: createGroupGymUsers(
						userIDs: $userIDs
						groupingId: $groupingId 
					){
						id
						name: groupName
						population: groupCount
					}
				}
			`,
			{
				userIDs,
				groupingId,
			}
		)
		if (response.errors) throw response.errors
		if (!response.data) throw "Unable to create group from users"
		return response.data.group
	} catch (error) {
		Console.error(error)
		throw error.toString()
	}
}

/**
 * Get End Date for a package with magnitude and start date
 *
 * @param {({
 * 	startDate: Date,
 * 	packages: number| string,
 * 	packageMagnitude: number,
 * })} details
 * @returns {Promise<Date>} end date
 */
async function getEndDate(details:{
	startDate: Date,
	packages: number| string,
	packageMagnitude: number,
}):Promise<Date>{
	try {
		let response = await GQLClient.query<{ end: Date }>(
			gql`
				query getTransactionEndDateDry(
					$packageMagnitude: Float!
					$startDate: DateTime!
					$packages: Float!
				){
					end: getTransactionEndDateDry(
						packages: $packages
						packageMagnitude: $packageMagnitude
						startDate: $startDate
					)
				}
			`,
			{
				startDate: details.startDate,
				packages: details.packages,
				packageMagnitude: typeof details.packageMagnitude === "string" ? parseInt(details.packageMagnitude) : details.packageMagnitude,
			},
			{
				fetchPolicy: "no-cache"
			}
		)
		if (response.errors) throw response.errors
		if (!response.data) throw "Unable to Get End Date"
		return moment(response.data.end).toDate()
	} catch (error) {
		Console.error(error)
		throw error.toString()
	}
}

async function makePayments(
	clients: (string | number)[],
	transactionData: TMRegistrationStep3 & TMRegistrationStep4,
	paymentData: PaymentDetail,
	groupingId: string|number
){
	let isGrouped = !!clients.length
	const promiseMaker = async (gymUser: string|number) => {
		let transactionPromise = addTransaction({
			membershipType: transactionData.membershipType,
			offer: paymentData.offer,
			start: moment(transactionData.doj).toDate(),
			packages: transactionData.packageType,
			packageMagnitude: transactionData.packageMagnitude,
			gymUser,
		})
		let paymentPromise = addPayment({
			amount: paymentData.amount,
			receipt: paymentData.receipt,
			mode: paymentData.mode,
		})
		let gymUserPromise = addGymUser({
			doj: moment(transactionData.doj).toDate(),
			userId: gymUser,
			referredOther: transactionData.utmSource || "",
			isGrouped,
		})
		let [ transactionResult, paymentId, gymUserId, ] = await Promise.all([
			transactionPromise,
			paymentPromise,
			gymUserPromise,
		])
		let [ linkedTransactionPay, linkedTransactionUser, ] = await Promise.all([
			linkTransactionPay(transactionResult.id, paymentId),
			linkTransactionUser(transactionResult.id, gymUser),
		])
		return {
			id: gymUser,
			...transactionResult,
			paymentId
		}
	}

	let promises: Promise<any>[] = []
	clients.forEach(id => promises.push(promiseMaker(id)) )
	let group : {
		id: string | number
		name: string
		population: number
	} | null = null
	if(isGrouped) group = await createGroupGymUsers(clients, groupingId)
	let result = await Promise.all(promises)
	return [ result, group, ]
}

export const Registration = {
	getAmount,
	addMember,
	makePayments,
	getAdmissionFee,
	getEndDate,
}