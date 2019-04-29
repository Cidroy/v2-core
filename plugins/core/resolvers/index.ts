import OptionsResolver from "@plugins/core/resolvers/options"
import UserResolver from "@plugins/core/resolvers/user"
import AddressResolver from "@plugins/core/resolvers/address"
import AdminUsersResolver from "@plugins/core/resolvers/adminUsers"

export default [
	OptionsResolver,
	UserResolver,
	AddressResolver,
	AdminUsersResolver,
]