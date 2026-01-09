import { Article, User } from "../entities";
import IPaginated from "../interfaces/paginated";
import IRequest from "../interfaces/request";
import IUseCase from "../interfaces/useCase";

export default class ArticleController {
    constructor(
        protected authorizeUser: IUseCase<User>,
        protected fetchAuthorizeUser: IUseCase<User | null> ,
        protected articleFeed: IUseCase<IPaginated<Pick<Article,'id' | 'title' | 'description' | 'author'>>>,
        protected viewAriticle: IUseCase<Article>,
        protected createArticle: IUseCase<Article>,
        protected updateArticle: IUseCase<Article>,
        protected deleteArticel: IUseCase<boolean>,
    ) {}

    async feed(
        request: IRequest,
    ) : Promise <IPaginated<Pick<Article, 'id' | 'title' | 'description' | 'author'>>> {
        const page = parseInt(`${request.params?.page}`) || 1
        const perPage = parseInt(`${request.params?.perPage}`) || 10
        return this.articleFeed.call(page, perPage)
    }
    async view(request: IRequest) : Promise<Article> {
        const {id} = request.params as {id: string | number }
        const user = await this.fetchAuthorizeUser.call(request?.token)
        return this.viewAriticle.call(id,user?.id);
    }

    async create(request: IRequest) : Promise <Article> {
        const user = await this.authorizeUser.call(request.token)
        return this.createArticle.call(user, request.body);
    }
    async update(request: IRequest) : Promise <Article> {
        const user =  await this.authorizeUser.call(request.token)
        const articleId = parseInt(request.params?. id as string)
        return this.updateArticle.call(articleId, user, request.body);
    }

    async delete (request: IRequest) : Promise <boolean> {
        const user = await this.authorizeUser.call (request.token);
        const articleID = parseInt(request.params?.id as string);
        return this.deleteArticel.call(articleID, user);
    }

}