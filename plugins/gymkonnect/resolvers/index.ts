import TransactionResolver from "@plugins/gymkonnect/resolvers/transaction"
import FreezeRulesResolver from "@plugins/gymkonnect/resolvers/FreezeRules"
import FreezeResolver from "@plugins/gymkonnect/resolvers/freezes"
import GymBodyTypeResolver from "@plugins/gymkonnect/resolvers/gymBodyType"
import BookingResolver from "@plugins/gymkonnect/resolvers/booking"
import BookingAddonResolver from "@plugins/gymkonnect/resolvers/bookingAddon"
import BookingTypeResolver from "@plugins/gymkonnect/resolvers/bookingType"
import CategoryResolver from "@plugins/gymkonnect/resolvers/category"
import IDTypeResolver from "@plugins/gymkonnect/resolvers/idType"
import OccupationResolver from "@plugins/gymkonnect/resolvers/occupation"
import OrganizationResolver from "@plugins/gymkonnect/resolvers/organization"
import PriceListResolver from "@plugins/gymkonnect/resolvers/priceList"
import SlotBlockResolver from "@plugins/gymkonnect/resolvers/slotBlock"
import GymPurposeResolver from "@plugins/gymkonnect/resolvers/gymPurpose"
import GymUsersResolver from "@plugins/gymkonnect/resolvers/gymUsers"
import GymProgrammeResolver from "@plugins/gymkonnect/resolvers/gymProgramme"
import MembershipTypeResolver from "@plugins/gymkonnect/resolvers/membershipType"
import GymPackageResolver from "@plugins/gymkonnect/resolvers/gymPackage"
import CounsellorTypeResolver from "@plugins/gymkonnect/resolvers/counsellorType"
import TrainerTypeResolver from "@plugins/gymkonnect/resolvers/trainerType"
import GymUserModeResolver from "@plugins/gymkonnect/resolvers/gymUserMode"
import PaymentModeResolver from "@plugins/gymkonnect/resolvers/paymentMode"
import GymPricesResolver from "@plugins/gymkonnect/resolvers/gymPrices"
import GroupMapResolver from "@plugins/gymkonnect/resolvers/groupMap"
import GroupingsResolver from "@plugins/gymkonnect/resolvers/groupings"
import GroupsResolver from "@plugins/gymkonnect/resolvers/groups"
import miscResolver from "@plugins/gymkonnect/resolvers/misc"
import PaymentsResolver from "@plugins/gymkonnect/resolvers/payment"
import LockedBadgenumbersResolver from "@plugins/gymkonnect/resolvers/lockedBadgenumbers"
import BloodGroupResolver from "@plugins/gymkonnect/resolvers/bloodGroup"
import TimeSlotResolver from "@plugins/gymkonnect/resolvers/timeSlot"
import UTMSourceResolver from "@plugins/gymkonnect/resolvers/utmSource"
import ZonesAvailableResolver from "@plugins/gymkonnect/resolvers/zonesAvailable"
import GymOffersResolver from "@plugins/gymkonnect/resolvers/gymOffers"
import GymOffersLogicResolver from "@plugins/gymkonnect/resolvers/gymOffersLogic"
import GymUserHealthResolver from "@plugins/gymkonnect/resolvers/gymUserHealth"
import DoorRulesResolver from "@plugins/gymkonnect/resolvers/doorRules"
import PTPurposeResolver from "@plugins/gymkonnect/resolvers/ptPurpose"
import ServicesAvailableResolver from "@plugins/gymkonnect/resolvers/servicesAvailable"
import PTPackagesResolver from "@plugins/gymkonnect/resolvers/ptPackages"
import AmenitiesResolver from "@plugins/gymkonnect/resolvers/amenities"
import TaxRulesResolver from "@plugins/gymkonnect/resolvers/taxRules"
import SpaBookingResolver from "@plugins/gymkonnect/resolvers/spaBooking"

export default [
	TransactionResolver,
	FreezeRulesResolver,
	FreezeResolver,
	GymBodyTypeResolver,
	BookingResolver,
	BookingAddonResolver,
	BookingTypeResolver,
	CategoryResolver,
	IDTypeResolver,
	OccupationResolver,
	OrganizationResolver,
	PriceListResolver,
	SlotBlockResolver,
	GymPurposeResolver,
	GymUsersResolver,
	GymProgrammeResolver,
	MembershipTypeResolver,
	GymPackageResolver,
	CounsellorTypeResolver,
	TrainerTypeResolver,
	GymUserModeResolver,
	PaymentModeResolver,
	GymPricesResolver,
	GroupMapResolver,
	GroupingsResolver,
	GroupsResolver,
	miscResolver,
	PaymentsResolver,
	LockedBadgenumbersResolver,
	BloodGroupResolver,
	TimeSlotResolver,
	UTMSourceResolver,
	ZonesAvailableResolver,
	GymOffersResolver,
	GymOffersLogicResolver,
	GymUserHealthResolver,
	DoorRulesResolver,
	PTPurposeResolver,
	ServicesAvailableResolver,
	PTPackagesResolver,
	AmenitiesResolver,
	TaxRulesResolver,
	SpaBookingResolver,
]