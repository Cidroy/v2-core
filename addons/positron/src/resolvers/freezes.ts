import * as GQL from "type-graphql"
import Freezes from "@positron/models/freezes"

@GQL.Resolver(of => Freezes)
export default class FreezeResolver{
	@GQL.Mutation(returns => Freezes)
	public async addFreeze(
		@GQL.Arg("user") user : string,
		@GQL.Arg("start") start: Date,
		@GQL.Arg("count", { nullable: true }) count? : number,
		@GQL.Arg("end", { nullable: true }) end? : Date,
		@GQL.Arg("payment", { nullable: true }) payment? : string,
		@GQL.Arg("days", { nullable: true }) days? : number,
		@GQL.Arg("transaction", { nullable: true }) transaction?: string,
	){
		let freezes = new Freezes()
		freezes.user = user
		freezes.start = start
		if(count) freezes.count = count
		if(end) freezes.end = end
		if(payment) freezes.payment = payment
		if(days) freezes.days = days
		if(transaction) freezes.transaction = transaction

		await freezes.save()
		return freezes
	}
}