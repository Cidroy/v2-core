import { TMRegistration } from "./types/registration"
import GQLClient, { gql } from "@/utils/graphql"

export default class ClientRegistration{
	public static async register(userData: TMRegistration): Promise<string|number>{
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
					$address: [Float!]
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
				address: 0, // FIXME: add address seperately
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
		if(response.errors) throw response.errors
		return response.data.addUser.id
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