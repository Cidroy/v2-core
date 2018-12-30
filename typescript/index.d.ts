// Allow usage and resolution of Vue files
declare module "*.vue" {
	import Vue from "vue"
	export default Vue
}

// Allow usage and resolution of json files
declare module "*.json" {
	const value: any;
	export default value;
}

declare interface Point{
	x: number,
	y: number,
}