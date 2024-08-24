export class QueryParamError extends Error {
	constructor(param: string, message: string) {
		super(`Query parameter error: ${param}: ${message}`);
	}
}
