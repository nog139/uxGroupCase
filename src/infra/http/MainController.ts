import { z } from "zod";
import { HttpServer } from "./HttpServer";
import { Registry } from "../di/Registry";

export class MainController {
  constructor(httpServer: HttpServer) {
    const registry = Registry.getInstance();

    httpServer.register(
      "post",
      "/users/create",
      async function (params: any, body: any) {
        const usersSchema = z.object({
          email: z.string(),
          senha: z.string(),
          nome: z.string(),
        });
        const output = await registry
          .inject("UserService")
          .create(usersSchema.parse(body));
        return output;
      }
    );

    httpServer.register("get", "/users", async function () {
      const output = await registry.inject("UserService").getAll();
      return output;
    });

    httpServer.register(
      "put",
      "/users/:id",
      async function (params: any, body: any) {
        const usersSchema = z.object({
          email: z.string(),
          senha: z.string().optional(),
          nome: z.string(),
          id: z.string(),
        });
        const output = await registry
          .inject("UserService")
          .editUser(usersSchema.parse({ ...body, id: params.id }));
        return output;
      }
    );

    httpServer.register(
      "get",
      "/users/:id/status",
      async function (params: any) {
        const output = await registry
          .inject("UserService")
          .updateStatus(params.id);
        return output;
      }
    );

    httpServer.register(
      "post",
      "/affiliate/create",
      async function (params: any, body: any) {
        const affiliateSchema = z.object({
          nome: z.string(),
          cpf: z.string(),
          dataNasc: z.string(),
          email: z.string(),
          telefone: z.string(),
          endereco: z.string(),
          cidade: z.enum([
            "São Paulo",
            "Campinas",
            "Santos",
            "Rio de Janeiro",
            "Niterói",
            "Petrópolis",
            "Curitiba",
            "Londrina",
            "Maringá",
          ]),
          estado: z.enum(["SP", "RJ", "BH", "PR"]),
        });
        const output = await registry
          .inject("AffiliateService")
          .create(affiliateSchema.parse(body));
        return output;
      }
    );

    httpServer.register("get", "/affiliates", async function () {
      const output = await registry.inject("AffiliateService").getAll();
      return output;
    });

    httpServer.register(
      "put",
      "/affiliates/:id",
      async function (params: any, body: any) {
        const affiliateSchema = z.object({
          id: z.string(),
          nome: z.string(),
          dataNasc: z.string(),
          email: z.string(),
          telefone: z.string(),
          endereco: z.string(),
          cidade: z.enum([
            "São Paulo",
            "Campinas",
            "Santos",
            "Rio de Janeiro",
            "Niterói",
            "Petrópolis",
            "Curitiba",
            "Londrina",
            "Maringá",
          ]),
          estado: z.enum(["SP", "RJ", "BH", "PR"]),
        });
        const output = await registry
          .inject("AffiliateService")
          .editAffiliate(affiliateSchema.parse({ ...body, id: params.id }));
        return output;
      }
    );

    httpServer.register(
      "get",
      "/affiliates/:id/status",
      async function (params: any) {
        const output = await registry
          .inject("AffiliateService")
          .updateStatus(params.id);
        return output;
      }
    );

    httpServer.register(
      "post",
      "/commission/create",
      async function (params: any, body: any) {
        const usersSchema = z.object({
          affiliateId: z.string(),
          valor: z.number().refine((val: number) => val !== 0),
          data: z.string(),
        });
        const output = await registry
          .inject("CommissionService")
          .create(usersSchema.parse(body));
        return output;
      }
    );

    httpServer.register(
      "delete",
      "/commission/delete/:id",
      async function (params: any) {
        const output = await registry
          .inject("CommissionService")
          .delete(params.id);
        return output;
      }
    );

    httpServer.register(
      "get",
      "/commission/:affiliateId",
      async function (params: any) {
        const output = await registry
          .inject("CommissionService")
          .getByAffiliateId(params.affiliateId);
        return output;
      }
    );
  }
}
