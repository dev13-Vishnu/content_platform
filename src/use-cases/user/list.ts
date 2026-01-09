import { User } from "../../entities";
import IPaginated from "../../interfaces/paginated";
import IUseCase from "../../interfaces/useCase";
import IUserDAO from "../../interfaces/user/userDAO";

export default class ListUers implements IUseCase<IPaginated<User>>{
    constructor (protected userDao:IUserDAO) {}

    async call (page: number = 1, perPage: number = 10) :Promise<IPaginated<User>>{
        return this.userDao.listUsers({}, page, perPage);
    }
}