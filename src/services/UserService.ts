import { getCustomRepository, Repository } from "typeorm"
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository"

class UserService {
    //atributo de classe
    private usersRepository: Repository<User>

    constructor() {
        this.usersRepository = getCustomRepository(UsersRepository);
    }

    async create(email: string) {
        //Verificar Se o usuario existe
        const userExists = await this.usersRepository.findOne({
            email
        })

        //Se não existir, salvar no DB
        if(userExists) {
            return userExists;
        }

        const user = this.usersRepository.create({
            email,
        })

        await this.usersRepository.save(user);

        //Se existir, retornar use
        return user;
    }

    async findByEmail(email: string) {
        const user = await this.usersRepository.findOne({ email });

        return user;
    }
}

export { UserService }