export const mapSignInErrors = (error) => {
  const errorLc = error?.toLowerCase() ?? "";
  if (errorLc.includes("user not found with email")) {
    return { global: "Пользователь не найден" };
  }
  if (errorLc.includes("bad credentials")) {
    return { global: "Неверный пароль" };
  }
  return { global: "Произошла ошибка. Попробуйте ещё раз" };
};

export const mapSignUpErrors = (error) => {
  const errorLc = error?.toLowerCase() ?? "";
  if (errorLc.includes("user already exists with email")) {
    return { email: "Эта почта уже занята" };
  }
  if (errorLc.includes("this email is already used with another provider")) {
    return {
      root: "Войдите с помощью другого способа (почта = пароль / яндекс)",
    };
  }
  return { root: "Произошла ошибка. Попробуйте ещё раз" };
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
