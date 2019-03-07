import { TMemberListTableItems } from "../types/member-list"

async function getAllMembersForRegistrationList(): Promise<TMemberListTableItems[]>{
	let result = [
		{ id: 8, badgenumber: "00000008", mode: "ACTIVE", name: "Dr. Manhatten", membership: "PLATINUM", package: "ANNUAL", endDate: "26/01/20", mobile: "90000 00000", enrolled: true, },
		{ id: 7, badgenumber: "00000007", mode: "ACTIVE", name: "Bucky Barnes", membership: "PLATINUM", package: "ANNUAL", endDate: "26/01/20", mobile: "90000 00000", enrolled: false, },
		{ id: 2, badgenumber: "00000002", mode: "ACTIVE", name: "Bruce Wayne", membership: "PLATINUM", package: "ANNUAL", endDate: "26/01/20", mobile: "90000 00000", enrolled: false, },
		{ id: 4, badgenumber: "00000004", mode: "PENDING", name: "Peter Parker", membership: "GOLD", package: "MONTHLY", endDate: "26/01/19", mobile: "90000 00000", enrolled: true, },
		{ id: 6, badgenumber: "00000006", mode: "FREEZED", name: "Natasha Romanoff", membership: "GOLD", package: "MONTHLY", endDate: "26/01/19", mobile: "90000 00000", enrolled: false, },
		{ id: 1, badgenumber: "00000001", mode: "FREEZED", name: "Barry Allen", membership: "GOLD", package: "MONTHLY", endDate: "26/01/19", mobile: "90000 00000", enrolled: false, },
		{ id: 3, badgenumber: "00000003", mode: "ACTIVE", name: "Tony Stark", membership: "PLATINUM", package: "ANNUAL", endDate: "26/01/20", mobile: "90000 00000", enrolled: true, },
		{ id: 5, badgenumber: "00000005", mode: "COMPLETE", name: "Steve Rogers", membership: "GOLD", package: "MONTHLY", endDate: "26/01/19", mobile: "90000 00000", enrolled: true, },
		{ id: 9, badgenumber: "00000009", mode: "PENDING", name: "Stephen Strange", membership: "GOLD", package: "MONTHLY", endDate: "26/01/19", mobile: "90000 00000", enrolled: true, },
		{ id: 10, badgenumber: "00000010", mode: "COMPLETE", name: "Thor Odienson", membership: "GOLD", package: "MONTHLY", endDate: "26/01/19", mobile: "90000 00000", enrolled: true, },
	]
	return result
}

export const Members = {
	getAllMembersForRegistrationList,
}