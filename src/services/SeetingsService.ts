import { getCustomRepository, Repository } from "typeorm";
import { Setting } from "../entities/Setting";
import { SettingsRepository } from "../repositories/SettingsRepository";

interface ISettingsCreate {
    chat: boolean;
    username: string;
}

class SettingsService {
    //atributo de classe
    private settingsRepository: Repository<Setting>;

    constructor() {
        this.settingsRepository = getCustomRepository(SettingsRepository);
    }

    async create({ chat, username } : ISettingsCreate) {
        //Perceba que o settingsRepository está ligado ao getCustomRepository do 
        //framework typeorm e o método findone que ira procurar pelo usuário faz
        //parte dessa biblioteca
        const userAlreadyExists = await this.settingsRepository.findOne({
            /**
             * Isso é o mesmo que fazer
             * Select * from settings where username = "username" limit 1
             */
            username
        });

        if(userAlreadyExists)
        {
            throw new Error("User already exists!");
        }

        const settings = this.settingsRepository.create({
            chat,
            username
        })

        await this.settingsRepository.save(settings);

        return settings;
    }
}

export { SettingsService }