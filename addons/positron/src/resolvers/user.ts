import * as GQL from "type-graphql"
import {GENDER} from "@classes/enum/misc"
import User, { WdmsID } from "@positron/models/user"
import Address from "@positron/models/address"
import Member from "@positron/Biometric/Member"
import * as DB from "typeorm"
import Utils from "@classes/functions/utils"
import ZonesAvailable from "@positron/models/zonesAvailable"
import GymUsers from "@positron/models/gymUsers"
import GymUserMode from "@positron/models/gymUserMode"

export async function getUserIdForWdmsId(userId: number, zoneId: number): Promise<number>{
	try{
		let user = await User.find({ where: { id: userId } })
		let wdmsId = user[0].wdmsId
		if(wdmsId === undefined) throw "user is not added in wdms"
		let index = wdmsId.findIndex((element) => {
			return element.zoneID == zoneId
		})
		if(index == -1)  throw "user not found in wdms"
		return wdmsId[index].userID
	}
	catch(err){
		return 0
	}
}
@GQL.Resolver(of => User)
export default class UserResolver{
	
	@GQL.FieldResolver(returns => Address, {nullable: true})
	public async address(@GQL.Root() user: User){
		return Address.findOne({ where: { active: 1 , id: user.address} })
	}

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
		return undefined !== await User.findOne({ where: { email } })
	}

	@GQL.Query(returns => Boolean)
	public async isMobileExists(
		@GQL.Arg("mobile") mobile: string,
	) {
		return undefined !== await User.findOne({ where: { mobile } })
	}

	@GQL.Mutation(returns => User)
	public async addUser(
		
		@GQL.Arg("mobile") mobile : string,
		@GQL.Arg("firstName") firstName : string,
		// @GQL.Arg("wdmsId", type => [String,], { nullable: true }) wdmsId? : object,
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
		// if (wdmsId) user.wdmsId = wdmsId
		if (badgenumber){
			user.badgenumber = badgenumber
			await Member.add(badgenumber, { name: firstName +" "+ ((lastName) ? <string>lastName : "")})
			let entityManager = DB.getManager()
			let userinfo = await entityManager.query("select userId, company_id from userinfo where badgenumber= ?", [Utils.appendZeroesToBadgenumber(badgenumber),])
			let wdmsId = {
				zoneID: <number>userinfo[0].company_id,
				userID: <number>userinfo[0].userId
			}
			user.wdmsId = [wdmsId,]

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

	@GQL.Query(returns => Boolean)
	public async enrollUser(
		@GQL.Arg("userId") userId: number,
	){
		try{
			let zone = await ZonesAvailable.find({ where: { zoneName: "Unfreezed"}})
			let zoneID = zone[0].zoneId
			let id = await getUserIdForWdmsId(userId, zoneID)
			if(!id) throw "user not added to wdms"
			Member.ScanFingerprint(id.toString())
			return true
		}
		catch(err){
			return false
		}
	}

}