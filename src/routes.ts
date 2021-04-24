import { Router } from "express"
import { MessagesController } from "./controllers/MessagesController";
import { SettingsController } from "./controllers/SettingsController"
import { UsersController } from "./controllers/UsersController";

const routes = Router();

const settingsController = new SettingsController();
const userController = new UsersController();
const messagescontroller = new MessagesController();

/**
 * Tipos de parametros
 * Route Params => Parametros de rotas
 * http://localhost:3333/settings/1
 * Query Params => Filtros e buscas
 * http://localhost:3333/settings/1?search=algumacoisa
 * 
 * Body Params => {
 * 
 * }
 */

routes.post("/settings", settingsController.create);
routes.get("/settings/:username", settingsController.findByUsername);
routes.put("/settings/:username", settingsController.update);

routes.post("/users", userController.create);

routes.post("/messages", messagescontroller.create);
routes.get("/messages/:id", messagescontroller.showByUser);

export {routes}