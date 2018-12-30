// Allow usage and resolution of Vue files
declare module "*.vue" {
	import Vue from "vue"
	export default Vue
}

declare interface Point{
	x: number,
	y: number,
}