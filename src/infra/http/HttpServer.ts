import { HttpExceptionHandler } from "./HttpException";
import fastify, { FastifyReply, FastifyRequest } from "fastify";

export interface HttpServer {
  register(method: string, url: string, callback: Function): void;
  listen(port: number): void;
}

export class FastifyAdapter implements HttpServer {
  app: any;

  constructor() {
    this.app = fastify();
    this.app.setErrorHandler(HttpExceptionHandler.handle);
  }

  register(method: string, url: string, callback: Function): void {
    this.app[method](
      url,
      async function (req: FastifyRequest, res: FastifyReply) {
        try {
          const output = await callback(req.params, req.body);
          return res.status(200).send(output);
        } catch (error: any) {
          throw error;
        }
      }
    );
  }

  listen(port: number): void {
    this.app.listen(
      {
        host: "0.0.0.0",
        port: port,
      },
      () => console.log("Server running")
    );
  }
}
