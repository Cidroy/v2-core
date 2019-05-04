import * as GQL from "type-graphql"
import * as DB from "typeorm"

import Options from "@plugins/core/model/options"

@GQL.Resolver(of => Options)
export default class OptionsResolver{

	@GQL.Query(returns => Options)
	public async option( @GQL.Arg("name") name: string ){
		return Options.findOne({ name })
	}

	@GQL.Authorized({ "positron/core": "options-all|view" })
	@GQL.Query(returns => [ Options, ])
	public async options(
		@GQL.Arg("names", type => [ String, ] ) names: string[]
	){
		return Options.find({
			name: <any>DB.In(names)
		})
	}

	@GQL.Authorized({ "positron/core": "options|add" })
	@GQL.Mutation(type => Options)
	public async addOption(
		@GQL.Arg("name") name: string,
		@GQL.Arg("value") value: string
	){
		let option = new Options()
		option.name = name
		option.value = value

		await option.save()
		return option
	}
}
