import type {
  CreateAccountData,
  ForgotPasswordData,
  ResetPasswordData,
} from "@/schemas/account";
import api from "./axios";

async function createAccount(payload: CreateAccountData) {
  const { data } = await api.post("/users", { user: payload });
  return data;
}

async function forgotPasswordAccount(payload: ForgotPasswordData) {
  console.log(payload);
  const { data } = await api.post("/users/password", {
    user: { email: payload.email },
  });
  return data;
}

async function resetPasswordAccount(
  payload: ResetPasswordData & { token: string }
) {
  const { data } = await api.put("/users/password", {
    user: {
      reset_password_token: payload.token,
      password: payload.password,
      password_confirmation: payload.passwordConfirmation,
    },
  });
  return data;
}

export { createAccount, forgotPasswordAccount, resetPasswordAccount };
