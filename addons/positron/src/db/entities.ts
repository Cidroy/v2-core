// TODO: use import all for auto import
// TODO: provide functionality to get Object Repos for query
import Client from "@positron/models/client"
import Address from "@positron/models/address"
import Options from "@positron/models/options"
import User from "@positron/models/user"
import Transaction from "@positron/models/transaction"
import GymFreezeRules from "@positron/models/freezeRules"
import Freezes from "@positron/models/freezes"
import GymBodyType from "@positron/models/gymBodyType"
import Booking from "@positron/models/booking"
import BookingAddon from "@positron/models/bookingAddon"
import BookingType from "@positron/models/bookingType"
import Category from "@positron/models/category"
import IDType from "@positron/models/idType"
import Occupation from "@positron/models/occupation"
import Organization from "@positron/models/organization"
import PriceList from "@positron/models/priceList"
import SlotBlock from "@positron/models/slotBlock"
import GymPurpose from "@positron/models/gymPurpose"

export default [
	Address,
	Options,
	User,
	Transaction,
	GymFreezeRules,
	Freezes,
	GymBodyType,
	Booking,
	BookingAddon,
	BookingType,
	Category,
	IDType,
	Occupation,
	Organization,
	PriceList,
	SlotBlock,
	GymPurpose,
]