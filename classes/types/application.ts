import { TPermission } from "./permission"

type TMenuHeading = { icon: string, heading: string, to?: string, permission: TPermission | TPermission[] }
type TMenuLink = { icon: string, text: string, to: string, permission: TPermission | TPermission[] }
type TMenuExpandable = { icon: string, text: string, children: TMenuLink[], model: boolean, "icon-alt": string, name: string, permission: TPermission | TPermission[] }
export type TMenu = TMenuHeading | TMenuLink | TMenuExpandable

export type TRoute = {
	path: string;
	name: string;
	component: () => Promise<{
		functional: boolean;
		render(h: any, { data, children }: any): any;
	}>;
	props: boolean;
}

export type TAutoThread = {
	// tslint:disable-next-line: ban-types
	fn: Function,
	args: any,
	once: boolean,
	repeat: number,
	parallel: boolean,
	instant: boolean,
}
