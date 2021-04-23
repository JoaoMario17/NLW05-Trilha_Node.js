import { Request, Response } from "express"
import { SettingsService } from "../services/SeetingsService";

class SettingsController {
    async create(req: Request,res: Response) {
        const {chat , username} = req.body;
        
        const settingsService = new SettingsService();

        //Tratativa do erro presente no SettingService
        try {
            const settings = await settingsService.create({ chat, username});

            return res.json(settings);
        }catch(err) {
            return res.status(400).json({
                message: err.message,
            });
        }
    }
}

export { SettingsController }