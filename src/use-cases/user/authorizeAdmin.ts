import { User } from "../../entities";
import IUseCase from "../../interfaces/useCase";
import IUserDAO from "../../interfaces/user/userDAO";

export default class AuthorizeAdmin implements IUseCase<User> {
    constructor (
        protected userDAO: IUserDAO,
        protected verifyToken: (token:  string) => User,
    ) {}

    async call(token: string) :Promise<User | null> {
        if(!token) {
            return null
        } 
        try {
            const {id} = this.verifyToken(token);
            const user = await this.userDAO.findOneBy({id});
            return user
        } catch  {
            return null;
        }
    }
}