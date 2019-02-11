import * as GQL from "type-graphql"
import * as DB from "typeorm"
import LockedBadgenumbers from "@positron/models/lockedBadgenumbers"

type user= {
	name: string,
	badgenumber: string,
}
@GQL.Resolver()
export default class miscResolver {

	@GQL.Query(returns =>String)
	public async isBadgenumberValid(
		@GQL.Arg("badgenumber") badgenumber: string,
	) {
		try{
			let entityManager = DB.getManager()
			let user = await entityManager.query("SELECT if(EXISTS(select 1 from userinfo where badgenumber= ?) =1 , 'true', 'false' )as exist", [badgenumber,])
			return user[0].exist && LockedBadgenumbers.find({ where: { badgenumber: badgenumber } }) !== undefined
		}
		catch(error){
			console.log(error)
			return false
		}
	}
	@GQL.Query(returns =>Number)
	public async generateBadgenumber() {
		try{
			let entityManager = DB.getManager()
			let badgenumber = await entityManager.query("select MAX(badgenumber)+1 as badgenumber from userinfo")
			return badgenumber[0].badgenumber
			 
		}
		catch(error){
			console.log(error)
			return null
		}
	}
}