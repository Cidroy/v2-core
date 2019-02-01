import { IEntityBase } from "@classes/interface/IEntityBase"

export default interface ITransaction extends IEntityBase{
	gymUser : number,
	mode? : number,
	start : Date,
	end : Date,
	endExtendedDate : Date,
	dueDaysCount? : number,
	dueDays? : Date[],
	freezeCount? : number,
	freezeDays? : number,
	freezeId? : number,
	payment : number,
	paymentWorkoutCard? : number,
	receipt? : string,
	offer? : number[],
	addon? : number[],
	programme? : number[],
	membershipType? : number,
	purpose? : number[],
	package? : number,
	packageMagnitude?: number,
	amount? : number,
	workoutCardStatus? : number
}