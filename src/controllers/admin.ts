import { User } from "../entities";
import IPaginated from "../interfaces/paginated";
import IRequest from "../interfaces/request";
import IUseCase from "../interfaces/useCase";

export default class AdminController {
    constructor(
        protected authorizeAdmin: IUseCase<User>,
        protected listUsers: IUseCase<IPaginated<User>>,
        protected updateUser: IUseCase<boolean>,
        protected deleteUser: IUseCase<boolean>
    ) {}

    async users(request: IRequest) : Promise<boolean> {
        await this.authorizeAdmin.call(request.token)

        const {id} = request.params as {id: number}
        return this.updateUser.call(id,request.body);
    }

    async userDelete(request: IRequest): Promise<boolean> {
        await this.authorizeAdmin.call(request.token)
        const {id} = request.params as {id: number} 
        return this. deleteUser.call(id);
    }

}