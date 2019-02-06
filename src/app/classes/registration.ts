import { TMRegistration } from "./types/registration"
import GQLClient, { gql } from "@/utils/graphql"

export default class ClientRegistration{
	public static async register(userData: TMRegistration): Promise<string|number>{
		let response = await GQLClient.mutate(
			gql`
				mutation AddUser(
					$emergencyNumber: String
					$emergencyName: String
					$organization: Float
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
					$badgenumber: String
					$wdmsId: [String!]
					$firstName: String!
					$mobile: String!
				){
					addUser(
						emergencyName: $emergencyName,
						emergencyNumber: $emergencyNumber,
						organization: $organization,
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
						badgenumber: $badgenumber,
						wdmsId: $wdmsId,
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
			}
		)
		return 0
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