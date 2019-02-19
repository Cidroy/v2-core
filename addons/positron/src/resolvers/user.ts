import * as GQL from "type-graphql"
import {GENDER} from "@classes/enum/misc"
import User from "@positron/models/user"
import Address from "@positron/models/address"
import Member from "@positron/Biometric/Member"

@GQL.Resolver(of => User)
export default class UserResolver{
	
	@GQL.Query(returns => [User,])
	public async user() {
		return User.find({ where: { active: 1 } })
	}
	@GQL.Mutation(returns => Boolean)
	public async linkAddressUser(
		@GQL.Arg("UserId") UserId: number,
		@GQL.Arg("address") userAddress: number,
	) {
		try {

			let user = await User.createQueryBuilder()
				.update(User)
				.set({ address: userAddress })
				.where({ id: UserId })
				.execute()
			if (user === undefined) throw "Invalid user"

			let address = await Address.createQueryBuilder()
				.update(Address)
				.set({ user: UserId })
				.where({ id: userAddress })
				.execute()
			if (address === undefined) throw "Invalid address"
			return true
		} catch (error) {
			return false

		}
	}

	@GQL.Query(returns => Boolean)
	public async isEmailExists(
		@GQL.Arg("email") email: string,
	){
		let user = await User.find({ where: { email: email } })
		console.log(user)
		return user === undefined
	}

	@GQL.Query(returns => Boolean)
	public async isMobileExists() {
		
	}

	@GQL.Mutation(returns => User)
	public async addUser(
		
		@GQL.Arg("mobile") mobile : string,
		@GQL.Arg("firstName") firstName : string,
		@GQL.Arg("wdmsId", type => [String,], { nullable: true }) wdmsId? : object,
		@GQL.Arg("badgenumber", { nullable: true }) badgenumber ? : string,
		@GQL.Arg("middleName", { nullable: true }) middleName ? : string,
		@GQL.Arg("lastName", { nullable: true }) lastName ? : string,
		@GQL.Arg("dob", { nullable: true }) dob ? : Date,
		@GQL.Arg("gender", { nullable: true }) gender ? : GENDER,
		@GQL.Arg("whatsapp", { nullable: true }) whatsapp ? : string,
		@GQL.Arg("officePhone", { nullable: true }) officePhone ? : string,
		@GQL.Arg("homeNumber", { nullable: true }) homeNumber ? : string,
		@GQL.Arg("email", { nullable: true }) email ? : string,
		@GQL.Arg("address", { nullable: true }) address ? : number,
		@GQL.Arg("IDType", { nullable: true }) IDType ? : number,
		@GQL.Arg("IDNumber", { nullable: true }) IDNumber ? : string,
		@GQL.Arg("imagePath", { nullable: true }) imagePath ? : string,
		@GQL.Arg("category", { nullable: true }) category ? : number,
		@GQL.Arg("occupation", { nullable: true }) occupation ? : number,
		@GQL.Arg("organization", { nullable: true }) organization ? : number,
		@GQL.Arg("emergencyName", { nullable: true }) emergencyName ? : string,
		@GQL.Arg("emergencyNumber", { nullable: true }) emergencyNumber ? : string,
	){
		
		let user = new User()
		user.firstName = firstName
		user.mobile = mobile
		if (wdmsId) user.wdmsId = wdmsId
		if (badgenumber){
			user.badgenumber = badgenumber
			Member.add(badgenumber, { name: firstName + (lastName) ? <string>lastName: ""  })
			// FIXME:
		}
		if (middleName) user.middleName = middleName
		if (lastName) user.lastName = lastName
		if (dob) user.dob = dob
		if (gender) user.gender = gender
		if (whatsapp) user.whatsapp = whatsapp
		if (officePhone) user.officePhone = officePhone
		if (homeNumber) user.homeNumber = homeNumber
		if (email) user.email = email
		if (address) user.address = address
		if (IDType) user.IDType = IDType
		if (IDNumber) user.IDNumber = IDNumber
		if (imagePath) user.imagePath = imagePath
		if (category) user.category = category
		if (occupation) user.occupation = occupation
		if (organization) user.organization = organization
		if (emergencyName) user.emergencyName = emergencyName
		if (emergencyNumber) user.emergencyNumber = emergencyNumber

		await user.save()
		return user
	}

}