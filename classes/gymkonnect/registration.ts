import GQLClient, { gql } from "@/utils/graphql"
import { TMRegistration, TMRegistrationStep3 } from "@/classes/types/registration"
import { Logger } from "@classes/CONSOLE"
import IAddress from "@classes/interface/IAddress"
import { ADDRESS_TYPE } from "@classes/enum/misc"
import { sleep } from "@classes/misc"

let Console = new Logger("gk-client/registration")

async function getAmount(details: {
	membershipType: (string| number),
	packageType: (string| number),
	timeSlot: (string| number),
	category: (string| number),
	group: (string | number),
}): Promise<number>{
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
		if(response.errors) throw response.errors
		if(!response.data.price) throw "Unable to fetch price"
		return response.data.price
	} catch (error) {
		Console.error(error)
		throw error.toString()
	}
}

async function addAddress(address: Partial<IAddress>){
	try {
		let response = await GQLClient.mutate<{ address: { id: string| number } }>(
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
 */
async function linkAddressUser(address: string|number, user: string| number): Promise<boolean>{
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

async function addMember(userData: TMRegistration){
	type TResult = {
		user: {
			id: string,
			createdAt: string,
			author: string,
		}
	// tslint:disable-next-line: semicolon
	};

	try{
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
		let [ response, address, ] = await Promise.all([
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
		if(!response.data) throw "Unable to add user"
		await linkAddressUser(address, response.data.user.id)
		return response.data.user.id
	} catch (error) { throw error.toString() }
}

async function makePayments(clients: (string| number)[], transactionData: TMRegistrationStep3){
	await sleep(10000)
	return true
}

export const Registration = {
	getAmount,
	addMember,
	makePayments,
}