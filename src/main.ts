import { env } from "./infra/config/env";
import { Registry } from "./infra/di/Registry";
import { FastifyAdapter } from "./infra/http/HttpServer";
import { MainController } from "./infra/http/MainController";
import { UserService } from "./service/UserService";
import { AffiliateService } from "./service/AffiliateService";
import { CommissionService } from "./service/CommissionService";

async function main() {
  const httpServer = new FastifyAdapter();
  const userService = new UserService();
  const affiliateService = new AffiliateService();
  const commissionService = new CommissionService();
  const registry = Registry.getInstance();
  registry.register("UserService", userService);
  registry.register("AffiliateService", affiliateService);
  registry.register("CommissionService", commissionService);
  new MainController(httpServer);
  httpServer.listen(env.APP_PORT);
}

main();
