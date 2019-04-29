import * as GQL from "type-graphql"
import SpaBooking from "@plugins/gymkonnect/model/spaBooking"
import { Logger } from "@classes/CONSOLE"

const Console = new Logger(`gql-resolver/spaBooking`)

@GQL.Resolver(of => SpaBooking)
export default class SpaBookingResolver {

	@GQL.Query(returns => [SpaBooking,])
	public async spaBooking() {
		return SpaBooking.find({ where: { active: 1 } })
	}

	@GQL.Mutation(returns => SpaBooking)
	public async addSpaBooking(
		@GQL.Arg("amenities", type => [Number,], {nullable: true}) amenities: number[],
		@GQL.Arg("grouping") grouping: number,
		@GQL.Arg("category") category: number,
		@GQL.Arg("attendees") attendees: number,
		@GQL.Arg("startDate") startDate: Date,
		@GQL.Arg("endDate") endDate: Date,
		@GQL.Arg("time") time: Date,
	) {

		let spaBooking = new SpaBooking()
		amenities && ( spaBooking.amenities = amenities)
		spaBooking.grouping = grouping
		spaBooking.category = category
		spaBooking.attendees = attendees
		spaBooking.startDate = startDate
		spaBooking.endDate = endDate
		spaBooking.time = time

		await spaBooking.save()
		return spaBooking
	}

	@GQL.Mutation(returns => Boolean)
	public async linkSpaPayment(
		@GQL.Arg("paymentId") paymentId: number,
		@GQL.Arg("spaBookingId") spaBookingId: number,
	) {
		try{
			let spaBooking = await SpaBooking.createQueryBuilder()
				.update(SpaBooking)
				.set({ payment: paymentId })
				.where({ id: spaBookingId })
				.execute()
			if (spaBooking === undefined) throw "Invalid booking id"
		}catch(error){
			Console.error(error)
			throw error
		}
	}
	@GQL.Mutation(returns => Boolean)
	public async linkSpaUser(
		@GQL.Arg("user") user: number,
		@GQL.Arg("spaBookingId") spaBookingId: number,
	) {
		try{
			let spaBooking = await SpaBooking.createQueryBuilder()
				.update(SpaBooking)
				.set({ user: user })
				.where({ id: spaBookingId })
				.execute()
			if (spaBooking === undefined) throw "Invalid booking id"
		}catch(error){
			Console.error(error)
			throw error
		}
	}
}