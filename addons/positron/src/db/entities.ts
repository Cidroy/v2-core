// TODO: use import all for auto import
// TODO: provide functionality to get Object Repos for query
import CoreEntities from "@plugins/core/model"
import GymkonnectEntities from "@plugins/gymkonnect/model"

export default [
	...CoreEntities,
	...GymkonnectEntities,
]