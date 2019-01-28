/**
 * Modifications List
 *
 * @export
 * @interface IModification
 */
export interface IModification{
	modifiedAt: Date,
	modifier: string,
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
	author: string,
	modifications: IModification[],
	lastModifiedAt?: Date,
	lastModifier?: string,
}