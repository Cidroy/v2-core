import { ApolloClient, OperationVariables, QueryOptions, MutationOptions, SubscriptionOptions, ApolloQueryResult } from "apollo-client"
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory"
import { BatchHttpLink } from "apollo-link-batch-http"
import { Logger } from "@classes/CONSOLE"
import AppConfig from "@classes/appConfig"
import { PORTS } from "@classes/ports"
import { FetchResult, Observable, DocumentNode } from "apollo-link"
import { gql as _gql } from "apollo-server-core"

export const gql = _gql

let cache: InMemoryCache,
	link: BatchHttpLink,
	client: ApolloClient<NormalizedCacheObject>

/**
 * GraphQL Client for Interaction
 *
 * @export
 * @class GQL
 */
export default class GQLClient{
	private static Namespace = "electron/GQL"
	private static log = new Logger(GQLClient.Namespace)

	protected static config = {
		host: "localhost",
		path: "/gql",
		port: PORTS.POSITRON,
		ssl: false,
	}

	public static get uri(){
		return `http${GQLClient.config.ssl ? "s" : ""}://${GQLClient.config.host}${GQLClient.config.port ? ":" + GQLClient.config.port : ""}${GQLClient.config.path}`
	}

	/**
	 * GraphQL client
	 *
	 * @readonly
	 * @static
	 * @memberof GQL
	 */
	public static get Client(){ return client }

	/**
	 * Execute query
	 *
	 * @static
	 * @template T expected data
	 * @template TVariables input variables
	 * @param {DocumentNode} query GraphQL Query
	 * @param {TVariables} [variables] Input Variables
	 * @param {QueryOptions<TVariables>} [options] Additional options
	 *
	 * You can use this as an override to do default Apollo-Client usage
	 * @returns {Promise<ApolloQueryResult<T>>} response
	 * @memberof GQL
	 */
	public static async query<T, TVariables = OperationVariables>(query: DocumentNode , variables?: TVariables, options?: Partial<QueryOptions<TVariables>>): Promise<ApolloQueryResult<T>>{
		return GQLClient.Client.query({
			query,
			variables,
			...options,
		})
	}

	/**
	 * Execute Mutation
	 *
	 * @static
	 * @template T expected data
	 * @template TVariables input variables
	 * @param {DocumentNode} mutation GraphQL mutation
	 * @param {TVariables} [variables] Input variables
	 * @param {MutationOptions<T, TVariables>} [options] Additional options
	 * @returns {Promise<FetchResult<T>>} response
	 * @memberof GQL
	 */
	public static async mutate<T, TVariables = OperationVariables>(mutation: DocumentNode, variables?: TVariables, options?: Partial<MutationOptions<T, TVariables>>): Promise<FetchResult<T>>{
		return GQLClient.Client.mutate({
			mutation,
			variables,
			...options
		})
	}
	public static subscribe<T = any, TVariables = OperationVariables>(options: SubscriptionOptions<TVariables>): Observable<T>{
		return GQLClient.Client.subscribe(options)
	}

	/**
	 * Initialize
	 *
	 * @static
	 * @param {boolean} [force=false] force initialize
	 * @returns boolean
	 * @memberof GQL
	 */
	public static async Initialize(force: boolean = false){
		if(!force && client) return true
		GQLClient.log.verbose("initialize")
		GQLClient.config = await AppConfig.Get(GQLClient.Namespace, GQLClient.config)
		if(!AppConfig.Has(GQLClient.Namespace)) await AppConfig.Set(GQLClient.Namespace, GQLClient.config)

		cache = new InMemoryCache()
		link = new BatchHttpLink({
			uri: GQLClient.uri,
			credentials: "include",
		})
		client = new ApolloClient({
			link,
			cache,
			connectToDevTools: true,
		})
		GQLClient.log.verbose("initialized")
		return true
	}

	/**
	 * Set server
	 *
	 * @static
	 * @param {boolean} ssl ssl
	 * @param {string} host host
	 * @param {number} port port
	 * @param {string} path path
	 * @returns boolean if saved config
	 * @memberof GQL
	 */
	public static async setServer(ssl: boolean, host: string, port: number, path: string){
		let conf = { ssl, host, port, path }
		GQLClient.config = { ...GQLClient.config, ...conf }
		return await AppConfig.Set(GQLClient.Namespace, GQLClient.config)
	}
}