export const mapSignInErrors = (error) => {
  const errorLc = error?.toLowerCase() ?? "";
  if (errorLc.includes("user not found with email")) {
    return { global: "Пользователь не найден" };
  }
  if (errorLc.includes("bad credentials")) {
    return { global: "Неверный пароль" };
  }
  if (errorLc.includes("user account is locked")) {
    return { global: "Вы забанены. До свидания!" };
  }
  return { global: "Произошла ошибка. Попробуйте ещё раз" };
};

export const mapSignUpErrors = (error, setError) => {
  const errorLc = error?.toLowerCase() ?? "";
  if (errorLc.includes("user already exists with email")) {
    setError("email", { message: "Эта почта уже занята" });
    return;
  }
  if (errorLc.includes("this email is already used with another provider")) {
    setError("root", {
      message: "Войдите с помощью другого способа (почта = пароль / яндекс)",
    });
    return;
  }
  if (errorLc.includes("максимальная длина имени - 32 символа")) {
    setError("name", { message: "Максимальная длина имени - 32 символа" });
    return;
  }
  if (errorLc.includes("имя содержит недопустимые символы")) {
    setError("name", { message: "Имя содержит недопустимые символы" });
    return;
  }
  if (errorLc.includes("максимальная длина фамилии - 32 символа")) {
    setError("surname", { message: "Максимальная длина фамилии - 32 символа" });
    return;
  }
  if (errorLc.includes("фамилия содержит недопустимые символы")) {
    setError("surname", { message: "Фамилия содержит недопустимые символы" });
    return;
  }
  if (errorLc.includes("некорректная почта")) {
    setError("email", { message: "Некорректная почта" });
    return;
  }
  if (errorLc.includes("допустимая длина пароля - от 8 до 32 символов")) {
    setError("password", { message: "Длина пароля - от 8 до 32 символов" });
    return;
  }
  setError("root", { message: "Произошла ошибка. Попробуйте ещё раз" });
};

export const mapOrganizationTypeError = (error) => {
  const errorLc = error?.toLowerCase() ?? "";
  if (errorLc.includes("duplicate key value")) {
    return {
      name: "Тип организации с таким названием уже существует",
    };
  }
  return { root: "Недопустимный тип ремонта" };
};
