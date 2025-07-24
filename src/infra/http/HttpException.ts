import { ZodError } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

export class HttpExceptionHandler {
  static handle(error: any, _: FastifyRequest, reply: FastifyReply): HttpExceptionHandler {
    if (error instanceof ZodError) return reply.status(400).send({ message: error });
    return reply.status(500).send({ message: error.message || "Internal Server Error" });
  }
}
