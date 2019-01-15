import { IEntityBase } from "@classes/interface/IEntityBase"

export default interface ITransaction extends IEntityBase{
	user : string,
	mode? : string,
	start : Date,
	end : Date,
	endExtendedDate : Date,
	dueDaysCount? : number,
	dueDays? : Date[],
	freezeCount? : number,
	freezeDays? : number,
	freezeId? : string,
	payment : string,
	paymentWorkoutCard? : string,
	receipt? : string,
	offer? : string[],
	addon? : string[],
	programme? : string[],
	purpose? : string[],
	package? : string,
	amount? : number,
	workoutCardStatus? : string
}