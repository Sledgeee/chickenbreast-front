export interface IErrorResponse {
	message: string
	errors: [
		{
			msg: string
			param: string
			location: string
		}
	]
}
