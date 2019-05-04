import * as TGQL from "type-graphql"
import { ApolloServer } from "apollo-server-express"
import { GraphQLSchema } from "graphql"
import { Permission } from "@classes/Permission"
import express from "express"
import path from "path"
import { Logger } from "@classes/CONSOLE"
import resolvers from "./resolvers"
import loaders from "@positron/db/loaders"

const Console = new Logger(`gql/positron`)
export default class GQL{
	private static get URI(){ return "/gql" }

	public static async Schema(): Promise<GraphQLSchema>{
		try {
			return await TGQL.buildSchema({
				resolvers,
				authChecker: GQL.authChecker,
				// #!if debug
				emitSchemaFile: path.resolve("dist/positron-schema.gql"),
				//# #!endif
			})
		} catch (error) {
			Console.error("GraphQL Schema generation failed", error)
			throw "GraphQL Schema generation failed"
		}
	}

	// FIXME: type checks are incorrect
	private static authChecker: TGQL.AuthChecker<string> = ({ root, args, context, info }, roles) => Permission(<any>roles)

	public static Context({ req }: { req: Express.Request }){
		const session: Express.Session = req.session!
		return {
			req,
			session,
			loaders,
		}
	}

	public static async Middleware(){
		Console.verbose("creating gql schema")
		let apollo = new ApolloServer({
			schema: await GQL.Schema(),
			context: GQL.Context,
			playground: true,
			formatResponse(response: any){ Console.verbose("response", response); return response },
			formatError(error: any){ Console.error(error); return error },
		})
		let app = express()
		apollo.applyMiddleware({
			app,
			path: GQL.URI,
		})
		return app
	}
}

declare global {
	interface GQLContext extends ReturnType<typeof GQL.Context>{}
}
