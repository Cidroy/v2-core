import { IEntityBase } from "@classes/interface/IEntityBase"
import { GENDER } from "@classes/enum/misc"

export default interface ICustomer extends IEntityBase {
	// badgenumber is autoincremented
	badgenumber : number,
	// USERINFO ID COLUMN  WDMS_ID
	wdmsId : number,
	// gym_user_mode.id
	mode : string,
	active : boolean,
	name : string,
	idCard : string,
	image : string,
	// from gym_user_occupation.id
	occupation : string,
	mobile : string,
	whatsapp? : string,
	officePhone? : string,
	email? : string,
	address? : string,
	dob? : Date,
	gender : GENDER,
	enquiryInitial? : string,
	enquiryRecent? : string,
	doj : Date,
	//Joining Health Status
	healthJoining? : string,
	// current health status from user_health.id
	healthCurrent? : string,
	// id of the person reffered by
	referredBy? : string,
	// other source of refference
	referredOther? : string
	// id of the person transferred from
	transferFrom? : string,
	// id of the person transeferred to
	transferTo? : string,
	balance? : number,
	transaction? : string,
	diet? : string,
	personal_training? : string,
	counselling? : string,
	preferredTime: Date
}