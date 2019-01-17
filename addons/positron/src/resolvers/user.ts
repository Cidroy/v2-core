import * as GQL from "type-graphql"
import {GENDER} from "@classes/enum/misc"
import User from "@positron/models/user"

@GQL.Resolver(of => User)
export default class UserResolver{
	@GQL.Mutation(returns => User)
	public async addUser(
		
		@GQL.Arg("name") name : string,
		@GQL.Arg("mobile") mobile : string,
		@GQL.Arg("badgenumber", { nullable: true }) badgenumber ? : number,
		@GQL.Arg("image", { nullable: true }) image ? : string,
		@GQL.Arg("email", { nullable: true }) email ? : string
	){
		let user = new User()
		if (badgenumber) user.badgenumber = badgenumber
		user.name = name
		user.mobile = mobile
		if(image) user.image = image
		if (email) user.email = email
		user.wdmsId = 999
		user.mode = "1"
		user.idCard = "1"
		user.image = ""
		user.occupation = "1"
		user.gender = GENDER.MALE
		user.doj = new Date()
		user.preferredTime = new Date()
		
		await user.save()
		return user
	}
}