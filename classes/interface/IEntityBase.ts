/**
 * Modifications List
 *
 * @export
 * @interface IModification
 */
export interface IModification{
	modifiedAt: Date,
	modifier: number,
	modification: string[],
}

/**
 * Life Metadata for entities
 *
 * @export
 * @interface IEntityBase
 */
export interface IEntityBase{
	id: number
	createdAt: Date,
	author: number,
	modifications: IModification[],
	lastModifiedAt?: Date,
	lastModifier?: number,
	serverId? : string
}