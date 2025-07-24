import { readData, writeData } from "../utils/jsonStorage";
import { randomUUID } from "crypto";

export class UsersService {
  constructor() {}

  async create(input: InputUser): Promise<OutputUsers> {
    try {
      const users = await readData("users");
      const newUser = {
        id: randomUUID(),
        ...input,
        createdAt: new Date().toISOString(),
        status: true,
      };
      users.push(newUser);
      await writeData("users", users);
      return newUser;
    } catch (error: any) {
      throw error;
    }
  }

  async getAll(): Promise<void> {
    try {
      const users: any = await readData("users");
      return users;
    } catch (error: any) {
      throw error;
    }
  }

  async editUser(body: InputEditUser): Promise<void> {
    try {
      const users: any = await readData("users");
      const index = users.findIndex((user: any) => user.id === body.id);
      if (index === -1) throw new Error("Usuário não encontrado");

      users[index] = {
        ...users[index],
        ...body,
      };

      await writeData("users", users);
      return users[index];
    } catch (error: any) {
      throw error;
    }
  }

  async updateStatus(id: string): Promise<void> {
    try {
      const users: any = await readData("users");
      const index = users.findIndex((user: any) => user.id === id);
      if (index === -1) throw new Error("Usuário não encontrado");
      users[index] = {
        ...users[index],
        status: !users[index].status,
      };
      await writeData("users", users);
      return users[index];
    } catch (error: any) {
      throw error;
    }
  }
}
type InputUser = {
  email: string;
  senha: string;
  nome: string;
};

type InputEditUser = {
  id: string;
  email: string;
  senha: string;
  nome: string;
};

type OutputUsers = {
  id: string;
  email: string;
  senha: string;
  nome: string;
  status: boolean;
};
