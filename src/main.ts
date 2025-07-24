import { env } from "./infra/config/env";
import { Registry } from "./infra/di/Registry";
import { FastifyAdapter } from "./infra/http/HttpServer";
import { MainController } from "./infra/http/MainController";
import { UsersService } from "./service/UsersService";

async function main() {
  const httpServer = new FastifyAdapter();
  const usersserService = new UsersService();
  const registry = Registry.getInstance();
  registry.register("UsersService", usersserService);
  new MainController(httpServer);
  httpServer.listen(env.APP_PORT);
}

main();