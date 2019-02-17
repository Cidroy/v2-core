import GQLClient, { gql } from "@/utils/graphql"

export async function generateBadgenumber(quantity: number = 1): Promise<(string|number)[]>{
	let result = await GQLClient.query<{ badges: (string | number)[]}>(
		gql` query generateBadgenumber( $quantity: Float! ){ badges: generateBadgenumber(quantity: $quantity) } `,
		{ quantity, },
		{ fetchPolicy: "no-cache", }
	)
	console.log(result)
	return result.data.badges
}