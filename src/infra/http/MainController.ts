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
          .inject("UsersService")
          .create(usersSchema.parse(body));
        return output;
      }
    );

    httpServer.register("get", "/users", async function () {
      const output = await registry.inject("UsersService").getAll();
      return output;
    });

    httpServer.register(
      "put",
      "/users/:id",
      async function (params: any, body: any) {
        const usersSchema = z.object({
          email: z.string(),
          senha: z.string(),
          nome: z.string(),
          id: z.string(),
        });
        const output = await registry
          .inject("UsersService")
          .editUser(usersSchema.parse({ ...body, id: params.id }));
        return output;
      }
    );

    httpServer.register("get", "/users/:id/status", async function (params: any) {
      const output = await registry.inject("UsersService").updateStatus(params.id);
      return output;
    });

    httpServer.register(
      "post",
      "/affiliate/create",
      async function (params: any, body: any) {
        const usersSchema = z.object({
          email: z.string(),
          password: z.string(),
          name: z.string(),
        });
        const output = await registry
          .inject("UsersService")
          .execute(usersSchema.parse(body));
        return output;
      }
    );

    httpServer.register(
      "get",
      "/affiliate",
      async function (params: any, body: any) {
        const usersSchema = z.object({
          email: z.string(),
          password: z.string(),
          name: z.string(),
        });
        const output = await registry
          .inject("UsersService")
          .execute(usersSchema.parse(body));
        return output;
      }
    );

    httpServer.register(
      "put",
      "/affiliate/:id",
      async function (params: any, body: any) {
        const usersSchema = z.object({
          email: z.string(),
          password: z.string(),
          name: z.string(),
        });
        const output = await registry
          .inject("UsersService")
          .execute(usersSchema.parse(body));
        return output;
      }
    );

    httpServer.register(
      "post",
      "/affiliate/status",
      async function (params: any, body: any) {
        const usersSchema = z.object({
          email: z.string(),
          password: z.string(),
          name: z.string(),
        });
        const output = await registry
          .inject("UsersService")
          .execute(usersSchema.parse(body));
        return output;
      }
    );

    httpServer.register(
      "post",
      "/commission/create",
      async function (params: any, body: any) {
        const usersSchema = z.object({
          email: z.string(),
          password: z.string(),
          name: z.string(),
        });
        const output = await registry
          .inject("UsersService")
          .execute(usersSchema.parse(body));
        return output;
      }
    );

    httpServer.register(
      "post",
      "/commission/delete",
      async function (params: any, body: any) {
        const usersSchema = z.object({
          email: z.string(),
          password: z.string(),
          name: z.string(),
        });
        const output = await registry
          .inject("UsersService")
          .execute(usersSchema.parse(body));
        return output;
      }
    );

    httpServer.register(
      "get",
      "/commission/:affiliateId/:commissionId",
      async function (params: any, body: any) {
        const usersSchema = z.object({
          email: z.string(),
          password: z.string(),
          name: z.string(),
        });
        const output = await registry
          .inject("UsersService")
          .execute(usersSchema.parse(body));
        return output;
      }
    );
  }
}
