import * as GQL from "type-graphql"
import TimeSlot from "@plugins/gymkonnect/model/timeSlot"

@GQL.Resolver(of => TimeSlot)
export default class TimeSlotResolver {

	@GQL.Query(returns => [TimeSlot,])
	public async timeSlot() {
		return TimeSlot.find({ where: { active: 1 } })
	}

	@GQL.Mutation(returns => TimeSlot)
	public async addTimeSlot(
		@GQL.Arg("name") name: string,
		@GQL.Arg("startTime") startTime: string,
		@GQL.Arg("endTime", {nullable :true}) endTime: string,
	) {
		let timeSlot = new TimeSlot()
		timeSlot.name = name
		timeSlot.startTime = startTime
		timeSlot.endTime = endTime

		await timeSlot.save()
		return timeSlot
	}
}