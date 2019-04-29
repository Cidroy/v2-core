import * as GQL from "type-graphql"
import SlotBlock from "@plugins/gymkonnect/model/slotBlock"

@GQL.Resolver(of => SlotBlock)
export default class SlotBlockResolver {

	@GQL.Query(returns => [SlotBlock,])
	public async slotBlock() {
		return SlotBlock.find({ where: { active: 1 } })
	}

	@GQL.Mutation(returns => SlotBlock)
	public async addSlotBlock(
		@GQL.Arg("start") start: Date,
		@GQL.Arg("End") End: Date,
		@GQL.Arg("bookingType") bookingType: number,
	) {
		let slotBlock = new SlotBlock()
		slotBlock.start = start
		slotBlock.End = End
		slotBlock.bookingType = bookingType

		await slotBlock.save()
		return slotBlock
	}
}