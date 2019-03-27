export type TRPTTransation = {
	grouping: string | number,
	attendees: number,
	purposes: (string | number)[],
	package: string | number,
	trainerType: string | number,
	doj: string,
}