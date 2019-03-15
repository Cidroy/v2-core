import { Logger } from "@classes/CONSOLE"
import GQLClient, { gql } from "@/utils/graphql"
import { GymkonnectStore } from "@plugins/gymkonnect/state/misc"
import { sleep } from "@classes/misc"
import moment from "moment"

const Console = new Logger(`renewal/gk-client`)

const defaultInfo = async () => {
	const {
		defaultRegistrationStep3User,
		defaultRegistrationStep4User,
		defaultRegistrationUser
	} = await import("../../types/registration")
	return {
		transaction: {
			...defaultRegistrationStep3User,
			...defaultRegistrationStep4User,
		},
		grouping: GymkonnectStore.GK_GROUPINGS[0].id,
		usersCount: 1,
		client: defaultRegistrationUser,
		dojRange: {
			start: moment().toDate(),
			end: moment().add(10, "days").toDate(),
		},
		x: 1,
	}
}

type TRenewalInfo = Unpacked<ReturnType<typeof defaultInfo>>

async function info(clientId: string| number):Promise<TRenewalInfo>{
	try {
		// let response = await GQLClient.query<{}>(
		// 	gql``,
		// 	{}
		// )
		// if (response.errors) throw response.errors
		// if (!response.data) throw "Unable to det renewal Info"
		await sleep(2000)
		Console.info(await defaultInfo())
		return await defaultInfo()
	} catch (error) {
		Console.error(error)
		throw error.toString()
	}
}

export const Renewal = {
	info,
	defaultInfo,
}