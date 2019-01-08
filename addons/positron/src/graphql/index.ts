import * as TGQL from "type-graphql"
import OptionsResolver from "@positron/resolvers/options"
import ClientResolver from "@positron/resolvers/user"
import POSITRON from "@positron/lib/positron"

export default class GQL{
	private static Resolvers = [
		OptionsResolver,
		ClientResolver,
	]

	public static async Schema(){
		try {
			return await TGQL.buildSchema({
				resolvers: GQL.Resolvers,
				authChecker: GQL.authChecker
			})
		} catch (error) {
			console.error("GraphQL Schema generation failed", error)
			throw "GraphQL Schema generation failed"
		}
	}

	// FIXME: type checks are incorrect
	private static authChecker: TGQL.AuthChecker<string> = ({ root, args, context, info }, roles) => POSITRON.Permission(<any>roles)
}