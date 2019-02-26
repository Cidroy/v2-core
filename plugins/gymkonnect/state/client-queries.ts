// CLIENT QUERIES
import GQLClient, { gql } from "@/utils/graphql"
import { Logger } from "@classes/CONSOLE"
let log = new Logger("gql/test")

async function template(){
	
}
async function AddGymPurpose(){
	let response = await GQLClient.mutate(
		gql`
					mutation AddGymPurpose(
						$description: String
						$name: String!
					){
						addGymPurpose(
							description : $description
							name : $name
						) {
							name
							description
						}
					}
				`,
		{
			name: "FAT-LOSSss",
			description: "fat lossss"
		}
	)
	log.okay(response)
}
async function addOrganization(){
	let response = await GQLClient.mutate(
		gql`
					mutation AddOrganization(
						$description: String
						$name: String!
					){
						addOrganization(
							description : $description
							name : $name
						) {
							name
							description
						}
					}
				`,
		{
			name: "FAT-LOSSss",
			description: "fat lossss"
		}
	)
	log.okay(response)
}
async function addOccupation(){
	let response = await GQLClient.mutate(
		gql`
					mutation AddOccupation(
						$description: String
						$name: String!
					){
						addOccupation(
							description : $description
							name : $name
						) {
							name
							description
						}
					}
				`,
		{
			name: "FAT-LOSSss",
			description: "fat lossss"
		}
	)
	log.okay(response)
}
async function AddIDType(){
	let response = await GQLClient.mutate(
		gql`
					mutation AddIDType(
						$description: String
						$name: String!
					){
						addIDType(
							description : $description
							name : $name
						) {
							name
							description
						}
					}
				`,
		{
			name: "FAT-LOSSss",
			description: "fat lossss"
		}
	)
	log.okay(response)
}
async function GymPurposes(){
	let response = await GQLClient.query(
		gql`
					query GymPurposes{
							gymPurposes{
								name
								description
							}
					}
				`,
		{
			// name: "random"
		}
	)
	log.okay(response)
}
async function organizations(){
	let response = await GQLClient.query(
		gql`
					query Organizations{
							organizations{
								name
								description
							}
					}
				`,
		{
			// name: "random"
		}
	)
	log.okay(response)
}
async function occupations(){
	let response = await GQLClient.query(
				gql`
					query Occupations{
							occupations{
								name
								description
							}
					}
				`,
		{
			// name: "random"
		}
	)
	log.okay(response)
}
async function IDTypes(){
	let response = await GQLClient.query(
		gql`
					query IDTypes{
							IDTypes{
								name
								description
							}
					}
				`,
		{
			// name: "random"
		}
	)
	log.okay(response)
}
async function AddGymBodyType(){
	let response = await GQLClient.mutate(
				gql`
					mutation AddGymBodyType(
						$description: String
						$name: String!
					){
						addGymBodyType(
							description : $description
							name : $name
						) {
							name
							description
						}
					}
				`,
		{
			name: "MESOMORPH",
			description: "mesomorph'"
		}
	)
	log.okay(response)
}
async function gymBodyTypes(){
	let response = await GQLClient.query(
		gql`
					query gymBodyTypes{
							gymBodyTypes{
								name
								description
							}
					}
				`,
		{
			// name: "random"
		}
	)
	log.okay(response)
}
async function freezes(){
	let response = await GQLClient.query(
				gql`
					query freezes{
							freezes{
								user
								count
								end
								payment
								days
								transaction
							}
					}
				`,
		{
			// name: "random"
		}
	)
	log.okay(response)
}
async function addFreeze(){
	let response = await GQLClient.mutate(
		gql`
					mutation addFreeze(
						$transaction: Float
						$days: Float
						$payment: Float
						$end: DateTime
						$count: Float
						$start: DateTime!
						$user: Float!
					){
						addFreeze(
							transaction : $transaction
							days : $days
							payment : $payment
							end : $end
							count : $count
							start : $start
							user : $user
						) {
							transaction
							days
							payment
							end
							count
							start
							user
						}
					}
				`,
		{
			user: 2,
			start: "2019-01-29T09:14:52.000Z",
			end: "2019-01-29T09:14:52.000Z",
			count: 15,
			payment: 10,
			days: 30,
			transaction: 1
		}
	)
	log.okay(response)
}
async function addFreezeRules(){
	let response = await GQLClient.mutate(
				gql`
					mutation AddFreezeRules(
						$maxDays: Float!
						$minDays: Float!
						$count: Float!
						$packages: Float!
						$programme: Float!
						$grouping: Float!
						$category: Float!
					){
						addFreezeRules(
							maxDays : $maxDays
							minDays : $minDays
							count : $count
							packages : $packages
							programme : $programme
							grouping : $grouping
							category : $category
						) {
							packages
							count
							minDays
							maxDays
							programme
							grouping
							category
						}
					}
				`,
		{
			packages: 6,
			count: 3,
			minDays: 4,
			maxDays: 30,
			category: 3,
			grouping: 2,
			programme: 5
		}
	)
	log.okay(response)
}
async function gymFreezeRules(){
	let response = await GQLClient.query(
		gql`
					query GymFreezeRules{
						gymFreezeRules{
							packages
							count
							minDays
							maxDays
							
  						}
					}
				`,
		{
			// name: "random"
		}
	)
	log.okay(response)
}
async function bookingTypes(){
	let response = await GQLClient.query(
		gql`
					query BookingType{
						bookingType{
							name
							slotDuration
							slotStart
							slotEnd
							description
						}
					}
				`,
		{
			// name: "random"
		}
	)
	log.okay(response)
}
async function addBookingType(){
	let response = await GQLClient.mutate(
				gql`
					mutation AddBookingType(
						$description: String
						$slotEnd: DateTime!
						$slotStart: DateTime!
						$slotDuration: Float!
						$name: String!
					){
						addBookingType(
							description : $description
							slotEnd : $slotEnd
							slotStart : $slotStart
							slotDuration : $slotDuration
							name : $name
						) {
							name
							slotEnd
							slotStart
							description
							slotDuration
						}
					}
				`,
		{
			name: "spa",
			slotDuration: 20,
			slotStart: "2019-01-29T09:44:45.659Z",
			slotEnd: "2019-01-29T09:44:45.659Z"
		}
	)
	log.okay(response)
}
async function addBookingAddon(){
	let response = await GQLClient.mutate(
		gql`
					mutation AddBookingAddon(
						$bookingType: Float!,
						$name: String!
					){
						addBookingAddon(
							name : $name
							bookingType : $bookingType
						) {
							name
							bookingType
						}
					}
				`,
		{
			name: "something5",
			bookingType: 5
		}
	)
	log.okay(response)
}
async function bookingAddons(){
	let response = await GQLClient.query(
		gql`
					query BookingAddons{
						bookingAddons{
							id
							author
							name
							serverId
							bookingType
							createdAt
						}
					}
				`,
		{
			// name: "random"
		}
	)
	log.okay(response)
}
async function addBooking(){
	let response = await GQLClient.mutate(
		gql`
					mutation AddBooking(
						$payment: Float,
						$bookingAddons: [Float!],
						$bookingPackage: Float,
						$end: DateTime!,
						$start: DateTime!,
						$bookingType: Float!,
						$user: Float!,
					){
						addBooking(
							payment : $payment
							bookingAddons : $bookingAddons 
							bookingPackage : $bookingPackage
							end : $end
							start : $start
							bookingType : $bookingType
							user : $user
						) {
							user
							bookingType
							start
							end
							bookingPackage
							bookingAddons
							payment
						}
					}
				`,
		{
			user: 4,
			bookingType: 5,
			start: "2019-01-29",
			end: "2019-01-31"
		}
	)
	log.okay(response)
}
async function bookings(){
	let response = await GQLClient.query(
		gql`
					query Bookings{
						bookings{
							user
							bookingType
							bookingPackage
							bookingAddons
							payment
						}
					}
				`,
		{
			// name: "random"
		}
	)
	log.okay(response)
}
async function AddCategory(){
	let response = await GQLClient.mutate(
				gql`
					mutation AddCategory($name: String!){
						addCategory(name: $name) {
							name
							description
						}
					}
				`,
				{
					name: "random"
				}
			)
			log.okay(response)
}

async function Categories(){
	let response = await GQLClient.query(
		gql`
			query Categories{
				categories{
					name
					id
					author
				}
			}
		`,
		{ }
	)
	log.okay(response)
}