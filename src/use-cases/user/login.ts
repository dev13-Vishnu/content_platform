import { User } from "../../entities";
import { UnauthorizedError } from "../../errors/unauthorizedError";
import { ValidationError } from "../../errors/validationError";
import IUseCase from "../../interfaces/useCase";
import ILoginResponse from "../../interfaces/user/loginResponse";
import IUserDAO from "../../interfaces/user/userDAO";

export default class LoginUser implements IUseCase <ILoginResponse> {
    constructor (
        protected userDAO : IUserDAO,
        protected comparePassword: (input:string, encrypted: string) => Promise<boolean>,
        protected issueToken:(payload:Partial<User>) => string,
    ) {}

    async call (email : string, password: string): Promise<ILoginResponse> {
        if(!email || !password) {
            throw new ValidationError('Email and password are required')
        }
        const user = await this.userDAO.findForAuth(email)
        const passwordMatch = user ? await this.comparePassword(password, user.password): false
        
        if(user && passwordMatch) {
            const {id, firstName, lastName, email, role} = user
            return {
                user: {id, firstName, lastName, email, role},
                token: this.issueToken({id, firstName, lastName, email})
            }
        } else {
            throw new UnauthorizedError('Invalid login or password')
        }
    }
}