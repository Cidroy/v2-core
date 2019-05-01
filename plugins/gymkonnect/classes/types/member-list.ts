import { USER_MODE } from "@plugins/gymkonnect/enum/user-mode"

export type TMemberListTableItems = {
	id: number | string,
	badgenumber: string,
	mode: USER_MODE,
	name: string,
	membership: string,
	package: string,
	endDate: string,
	mobile: string,
	enrolled: boolean,
	transaction: {
		id: string | number
	}
}

export type TMemberListTableHeader = {
	text: string,
	value: keyof TMemberListTableItems,
	align?: string,
	sortable?: boolean,
}
