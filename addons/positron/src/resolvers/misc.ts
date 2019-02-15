import * as GQL from "type-graphql"
import * as DB from "typeorm"
import LockedBadgenumbers from "@positron/models/lockedBadgenumbers"
import LockedBadgenumbersResolver from "@positron/resolvers/lockedBadgenumbers"

type user= {
	name: string,
	badgenumber: string,
}
@GQL.Resolver()
export default class miscResolver {

	@GQL.Query(returns =>String)
	public async isBadgenumberValid(
		@GQL.Arg("badgenumber") badgenumber: number,
	) {
		try{
			let entityManager = DB.getManager()
			let userinfo = await entityManager.query("select 1 from userinfo where badgenumber= ?", [badgenumber,])
			// FIXME: delete from lockedbadgenumber here
			let lockedBadgenumber =await LockedBadgenumbers.find({ where: { badgenumber: badgenumber } })
			let isBadgenumberAvailable = userinfo === undefined && lockedBadgenumber === undefined
			return isBadgenumberAvailable
			if(isBadgenumberAvailable){
				let badgenumberToBeLocked = new LockedBadgenumbers()
				badgenumberToBeLocked.badgenumber = badgenumber
				await badgenumberToBeLocked.save()
			}
		}
		catch(error){
			console.log(error)
			return false
		}
	}
	@GQL.Query(returns =>[Number,])
	public async generateBadgenumber(
		@GQL.Arg("quantity") quantity : number
	) {
		try{
			let entityManager = DB.getManager()
			let badgenumber = await entityManager.query("select if(max(badgenumber) is null, 1,max(badgenumber)+1 ) as badgenumber from userinfo")
			let badgenumberStart : number= badgenumber[0].badgenumber
			let badgenumbers : number[] = []
			badgenumbers[0]= badgenumberStart
			for(let i=1; i<quantity; i++ ){
				badgenumbers[i] = ++badgenumberStart
			}
			for(let i in badgenumbers){
				let lockedBadgenumber = await LockedBadgenumbers.find({ where: { badgenumber: badgenumbers[i] } })
				if (lockedBadgenumber !== undefined){
					console.log("badgenumber invalid  " + badgenumbers[i])
					let maxLockedBadgenumber = await LockedBadgenumbers.createQueryBuilder()
						.select("if(max(badgenumber) is null, 1,max(badgenumber)+1 )", "badgenumber")
						.execute()
					badgenumbers[i] = maxLockedBadgenumber[0].badgenumber
					let badgenumberToBeLocked = new LockedBadgenumbers()
					badgenumberToBeLocked.badgenumber = badgenumbers[i]
					await badgenumberToBeLocked.save()
				}
				else{
					console.log("badgenumber valid  ", badgenumbers[i])
					let badgenumberToBeLocked = new LockedBadgenumbers()
					badgenumberToBeLocked.badgenumber = badgenumbers[i]
					await badgenumberToBeLocked.save()
				}
			}
			return badgenumbers
		}
		catch(error){
			console.log(error)
			return null
		}
	}
}