export type PaymentDetail = {
	id: string | number
	// FIXME: make sure UI follows this
	amount: number,
	mode: string | number,
	transactionId: string | number,
	description?: string,
	note ?: string,
	receipt: string | number,
	offer: string | number,
}