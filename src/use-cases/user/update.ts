import { Article, AuthUser, User } from "../../entities";
import { NotFoundError } from "../../errors/notFoundError";
import { UnauthorizedError } from "../../errors/unauthorizedError";
import IArticleDAO from "../../interfaces/article/articleDAO";
import IUseCase from "../../interfaces/useCase";

type UserPayload = Pick<AuthUser, 'email' | 'firstName' | 'lastName' | 'password' | 'confirmPassword'> 
type AdminPayload  = UserPayload & {role: 'admin' | 'user'}

export default class UpdateArticle implements IUseCase<Article> {
  constructor(protected articleDAO: IArticleDAO) {}

  async call(
    id: number,
    user: Pick<User, 'id' | 'role'>,
    payload: Pick<Article, 'title' | 'content' | 'description' | 'isPublished'>,
  ): Promise<Article> {
    const article = await this.articleDAO.findOne(id)
    if (!article) {
      throw new NotFoundError('Article not found')
    }
    if (article.authorID !== user.id && user.role !== 'admin') {
      throw new UnauthorizedError('You are not allowed to update this article')
    }

    return this.articleDAO.update(id, payload)
  }
}