import { TPermission } from "./permission"

type TMenuHeading = { icon: string, heading: string, to?: string, permission: TPermission | TPermission[] }
type TMenuLink = { icon: string, text: string, to: string, permission: TPermission | TPermission[] }
type TMenuExpandable = { icon: string, text: string, children: TMenuLink[], model: boolean, "icon-alt": string, name: string, permission: TPermission | TPermission[] }
export type TMenu = TMenuHeading | TMenuLink | TMenuExpandable