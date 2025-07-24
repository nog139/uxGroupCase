import { promises as fs } from "fs";
import path from "path";

const dataFile = path.resolve(__dirname, "../data/");

export async function readData(field: string): Promise<any[]> {
  const data = await fs.readFile(`${dataFile}/${field}.json`, "utf-8");
  return JSON.parse(data);
}

export async function writeData(field: string, data: any[]): Promise<void> {
  await fs.writeFile(`${dataFile}/${field}.json`, JSON.stringify(data, null, 2));
}
