// TODO: use import all for auto import
// TODO: provide functionality to get Object Repos for query
import CoreResolvers from "@plugins/core/resolvers"
import GymkonnectResolvers from "@plugins/gymkonnect/resolvers"

export default [
	...CoreResolvers,
	...GymkonnectResolvers,
]