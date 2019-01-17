export type WDMSConnectionConfig = {
	ssl: boolean
	host: string
	port: number
	Zones: {
		Freezed: string
		Unfreezed: string
		[K: string]: string
	}
	DeviceName: string
}