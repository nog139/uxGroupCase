import { readData, writeData } from "../utils/jsonStorage";
import { randomUUID } from "crypto";

export class AffiliateService {
  constructor() {}

  async create(input: InputAffiliate): Promise<void> {
    try {
      const affiliates = await readData("affiliates");
      const newAffiliate: any = {
        id: randomUUID(),
        ...input,
        createdAt: new Date().toISOString(),
        status: true,
      };
      affiliates.push(newAffiliate);
      await writeData("affiliates", affiliates);
      return newAffiliate;
    } catch (error: any) {
      throw error;
    }
  }

  async getAll(): Promise<void> {
    try {
      const affiliates: any = await readData("affiliates");
      return affiliates;
    } catch (error: any) {
      throw error;
    }
  }

  async editAffiliate(body: InputEditAffiliate): Promise<void> {
    try {
      const affiliates: any = await readData("affiliates");
      const index = affiliates.findIndex((af: any) => af.id === body.id);
      if (index === -1) throw new Error("Afiliado não encontrado");

      affiliates[index] = {
        ...affiliates[index],
        ...body,
      };

      await writeData("affiliates", affiliates);
      return affiliates[index];
    } catch (error: any) {
      throw error;
    }
  }

  async updateStatus(id: string): Promise<void> {
    try {
      const affiliates: any = await readData("affiliates");
      const index = affiliates.findIndex((af: any) => af.id === id);
      if (index === -1) throw new Error("Afiliado não encontrado");
      affiliates[index] = {
        ...affiliates[index],
        status: !affiliates[index].status,
      };
      await writeData("affiliates", affiliates);
      return affiliates[index];
    } catch (error: any) {
      throw error;
    }
  }
}

type InputAffiliate = {
  nome: string;
  cpf: string;
  dataNasc: string;
  email: string;
  senha: string;
  telefone: string;
  endereco: string;
  cidade: string;
  estado: string;
};

type InputEditAffiliate = {
  id: string;
  nome: string;
  dataNasc: string;
  email: string;
  senha: string;
  telefone: string;
  endereco: string;
  cidade: string;
  estado: string;
};
