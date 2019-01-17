import * as GQL from "type-graphql"
import { Neutron } from "@neutron/NEUTRON"

@GQL.Resolver()
export default class OptionsResolver {

	@GQL.Authorized({ "positron/core": "test" })
	@GQL.Mutation(type => Boolean)
	public async test() {
		Neutron.AddZone("Freezed")
		return true
	}
}