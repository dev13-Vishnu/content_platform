import { User } from "../../entities";
import IArticleDAO from "../../interfaces/article/articleDAO";
import IUseCase from "../../interfaces/useCase";

export default class DeleteArticle implements IUseCase<boolean> {
    constructor (protected articleDAO: IArticleDAO) {}

    async call (id: number, user: Pick<User, 'id' |'role' >): Promise <boolean>{
        if(user.role === 'admin') {
            return this.articleDAO.delete(id)
        }
        return this.articleDAO.delete(id,user.id)
    }
}