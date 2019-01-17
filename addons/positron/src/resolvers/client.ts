import * as GQL from "type-graphql"
import Client from "@positron/models/client"

// TODO: after explore
@GQL.Resolver(of => Client)
export default class ClientResolver{
	@GQL.Query(type => Client)
	public async client(
		@GQL.Arg("id", { nullable: true }) id: string
	): Promise<Client> {
		let client = await Client.findOne(id)
		if(!client) throw "Client does not exists"
		return client
	}
}