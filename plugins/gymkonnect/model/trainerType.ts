import * as DB from "typeorm"
import Base from "@plugins/core/model/base"
import * as GQL from "type-graphql"
import ITrainerType from "@plugins/gymkonnect/interfaces/ITrainerType"

@DB.Entity()
@GQL.ObjectType()
export default class TrainerType extends Base implements ITrainerType {
	@GQL.Field(type => String)
	@DB.Column("varchar", { nullable: false, unique: true })
	public name!: string

	@GQL.Field(type => String, { nullable: true })
	@DB.Column("varchar", { nullable: true })
	public description?: string

}