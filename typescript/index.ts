// Allow usage and resolution of Vue files
declare module "*.vue" {
	import Vue from "vue"
	export default Vue
}

declare interface Point{
	x: number,
	y: number,
}

declare module "*.jpg" {
	const value: any
	export = value
}

declare module "*.png" {
	const value: any
	export = value
}

type Unpacked<T> =
	T extends (infer U)[] ? U :
	T extends (...args: any[]) => infer U ? U :
	T extends Promise<infer U> ? U :
	T
