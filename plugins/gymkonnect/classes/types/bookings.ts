import { GymkonnectStore } from "@plugins/gymkonnect/state/gymkonnect"

export type TSpaBookingArgs = {
	group: string | number,
	amenities: (string | number)[],
	attendeeCount: number,
	doj: string,
	amount: number,
}

export const defaultSpaBookingArgs = (): TSpaBookingArgs => ({
	group: (GymkonnectStore.GK_SPA_GROUPINGS[0] || { id: 0 }).id,
	amenities: [],
	attendeeCount: (GymkonnectStore.GK_SPA_GROUPINGS[0] || { count: 0 }).count,
	doj: (new Date()).toISOString().substr(0,10),
	amount: 1,
})