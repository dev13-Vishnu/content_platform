import { User } from "../../entities";
import { UnauthorizedError } from "../../errors/unauthorizedError";
import IUseCase from "../../interfaces/useCase";
import IUserDAO from "../../interfaces/user/userDAO";

export default class AuthorizedUser implements IUseCase<User>{
    constructor(
        protected UserDao : IUserDAO,
        protected verifyToken: (token: string) => User,
    ){}

    async call (token: string) : Promise <User> {
        if(!token) {
            throw new UnauthorizedError("You're not authoraized")
        }
        const {id} = this.verifyToken(token);
        const user = await this.UserDao.findOneBy({id}) 
        if(!user) {
            throw new UnauthorizedError("You're not authorized.")
        }
        return user
    }
}