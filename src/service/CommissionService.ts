import { readData, writeData } from "../utils/jsonStorage";
import { randomUUID } from "crypto";

export class CommissionService {
  constructor() {}

  async create(input: InputCommission): Promise<void> {
    try {
      const commission = await readData("commissions");
      const newCommission: any = {
        id: randomUUID(),
        ...input,
      };
      commission.push(newCommission);
      await writeData("commissions", commission);
      return newCommission;
    } catch (error: any) {
      throw error;
    }
  }

  async delete(id: string): Promise<{ message: string }> {
    try {
      const commissions: any[] = await readData("commissions");
      const index = commissions.findIndex((cm) => cm.id === id);
      if (index === -1) throw new Error("Comissão não encontrada");
      commissions.splice(index, 1);
      await writeData("commissions", commissions);
      return {
        message: `Comissão com id: ${id} deletada com sucesso`,
      };
    } catch (error: any) {
      throw error;
    }
  }

  async getByAffiliateId(affiliateId: string): Promise<void> {
    try {
      const commissions: any = await readData("commissions");
      const response = commissions.filter(
        (cm: any) => cm.affiliateId === affiliateId
      );

      if (response.length === 0)
        throw new Error("Nenhuma comissão encontrada para este afiliado");

      return response;
    } catch (error: any) {
      throw error;
    }
  }
}

type InputCommission = {
  email: string;
  senha: string;
  nome: string;
};
