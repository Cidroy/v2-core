import { VuexModule, Module, getModule, MutationAction } from "vuex-module-decorators"
import store from "@/state/store"
import GQLClient, { gql } from "@/utils/graphql"
import { Logger } from "@classes/CONSOLE"

let log = new Logger("gql/test")

@Module({ dynamic: true, store, name: "test" })
class Test extends VuexModule {
	private _test: boolean = false
	@MutationAction({ mutate: ["_test",] }) public async test_1() {
		try {
			let response = await GQLClient.mutate(
				gql`
					mutation AddPrice(
						$price: Float!
						$organization: Float!
						$typeId: Float!
						$typeName: String!
					){
						addPrice(
							price : $price
							organization : $organization
							typeId : $typeId
							typeName : $typeName
						) {
							    typeName
								typeId
								organization
								price
						}
					}
				`,
				{
					typeId: 4,
					price: 3000,
					organization: 4,
					typeName: "GroundBooking"
				}
			)
			log.okay(response)
		} catch (error) {
			log.error(error.message)
		}
		return { _test: false }
	}

	@MutationAction({ mutate: ["_test",] }) public async test_2() {
		try {
			let response = await GQLClient.query(
				gql`
					query PriceList{
							priceList{
								typeId
								typeName
								organization
								price
							}
					}
				`,
				{
					// name: "random"
				}
			)
			log.okay(response)
		} catch (error) {
			log.error(error)
		}
		return { _test: false }
	}
}

export const TestStore = getModule(Test)
