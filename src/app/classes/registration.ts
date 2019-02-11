import { TMRegistration, PaymentData } from "./types/registration"
import GQLClient, { gql } from "@/utils/graphql"
import { MiscStore } from "@/state/modules/misc"
import { TGQLPackages } from "@/state/modules/gk-helper"
import moment from "moment"

export default class ClientRegistration{

	private static async addTransaction(userData: TMRegistration & { id: string|number }): Promise<string| number>{
		try {
			let id = 0
			// TODO:
			return id
		} catch (error) { throw error }
	}

	private static async addPayment(paymentData: PaymentData): Promise<string| number>{
		try {
			let id = 0
			// TODO:
			return id
		} catch (error) { throw error }
	}

	private static async linkTransactionPayment(paymentId: number| string, transactionId: number| string): Promise<boolean>{
		try {
			// TODO:
			return true
		} catch (error) { throw error }
	}

	private static async getPaymentData(transactionId: string | number) {
		try {
			// TODO:
			return true
		} catch (error) { throw error }
	}

	private static async addMember(userData: TMRegistration){
		try {
			return 999
			let response = await GQLClient.mutate<any>(
				gql`
				mutation AddUser(
					$emergencyNumber: String
					$emergencyName: String
					$occupation: Float
					$category: Float
					$imagePath: String
					$IDNumber: String
					$IDType: Float
					$address: String
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
					addUser(
						emergencyName: $emergencyName,
						emergencyNumber: $emergencyNumber,
						occupation: $occupation,
						category: $category,
						imagePath: $imagePath,
						IDNumber: $IDNumber,
						IDType: $IDType,
						address: $address,
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
						firstName
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
			console.log(response.data)
			if (response.errors) throw response.errors
			return response.data.addUser.id
		} catch (error) { throw error }
	}

	public static async register(userData: TMRegistration){
		try {
			let memberId = await ClientRegistration.addMember(userData)
			let transactionId = await ClientRegistration.addTransaction({
				...userData,
				id: memberId,
			})
			let paymentData = await ClientRegistration.getPaymentData(transactionId)
			return {
				memberId,
				transactionId,
			}
		} catch (error) { throw error }
	}

	public static async getUser(id){
		let r = await GQLClient.query(
			gql`
				query User($id : Number!){
					user(id: $id){
						firstName
						lastName
					}
				}
			`,
			{
				
			}
		)
	}
}