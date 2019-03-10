import * as GQL from "type-graphql"
import * as DB from "typeorm"
import LockedBadgenumbers from "@positron/models/lockedBadgenumbers"
import Utils from "@classes/functions/utils"
import { PASSWORD_PREFERENCE } from "@classes/enum/misc"
import { Logger } from "@classes/CONSOLE"

const Console = new Logger(`gql-resolver/misc`)
GQL.registerEnumType(PASSWORD_PREFERENCE, {
	name: "PASSWORD_PREFERENCE"
})

@GQL.Resolver()
export default class miscResolver {

	@GQL.Query(returns => Boolean)
	public async test(
		@GQL.Arg("username") username: string,
		@GQL.Arg("password") password: string,
		@GQL.Arg("preference") preference: PASSWORD_PREFERENCE,
		@GQL.Ctx() { req: { session }, req }: GQLContext,
	): Promise<boolean>{
		Console.log(JSON.stringify(req, undefined, 4))
		if(username==="1" && password==="1") session!.counter = 987
		else throw "Invalid username or password"
		Console.log({ username, password, preference, session, })
		return true
	}

	@GQL.Query(returns => Number, { nullable: true })
	public async whoAmI(
		@GQL.Ctx() { req: { session } }: GQLContext
	){
		return session!.counter
	}

	@GQL.Query(returns =>String)
	public async isBadgenumberValid(
		@GQL.Arg("badgenumber") badgenumber: number,
	) {
		try{
			let entityManager = DB.getManager()
			console.log(badgenumber)
			let userinfo = await entityManager.query("select 1 from userinfo where badgenumber= ?", [Utils.appendZeroesToBadgenumber(badgenumber.toString()),])
			// FIXME: delete from lockedbadgenumber here
			let lockedBadgenumber =await LockedBadgenumbers.find({ where: { badgenumber: badgenumber } })
			console.log(userinfo !== undefined)
			console.log(lockedBadgenumber.length == 0)
			let isBadgenumberAvailable = userinfo !== undefined && (lockedBadgenumber.length == 0)
			if(isBadgenumberAvailable){
				let badgenumberToBeLocked = new LockedBadgenumbers()
				badgenumberToBeLocked.badgenumber = badgenumber
				await badgenumberToBeLocked.save()
			}
			return isBadgenumberAvailable
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