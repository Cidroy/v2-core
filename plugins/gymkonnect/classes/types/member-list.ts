export type TMemberListTableItems = {
	id: number | string,
	badgenumber: string,
	mode: string,
	name: string,
	membership: string,
	package: string,
	endDate: string,
	mobile: string,
	enrolled: boolean,
}

export type TMemberListTableHeader = {
	text: string,
	value: keyof TMemberListTableItems,
	align?: string,
	sortable?: boolean,
}
