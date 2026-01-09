import { User } from "../../entities";
import { NotFoundError } from "../../errors/notFoundError";
import IArticelDAO from "../../interfaces/article/articleDAO";
import IUseCase from "../../interfaces/useCase";
import IUserDAO from "../../interfaces/user/userDAO";

export default class UserProfile implements IUseCase <User>{
    constructor (
        protected userDAO: IUserDAO,
        protected articleDAO: IArticelDAO,
    ) {}

    async call (id: number, articlesPage?: number, articlesPerPage?: number): Promise<User> {
        const user = await this.userDAO.findOneBy({id})
        if(!user) {
            throw new NotFoundError('User was not found')
        }
        const articles = await this.articleDAO.userPublishedArticles(
            user.id,
            articlesPage,
            articlesPerPage,
        )
        Object.assign(user, {articles})
    return user
    } 
}