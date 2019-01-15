export function Permission(permission: { [K in string]: string }, mode: "all" | "any" = "all"): boolean{
	return true
}