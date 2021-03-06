import GQLClient, { gql } from "@plugins/core/utils/graphql"
import { TMRegistration, TMRegistrationStep3, TMRegistrationStep4 } from "@plugins/gymkonnect/classes/types/registration"
import { Logger } from "@classes/CONSOLE"
import IAddress from "@plugins/core/interfaces/IAddress"
import { ADDRESS_TYPE } from "@plugins/core/enum/misc"
import { PaymentDetail } from "@plugins/gymkonnect/classes/types/payment"
import moment from "moment"
import { alert } from "@/components/toast"
import { addTransaction, addPayment, linkTransactionPay, linkTransactionUser } from "./common"
import { encode_base64 } from "@classes/utils/base64"

let Console = new Logger("registration/gk-client")

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
		if (response.errors) throw response.errors[0].message
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
					$type: ADDRESS_TYPE!
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
		if (response.errors) throw response.errors[0].message
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
		if (response.errors) throw response.errors[0].message
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
			id: string | number,
			badgenumber: string | number,
			createdAt: string,
			author: string,
		}
		// tslint:disable-next-line: semicolon
	};

	try {
		let imageBase64: string | undefined = undefined
		let imageExtension: string | undefined = undefined
		if (userData.photo){
			try {
				// #!if web
				// TODO: get image and convert it into base64
				// #!else
				imageBase64 = await encode_base64(userData.photo)
				// #!endif
				imageExtension = userData.photo.split(".").pop()
			} catch (error) { }
		}
		let responsePromise = GQLClient.mutate<TResult>(
			gql`
				mutation AddUser(
					$emergencyNumber: String
					$emergencyName: String
					$occupation: Float
					$category: Float
					$imageBase64: String
					$imageExtension: String
					$IDNumber: String
					$IDType: Float
					$email: String
					$homeNumber: String
					$officePhone: String
					$whatsapp: String
					$gender: GENDER
					$dob: DateTime
					$lastName: String
					$middleName: String
					$firstName: String!
					$mobile: String!
					$badgenumber: String
				){
					user: addUser(
						emergencyName: $emergencyName,
						emergencyNumber: $emergencyNumber,
						occupation: $occupation,
						category: $category,
						imageBase64: $imageBase64,
						imageExtension: $imageExtension,
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
						badgenumber: $badgenumber,
					){
						id
						badgenumber
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
				imageBase64,
				imageExtension,
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
				badgenumber: userData.badgenumber ?userData.badgenumber.toString(): undefined,
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
		if (response.errors) throw response.errors[0].message
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
	timeSlot: string | number,
}):Promise<string|number>{
	try {
		let response = await GQLClient.mutate<{user : { id:string|number }}>(
			gql`
				mutation addGymUser(
					$doj: DateTime
					$referredOther: String
					$isGrouped: Boolean
					$userId: Float!
					$timeSlot: Float!
				){
					user: addGymUser(
						doj: $doj
						referredOther: $referredOther
						isGrouped: $isGrouped
						userId: $userId
						timeSlot: $timeSlot
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
				timeSlot: details.timeSlot,
			}
		)
		if (response.errors) throw response.errors[0].message
		if (!response.data) throw "Unable to add gym user"
		return response.data.user.id
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
		if (response.errors) throw response.errors[0].message
		if (!response.data) throw "Unable to get admission fee"
		return response.data.price
	} catch (error) { throw error.toString() }
	return 0
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
		if (response.errors) throw response.errors[0].message
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
		if (response.errors) throw response.errors[0].message
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
	const promiseMaker = async (gymUserID: string|number) => {
		let transactionPromise = addTransaction({
			membershipType: transactionData.membershipType,
			offer: paymentData.offer,
			start: moment(transactionData.doj).toDate(),
			packages: transactionData.packageType,
			packageMagnitude: transactionData.packageMagnitude,
			gymUser: gymUserID,
		})
		let paymentPromise = addPayment({
			amount: paymentData.amount,
			receipt: paymentData.receipt,
			mode: paymentData.mode,
		})
		let gymUserPromise = addGymUser({
			doj: moment(transactionData.doj).toDate(),
			userId: gymUserID,
			referredOther: transactionData.utmSource || "",
			isGrouped,
			timeSlot: transactionData.timeSlot,
		})
		let [ transactionResult, paymentId, gymUserId, ] = await Promise.all([
			transactionPromise,
			paymentPromise,
			gymUserPromise,
		])
		let [ linkedTransactionPay, linkedTransactionUser, ] = await Promise.all([
			linkTransactionPay(transactionResult.id, paymentId),
			linkTransactionUser(transactionResult.id, gymUserID),
		])
		return {
			id: gymUserID,
			...transactionResult,
			paymentId,
		}
	}

	let promises: ReturnType<typeof promiseMaker>[] = []
	clients.forEach(id => promises.push(promiseMaker(id)) )
	let group : {
		id: string | number
		name: string
		population: number
	} | null = null
	if(isGrouped) group = await createGroupGymUsers(clients, groupingId)
	let transactions = await Promise.all(promises)
	return { transactions, group, }
}

async function scanFingerprint(userId: string | number):Promise<boolean>{
	try {
		let userResponse = await GQLClient.query<{
			user: {
				id: string | number,
				user: { badgenumber: string | number, }
			}
		}>(
			gql`
				query gymUserDetails( $userId: Float! ){
					user: gymUserDetails( userId: $userId ){
						id
						user{ badgenumber }
					}
				}
			`,
			{ userId, }
		)
		if (userResponse.errors) throw userResponse.errors
		if (!userResponse.data) throw "Unable to start scanning fingerprint. Invalid User details."
		let response = await GQLClient.mutate<{ scanning: boolean }>(
			gql`mutation enrollUser( $userId: Float! ){ scanning: enrollUser(userId: $userId) }`,
			{ userId, }
		)
		if (response.errors) throw response.errors[0].message
		if (!response.data) throw "Unable to start scanning fingerprint"
		alert(`Please look for <h1>${userResponse.data.user.user.badgenumber}</h1> and enroll`, "success")
		return response.data.scanning
	} catch (error) {
		Console.error(error)
		throw error.toString()
	}
}

export const MemberRegistration = {
	getAmount,
	addMember,
	makePayments,
	getAdmissionFee,
	getEndDate,
	scanFingerprint,
}
