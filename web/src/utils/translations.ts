const errorTranslations: Record<string, string> = {
  "Invalid Email or password.": "E-mail ou senha inválidos.",
  "You need to sign in or sign up before continuing.":
    "Você precisa fazer login para continuar.",
  "Your session expired. Please sign in again to continue.":
    "Sua sessão expirou. Faça login novamente.",
  "Email has already been taken": "O Email já está sendo utilizado no sistema",
};

function translateError(message?: string) {
  if (!message) return "Ocorreu um erro inesperado.";
  return errorTranslations[message] || message;
}

export { translateError };
