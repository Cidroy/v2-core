export type PaymentDetail = {
	id: string | number
	// FIXME: make sure UI follows this
	amount: number,
	mode: string | number,
	transactionId: string | number,
	receipt: string | number,
	offer: string | number,
}