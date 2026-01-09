import IError from "../interfaces/error";

export class ValidationError extends Error implements IError {
    public name : 'ValidationError'
    public httpStatus = 422

    constructor(
        public message : string= 'Provided data is invalid',
        public details?: {fied: string, message: string,} [] | string [],

    ) {
        super(message)
    }
}