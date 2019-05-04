import * as API from "@tsed/common"
import { BadRequest } from "ts-httpexceptions"
import { Permission } from "@classes/Permission"
import { Logger } from "@classes/CONSOLE"

@API.OverrideMiddleware(API.AuthenticatedMiddleware)
export class APIAuthentication implements API.IMiddleware {
	private static log = new Logger("neutron/api-auth")

	public use(
		@API.EndpointInfo() endpoint: API.EndpointMetadata,
		@API.Request() request: Express.Request,
		@API.Next() next: Express.NextFunction
	) { // next is optional here
		try {
			APIAuthentication.log.verbose("autherize?")
			// options given to the @Authenticated decorator
			const options = endpoint.get(API.AuthenticatedMiddleware) || {}
			APIAuthentication.log.verbose({ options })
			// options => {role: 'admin'}

			if (!Permission(options)) throw new BadRequest("///bad-request")
		} catch (error) {
			APIAuthentication.log.error(error)
			throw new BadRequest("///bad-request-failure")
		}

		next()
	}
}
