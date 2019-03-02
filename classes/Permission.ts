import { TPermission } from "./types/permission"

export function Permission(
	permission: TPermission,
	mode: "all" | "any" = "all"
): boolean{
	return true
}