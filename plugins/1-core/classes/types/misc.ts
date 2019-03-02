export type TNotification =
	{
		seen: boolean,
		time: Date | string,
		title: string,
		subtitle: string,
	}
	| {
		seen: boolean,
		time: Date | string,
		title: string,
		subtitle: string,
		avatar: string,
	}
	| {
		seen: boolean,
		time: Date | string,
		title: string,
		subtitle: string,
		icon: string,
		iconClass?: string,
	}
	| {
		seen: boolean,
		time: Date | string,
		header: string,
		icon: string,
	}