import * as API from "@tsed/common"
import { BadRequest } from "ts-httpexceptions"
import { Permission } from "@classes/Permission"

@API.OverrideMiddleware(API.AuthenticatedMiddleware)
export class APIAuthentication implements API.IMiddleware {
	public use(
		@API.EndpointInfo() endpoint: API.EndpointMetadata,
		@API.Request() request: Express.Request,
		@API.Next() next: Express.NextFunction
	) { // next is optional here

		// options given to the @Authenticated decorator
		const options = endpoint.get(API.AuthenticatedMiddleware) || {}
		// options => {role: 'admin'}

		if(!Permission(options)) throw new BadRequest("///bad-request")

		next()
	}
}