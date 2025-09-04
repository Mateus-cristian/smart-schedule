import type { CreateAccountData } from "@/schemas/account";
import api from "./axios";

export async function createAccount(payload: CreateAccountData) {
  const { data } = await api.post("/users", { user: payload });
  return data;
}
