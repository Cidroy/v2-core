export interface IResponse {
	type: "success" | "error" | "warning"
	message?: string
}
export interface ISuccess extends IResponse {
	type: "success"
}
export interface IError extends IResponse {
	type: "error"
	message: string,
	trace ?: any
}
