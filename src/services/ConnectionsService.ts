import { getCustomRepository, Repository } from "typeorm"
import { Connection } from "../entities/Connection"
import { ConnectionRepository } from "../repositories/ConnectionsRepository"

interface IConnectionCreate {
    socket_id: string;
    user_id: string;
    admin_id?: string;
    id?: string;
}

class ConnectionService {
    private connetcionsRepository: Repository<Connection>

    constructor() {
        this.connetcionsRepository = getCustomRepository(ConnectionRepository);
    }

    async create({ socket_id, user_id, admin_id, id}: IConnectionCreate){
        const connection = this.connetcionsRepository.create({
            socket_id,
            user_id,
            admin_id,
            id
        })

        await this.connetcionsRepository.save(connection);

        return connection;
    }

    async findByUserId(user_id: string) {
        const connection = await this.connetcionsRepository.findOne({
            user_id,
        });

        return connection;
    }
}

export { ConnectionService }