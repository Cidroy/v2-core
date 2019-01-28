import * as GQL from "type-graphql"
import SlotBlock from "@positron/models/slotBlock"

@GQL.Resolver(of => SlotBlock)
export default class SlotBlockResolver {
	@GQL.Mutation(returns => SlotBlock)
	public async addSlotBlock(
		@GQL.Arg("start") start: Date,
		@GQL.Arg("End") End: Date,
		@GQL.Arg("bookingType") bookingType: string,
	) {
		let slotBlock = new SlotBlock()
		slotBlock.start = start
		slotBlock.End = End
		slotBlock.bookingType = bookingType

		await slotBlock.save()
		return slotBlock
	}
}