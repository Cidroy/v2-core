import { IModification, IEntityBase } from "@classes/interface/IEntityBase"
import * as GQL from "type-graphql"
import * as DB from "typeorm"
import POSITRON from "@positron/lib/positron"

@GQL.ObjectType()
export class Modifications implements IModification{
	@GQL.Field(type => Date)
	public modifiedAt!: Date
	@GQL.Field(type => String)
	public modifier!: string
	@GQL.Field(type => String)
	public modification!: JSON
}

@GQL.ObjectType()
export default class Base extends DB.BaseEntity implements IEntityBase{
	@GQL.Field(type => String, { description: "Entity Id" })
	@DB.PrimaryGeneratedColumn("uuid")
	@DB.PrimaryColumn("uuid")
	public id !: string

	@GQL.Field(type => Boolean, { description: "Entity exists" })
	@DB.Column("tinyint")
	public active : boolean = true

	@GQL.Field(type => Date, { description: "Created at" })
	@DB.Column("timestamp with time zone")
	@DB.CreateDateColumn()
	public createdAt!: Date

	@GQL.Field(type => String, { description: "Author of Entity" })
	@DB.Column("varchar")
	public author!: string

	@GQL.Field(type => [ Modifications, ], { description: "List of Modifications" })
	@DB.Column("simple-json")
	public modifications: IModification[] = []

	@GQL.Field(type => Date, { description: "Last modification Date", nullable: true })
	@DB.Column("time with time zone", { nullable: true })
	@DB.UpdateDateColumn()
	public lastModifiedAt?: Date

	@GQL.Field(type => String, { description: "Last Modifier", nullable: true })
	@DB.Column("varchar", { nullable: true })
	public lastModifier?: string

	@DB.BeforeInsert()
	public beforeInsert(){
		this.author = POSITRON.User.id
	}

	// TODO: implement object-diff to store the difference
}