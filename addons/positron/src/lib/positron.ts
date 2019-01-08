export default class POSITRON{
	// TODO: detect user
	public static User = {
		id: "gymkonnect"
	}

	// TODO: implementation
	public static Permission(permission: { [K in string]: string }, mode: "all"|"any" = "all"): boolean{
		return true
	}
}