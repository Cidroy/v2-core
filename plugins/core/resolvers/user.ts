import * as GQL from "type-graphql"
import path from "path"
import { GENDER } from "@plugins/core/enum/misc"
import User, { WdmsID } from "@plugins/core/model/user"
import Address from "@plugins/core/model/address"
import Member from "@positron/Biometric/Member"
import * as DB from "typeorm"
import Utils from "@classes/functions/utils"
import ZonesAvailable from "@plugins/gymkonnect/model/zonesAvailable"
import GymUsers from "@plugins/gymkonnect/model/gymUsers"
import GymUserMode from "@plugins/gymkonnect/model/gymUserMode"
import { Logger } from "@classes/CONSOLE"
import { decode_base64 } from "@classes/utils/base64"
import AppConfig from "@classes/appConfig"
import uuid from "uuid"
import * as fs from "fs-extra"

const Console = new Logger(`user/gql-resolver`)
export async function getWdmsIdForUserId(userId: number, zoneId: number): Promise<number> {
	try {
		let user = await User.find({ where: { id: userId } })
		if (user.length == 0) throw "User not added yet"
		let wdmsId = user[0].wdmsId
		if (wdmsId === undefined) throw "user is not added in wdms"
		let index = wdmsId.findIndex((element) => {
			return element.zoneID == zoneId
		})
		if (index == -1) throw "user not found in wdms"
		return wdmsId[index].userID
	}
	catch (err) {
		return 0
	}
}
@GQL.ObjectType()
export class FindGymUser extends User{
	@GQL.Field(type => String)
	public foundBy !: string
}
@GQL.Resolver(of => User)
export default class UserResolver {

	@GQL.FieldResolver(returns => String)
	public async name(@GQL.Root() user: User) {
		return `${user.firstName} ${user.middleName || ""} ${user.lastName || ""}`
			.replace(/\s+/, " ")
			.trimRight()
	}

	@GQL.FieldResolver(returns => Address, { nullable: true })
	public async address(@GQL.Root() user: User) {
		return Address.findOne({ where: { active: 1, id: user.address } })
	}
	@GQL.FieldResolver(returns => GymUsers, { nullable: true })
	public async gymUser(@GQL.Root() user: User) {
		return GymUsers.findOne({ where: { active: 1, userId: user.id } })
	}

	@GQL.Query(returns => [User,])
	public async user() {
		return User.find({ where: { active: 1 } })
	}

	@GQL.Query(returns => [User,])
	public async FindGymUsers(
		@GQL.Arg("keys", type => [String,]) keys: string[],
		@GQL.Arg("value") value: string
	): Promise<User[]> {
		let gymUsers: User[] = []
		let tempUser = new User()
		for (let i = 0; i < keys.length; i++) {
			let key = keys[i]
			Console.info({ key, value, keys: Object.keys(tempUser) })
			try {
				let users: User[] = await User.find({ [key]: DB.Like(`%${value}%`) })
				gymUsers = [...gymUsers, ...users,]
			} catch (e) { }
		}
		return gymUsers
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
	) {
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

		@GQL.Arg("mobile") mobile: string,
		@GQL.Arg("firstName") firstName: string,
		// @GQL.Arg("wdmsId", type => [String,], { nullable: true }) wdmsId? : object,
		@GQL.Arg("badgenumber", { nullable: true }) badgenumber?: string,
		@GQL.Arg("middleName", { nullable: true }) middleName?: string,
		@GQL.Arg("lastName", { nullable: true }) lastName?: string,
		@GQL.Arg("dob", { nullable: true }) dob?: Date,
		@GQL.Arg("gender", type => GENDER ,{ nullable: true }) gender?: GENDER,
		@GQL.Arg("whatsapp", { nullable: true }) whatsapp?: string,
		@GQL.Arg("officePhone", { nullable: true }) officePhone?: string,
		@GQL.Arg("homeNumber", { nullable: true }) homeNumber?: string,
		@GQL.Arg("email", { nullable: true }) email?: string,
		@GQL.Arg("address", { nullable: true }) address?: number,
		@GQL.Arg("IDType", { nullable: true }) IDType?: number,
		@GQL.Arg("IDNumber", { nullable: true }) IDNumber?: string,
		@GQL.Arg("imageBase64", { nullable: true }) imageBase64?: string,
		@GQL.Arg("imageExtension", { nullable: true }) imageExtension?: string,
		@GQL.Arg("category", { nullable: true }) category?: number,
		@GQL.Arg("occupation", { nullable: true }) occupation?: number,
		@GQL.Arg("organization", { nullable: true }) organization?: number,
		@GQL.Arg("emergencyName", { nullable: true }) emergencyName?: string,
		@GQL.Arg("emergencyNumber", { nullable: true }) emergencyNumber?: string,
	) {

		let user = new User()
		user.firstName = firstName
		user.mobile = mobile
		// if (wdmsId) user.wdmsId = wdmsId
		if (badgenumber) {
			user.badgenumber = badgenumber
			await Member.add(badgenumber, { name: firstName + " " + ((lastName) ? <string>lastName : "") })
			let entityManager = DB.getManager()
			let userinfo = await entityManager.query("select userId, company_id from userinfo where badgenumber= ?", [Utils.appendZeroesToBadgenumber(badgenumber),])
			let wdmsId = {
				zoneID: userinfo[0] ? userinfo[0].company_id : 0,
				userID: userinfo[0] ? userinfo[0].userId : 0
			}
			user.wdmsId = [wdmsId,]
		} else {
			let entityManager = DB.getManager()
			let badgenumber = await entityManager.query("select if(max(badgenumber) is null, 1,max(badgenumber)+1 ) as badgenumber from userinfo")
			let badgenumberStart: string = badgenumber[0].badgenumber
			user.badgenumber = badgenumberStart
			await Member.add(badgenumberStart, { name: firstName + " " + ((lastName) ? <string>lastName : "") })
			let userinfo = await entityManager.query("select userId, company_id from userinfo where badgenumber= ?", [Utils.appendZeroesToBadgenumber(badgenumberStart),])
			let wdmsId = {
				zoneID: userinfo[0] ? userinfo[0].company_id : 0,
				userID: userinfo[0] ? userinfo[0].userId : 0
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
		if (imageBase64){
			try {
				let imageName = `profile-photos/${user.badgenumber || uuid()}-${user.firstName || ""}-${user.middleName || ""}-${user.lastName || ""}.${imageExtension}`
				await fs.ensureDir(path.resolve(AppConfig.DataFolder, "profile-photos"))
				// TODO: make this central
				let imagePath = path.resolve(AppConfig.DataFolder, imageName)
				await decode_base64(imageBase64, imagePath)
				user.imagePath = `%POSITRON_URL%/${imageName}`
			} catch (error) {
				Console.error("unable to save image", error)
			}
		}
		if (category) user.category = category
		if (occupation) user.occupation = occupation
		if (organization) user.organization = organization
		if (emergencyName) user.emergencyName = emergencyName
		if (emergencyNumber) user.emergencyNumber = emergencyNumber

		await user.save()
		return user
	}

	@GQL.Mutation(returns => Boolean)
	public async enrollUser(
		@GQL.Arg("userId") userId: number,
	) {
		try {
			let zone = await ZonesAvailable.find({ where: { zoneName: "Unfreezed" } })
			if (zone.length == 0) throw "door not added"
			let zoneID = zone[0].zoneId
			let id = await getWdmsIdForUserId(userId, zoneID)
			if (!id) throw "user not added to wdms"
			Member.ScanFingerprint(id.toString())
			return true
		}
		catch (error) {
			Console.error(error)
			return false
		}
	}

}
