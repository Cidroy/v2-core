import * as TGQL from "type-graphql"
import OptionsResolver from "@positron/resolvers/options"
import ClientResolver from "@positron/resolvers/client"
import UserResolver from "@positron/resolvers/user"
import TransactionResolver from "@positron/resolvers/transaction"
import FreezeRulesResolver from "@positron/resolvers/FreezeRules"
import FreezeResolver from "@positron/resolvers/freezes"
import { Permission } from "@classes/Permission"
import GymBodyTypeResolver from "@positron/resolvers/gymBodyType"
import BookingResolver from "@positron/resolvers/booking"
import BookingAddonResolver from "@positron/resolvers/bookingAddon"
import BookingTypeResolver from "@positron/resolvers/bookingType"
import CategoryResolver from "@positron/resolvers/category"
import IDTypeResolver from "@positron/resolvers/idType"
import OccupationResolver from "@positron/resolvers/occupation"
import OrganizationResolver from "@positron/resolvers/organization"
import PriceListResolver from "@positron/resolvers/priceList"
import SlotBlockResolver from "@positron/resolvers/slotBlock"
import GymPurposeResolver from "@positron/resolvers/gymPurpose"
import GymUsersResolver from "@positron/resolvers/gymUsers"
import GymProgrammeResolver from "@positron/resolvers/gymProgramme"
import MembershipTypeResolver from "@positron/resolvers/membershipType"
import GymPackageResolver from "@positron/resolvers/gymPackage"
import CounsellorTypeResolver from "@positron/resolvers/counsellorType"
import TrainerTypeResolver from "@positron/resolvers/trainerType"
import GymUserModeResolver from "@positron/resolvers/gymUserMode"
import PaymentModeResolver from "@positron/resolvers/paymentMode"

export default class GQL{
	private static Resolvers = [
		OptionsResolver,
		ClientResolver,
		UserResolver,
		TransactionResolver,
		FreezeRulesResolver,
		FreezeResolver,
		GymBodyTypeResolver,
		BookingResolver,
		BookingAddonResolver,
		BookingTypeResolver,
		CategoryResolver,
		IDTypeResolver,
		OccupationResolver,
		OrganizationResolver,
		PriceListResolver,
		SlotBlockResolver,
		GymPurposeResolver,
		GymUsersResolver,
		GymProgrammeResolver,
		MembershipTypeResolver,
		GymPackageResolver,
		CounsellorTypeResolver,
		TrainerTypeResolver,
		GymUserModeResolver,
		PaymentModeResolver,
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
	private static authChecker: TGQL.AuthChecker<string> = ({ root, args, context, info }, roles) => Permission(<any>roles)
}